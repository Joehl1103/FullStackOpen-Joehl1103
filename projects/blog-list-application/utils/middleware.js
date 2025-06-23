const tokenExtractor = (request,response,next)=>{
    const authorization = request.get('authorization')

    if(authorization && authorization.startsWith('Bearer')){
        let token = authorization.replace('Bearer ','')
        request.token = token
    }
    next()
}

const errorHandler = (error,request,response,next) => {
    if(error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message})
    } else if (
        error.name === 'MongoServerError'
        &&
        error.message.includes('E11000 duplicate key erro')
        ){
            return response.status(400).json({ error: 'expected `username` to be unique'})
    } else if (error.name === 'JsonWebTokenError'){
        return response.status(401).json({ error: 'token invalid' })
    } else if (error.name === 'TokenExpiredError'){
        return response.status(401).json({ error: 'token expired' })
    } else if (error.name === 'TypeError'){
        return response.status(401).json({ error: 'type error'})
    } else if(error.name === 'MongoPoolClosedError'){
        return response.status(401).json({ error: `${error.messsage}`})
    }

    next(error)
}

module.exports = { errorHandler,tokenExtractor }