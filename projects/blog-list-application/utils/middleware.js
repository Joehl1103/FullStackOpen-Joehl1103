const errorHandler = (error,request,response,next) => {
    console.log(`Error: ${error.message}`)
}

module.exports = { errorHandler }