const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to database')
    })
    .catch((error) => {
        console.error(`Error conecting to database: ${error.message}`)
    })

app.use(express.json())

app.use('/api/blogs',blogRouter)

app.use(middleware.errorHandler)

module.exports = app