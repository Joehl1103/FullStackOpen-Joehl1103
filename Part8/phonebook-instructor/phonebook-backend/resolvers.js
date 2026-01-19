const Person = require('./models/personModel.js')
const User = require('./models/userModel.js')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      console.log('allPersons')
      if (!args.phone) {
        console.log('!args.phone')
        try {
          const persons = await Person.find({}).populate('friendOf')
          console.log('persons', persons[0])
          return persons
        } catch (e) {
          console.warn(`Error: ${e.message}`)
        }
      }
      return await Person.find({ phone: { $exists: args.phone === 'YES' } })
        .populate('friendOf')
    },
    findPerson: async (root, args) => {
      console.log('args', args)
      return await Person.findOne({ name: args.name })
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Person: {
    address: (root) => ({
      street: root.street,
      city: root.city
    }),
    // friendOf: async (root) => {
    //   console.log('root', root)
    //   const friends = await User.find({
    //     friends: {
    //       $in: [root._id]
    //     }
    //   })
    //   return friends
    // }
  },

  Mutation: {
    addPerson: async (root, args, context) => {
      const { name, phone, street, city } = args
      if (name.length < 5 || phone.length < 5 || street.length < 5 || city.length < 3) {
        throw new GraphQLError('name, phone, street length must be at least 5 characters and city length must be at least 3 ',
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              args: args
            }
          })
      }
      const person = new Person({ ...args })
      console.log('person', person)
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (e) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error: e
          }
        })
      }
      pubsub.publish('PERSON_ADDED', { personAdded: person })

      return person
    },
    editNumber: async (root, args) => {
      const person = Person.findOne({ name: args.name })
      person.phone = args.phone
      try {
        await person.save()
      } catch (e) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return person
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== process.env.LOGIN_PASSWORD) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addAsFriend: async (root, args, { currentUser }) => {
      // function for determining if the user is already a friend
      const isFriend = (person) =>
        currentUser.friends.map(f =>
          f._id.toString()).includes(person._id.toString()
          )
      // get the person objet associated with the name of the friend as argument
      const person = await Person.findOne({ name: args.name })
      // if the user is not a friend, add to list
      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person)
      }
      await currentUser.save()
      return currentUser
    }
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterableIterator('PERSON_ADDED')
    }
  }

}

module.exports = resolvers
