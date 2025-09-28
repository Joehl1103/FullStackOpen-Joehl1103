const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const Author = require('./models/authorModel.js')
const Book = require('./models/bookModel.js')
const User = require('./models/userModel.js')
const { GraphQLError } = require('graphql')

const url = process.env.MONGO_URL

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log(`Connected to mongoose`)
  })
  .catch((e) => {
    console.warn(`unable to connect: ${error.message}`)
  })

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int! 
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook( 
      title: String!
      published: Int!
      author: String!
      genres: [String!]
      ):Book
    
    deleteBook(
      title: String!
    ):Book
    
    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
    
    createUser(
      username: String!
      favoriteGenre: String
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

`
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments({}),
    authorCount: () => Author.collection.countDocuments({}),
    allBooks: async (root, args) => {
      let books = []
      const isEmpty = Object.keys(args).length === 0
      const isAuthor = !(args.author === undefined)

      let authorIdToString = null

      if (isAuthor) {
        const author = await Author.find({ name: args.author })
        if (author.length === 0) {
          throw new GraphQLError('author does not exist', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author
            }
          })
        }
        authorIdToString = author[0]._id.toString()
      }

      const isGenre = !(args.genre === undefined)
      if (isGenre) {
        const allGenres = await Book.distinct('genres')
        const genreExists = allGenres.some(g => g === args.genre)
        if (!genreExists) {
          throw new GraphQLError('genre does not exist', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.genre
            }
          })
        }
      }
      switch (true) {
        case isEmpty:
          return books = await Book.find({})
        case isAuthor && !isGenre:
          return await Book.find({ author: authorIdToString }).populate('author')
        case !isAuthor && isGenre:
          return await Book.find({ genres: args.genre })
        case isAuthor && isGenre:
          return await Book.find({ author: authorIdToString, genres: args.genre }).populate('author')
        default:
          return null
      }
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      return authors
    },
    me: (root, args, contextValue) => {
      return contextValue.currentUser
    }
  },
  Author: {
    bookCount: async (root, args) => {
      const authorId = root._id.toString()
      return await Book.countDocuments({ author: authorId })
    }
  },
  Mutation: {
    /*
     * addBook( 
      title: String!
      published: Int!
      author: String!
      genres: [String!]
      ):Book  */
    addBook: async (root, args, contextValue) => {
      if (!contextValue.currentUser) {
        throw new GraphQLError('must be logged in', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR'
          }
        })
      }
      const book = { ...args }
      const { author, title } = args
      const titleExists = await Book.find({ title: title })
      if (titleExists.length > 0) {
        throw new GraphQLError('title already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: title
          }
        })
      }
      if (!author) {
        throw new GraphQLError('name of athor does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }
      if (book.title.length < 5) {
        throw new GraphQLError('author name must be at least 5 characters long', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }
      let findAuthorResponse = null
      try {
        findAuthorResponse = await Author.findOne({ name: author })
      } catch (e) {
        console.warn(`Error while finding author: ${e.message}`)
      }
      const foundAuthor = !(findAuthorResponse === null)
      if (foundAuthor) {
        book.author = findAuthorResponse._id
      } else {
        let createAuthorResponse = null
        try {
          createAuthorResponse = await Author.create({ name: author })
        } catch (e) {
          console.warn(`Error while creating author: ${e.message}`)
        }
        book.author = createAuthorResponse._id
      }
      await Book.create(book)
      console.log()
      return book
    },
    deleteBook: async (root, args, contextValue) => {
      if (!contextValue.currentUser) {
        throw new GraphQLError('must be logged in', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR'
          }
        })
      }

      const book = await Book.findOne({ title: args.title })
      if (!book) {
        throw new GraphQLError('this title does not correspond to any book', {
          estensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
        })
      }
      await Book.findOneAndDelete({ title: args.title })
      return book
    },
    addAuthor: async (root, args, contextValue) => {
      if (!contextValue.currentUser) {
        throw new GraphQLError('must be logged in', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR'
          }
        })
      }

      if (args.name.length < 4) {
        throw new GraphQLError("author's name must be at least 4 characters long", {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (author) {
        throw new GraphQLError('author already exists', {
          extensions: 'BAD_USER_INPUT',
          invalidArgs: args.name
        })
      }
      let newAuthor = { ...args }
      if (!args.born) {
        newAuthor.born = null
      }
      await Author.create(newAuthor)
      return newAuthor
    }
    ,
    /*
     * takes the following arguments:
     * editAuthor(
      * name: String!
      * setBornTo: Int!
     * ):Author
     *
     * type Author {
      name: String!
      born: Int
      bookCount: Int!
      }
     * */
    editAuthor: async (root, args, contextValue) => {
      if (!contextValue.currentUser) {
        throw new GraphQLError('must be logged in', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR'
          }
        })
      }

      // const authorExists = authors.some(a => a.name.trim().toLowerCase() === args.name.trim().toLowerCase())
      const author = await Author.exists({ name: args.name })
      if (!author) {
        throw new GraphQLError('user does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }
      await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
      const newAuthor = await Author.findOne({ name: args.name })
      console.assert(newAuthor.born === args.setBornTo, 'something went wrong with updating')
    },
    createUser: async (root, args) => {
      const { username } = args
      const userExists = await User.find({ username: username })
      console.log('userExists', userExists)
      if (userExists.length > 0) {
        throw new GraphQLError('user already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: username
          }
        })
      }
      const userObject = { username: username }
      await User.create(userObject)
      return userObject
    },
    login: async (root, args) => {
      const { username } = args
      const user = await User.findOne({ username: username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('favoriteGenre')
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
