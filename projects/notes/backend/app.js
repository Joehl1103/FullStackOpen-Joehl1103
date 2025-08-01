const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const middleware = require('./utils/middleware.js')
const notesRouter = require('./controllers/notes.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')


const app = express()

if(process.env.NODE_ENV === 'test'){
    console.log('connecting to test database at ',config.MONGODB_URI)
    // logger.info('connecting to test database at ',config.MONGODB_URI)
} else {
    console.log('connecting to test database at ',config.MONGODB_URI)
    // logger.info('connecting to production database at ',config.MONGODB_URI)
}

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
        // logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:',error.message)
    })


app.use(express.static('dist'))

app.use(express.json())
app.use(middleware.requestLogger)

// connects to the main api route
app.use('/api/notes',notesRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)

// reset the database if started in test mode
if (process.env.NODE_ENV === 'test'){
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing',testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app