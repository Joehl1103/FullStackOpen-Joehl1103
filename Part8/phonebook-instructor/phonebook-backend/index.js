const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')

const mongoose = require('mongoose')

require('dotenv').config()

const User = require('./models/userModel.js')

const jwt = require('jsonwebtoken')

const url = process.env.MONGO_URL

const typeDefs = require('./schema.js')
const resolvers = require('./resolvers.js')

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log(`Connected to ${url}`)
  })
  .catch((e) => {
    console.warn(`Unable to connect: ${e.message}`)
  })

mongoose.set('debug', true)

const start = async () => {
  // create the express app instance
  const app = express()
  // add the express app to the http server
  const httpServer = http.createServer(app)

  // creates a websocket connection with the http server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })
  // creates a schema that takes the schema templates and the resolvers and makes them executable
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  // create an Apollo Server using the httpServer, schema and resolvers
  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [
      // shut down the apollo server
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // shut down the WebSocketServer
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          };
        },
      },
    ],
  })

  // start the server
  await server.start()

  // mounts middleware to the root path
  app.use(
    // path
    '/',
    // callback functions
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        // if there is a request object, get the authorization header
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
            // starting with at the 7th index position, or after the word 'bearer '
            auth.substring(7), process.env.JWT_SECRET
          )
          // the current user is the user object associated with the token
          const currentUser = await User
            .findById(decodedToken.id).populate('friends')
          return { currentUser }
        }
      }
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()

