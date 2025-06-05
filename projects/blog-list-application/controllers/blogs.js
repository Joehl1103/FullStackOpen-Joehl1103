const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/',(request,response) => {
    console.log(`Getting data at the following path ${request.path}`)
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/',(request,response) => {
    // check if request has likes
    let requestBody = request.body
    let blog = undefined 
    // check for likes
    const likes = requestBody.likes
    const author = requestBody.author
    const title = requestBody.title

    if(!author && !title){
        response.status(400).send('author and title are missing')
        console.log(response)
        return
    } else if (!author && title){
        response.status(400).send('author is missing')
        return
    } else if (author && !title){
        response.status(400).send('no title')
        return
    }

    if (!likes){
        requestBody.likes = 0
        blog = new Blog(requestBody)
    } else {
        blog = new Blog(requestBody)
    }

    blog
        .save()
        .then((result) => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter