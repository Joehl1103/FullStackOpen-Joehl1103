const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/',(request,response) => {
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

blogsRouter.delete('/:id', async (request,response) => {
    const id = request.params.id
    if(!id){
        response.status(400).send('id not found in request')
        return
    }
    const blogToBeDeleted = await Blog.findById(id)
    if(!blogToBeDeleted){
        response.status(400).send('no blog found')
        return
    }
    await Blog.deleteOne({ _id: `${id}`})
    const blog = await Blog.find({ _id: `${id}`})
    if(blog.length === 0){
        response.status(204).send('blog successfully deleted')
        return
    } else {
        response.status(400).send('blog not deleted')
        return
    }
})

module.exports = blogsRouter