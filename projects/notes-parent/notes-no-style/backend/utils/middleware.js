const logger = require('./logger.js')

const requestLogger = (request,response,next) => {
    logger.info('Method:',request.method)
    logger.info('Path:',request.path)
    logger.info('Body:',request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request,response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error,request,response,next) => {
    // console.log('error handler')
    // console.log('request body',request)
    // console.log('error response body',response)
    console.error('error message in the error handler: ',error.message)

    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'malformed id' })
    } else if(error.name === 'ValidationError'){
        console.log(error.name)
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
        return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name === 'JsonWebTokenError'){
        return response.status(401).json({ error: 'token invalid' })
    } else if (error.name === 'TokenExpiredError'){
        return response.status(401).json({ error: 'token expired' })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}