const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const app = express()

const dbConnect = mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log(`Connected to database at url ${config.MONGODB_URI}`)
    })
    .catch((error) => {
        console.error(`Error conecting to database: ${error.message}`)
    })

app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs',blogRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)

if(process.env.NODE_ENV === 'test'){
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing',testingRouter)
}

app.use(middleware.errorHandler)

module.exports = { app, dbConnect }