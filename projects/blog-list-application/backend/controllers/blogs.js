const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user') 
const jwt = require('jsonwebtoken')
const helper = require('../tests/test_helper')
const blog = require('../models/blog')
const middleware = require('../utils/middleware')

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if(authorization && authorization.startsWith('Bearer')){
//         return authorization.replace('Bearer ','')
//     }
//     return
// }

blogsRouter.get('/',async (request,response) => {
    const blogs = await Blog.find({}).populate('user',{ name: 1, username: 1 })
    response.status(200).json(blogs)
})

blogsRouter.post('/',middleware.userExtractor, async (request,response) => {
    console.log('entering post')
    let body = request.body
    const user = request.user
    if(!user){
        return response.status(400).json({ error: 'userId missing or not valid' })
    }

    if(!body.author && !body.title){
        response.status(400).send('author and title are missing')
        return
    } else if (!body.author && body.title){
        response.status(400).send('author is missing')
        return
    } else if (body.author && !body.title){
        response.status(400).send('no title')
        return
    }
    if (!body.likes){
        body.likes = 0
    } 
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    if(savedBlog){
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request,response) => {
    console.log('params',request.params)
    const id = request.params.id
    if(!id){
        console.log('no id')
        return response.status(400).send('id not found in request')
    }
    const blogToBeDeleted = await Blog.findById(id)
    if(!blogToBeDeleted){
        console.log('no blog to be deleted')
        return response.status(404).send('no blog found')
    }
    const user = request.user
    console.log('user',user)
    const blogUser = blogToBeDeleted.user.toString()
    console.log('blogToBeDeleted',blogToBeDeleted)
    console.log('blogUser',blogUser)
    // if(!(user.id === blogUser)){
    //     console.log('user id and blogUser id are not the same')
    //     return response.status(401).json({ error: `id of token not the same as id of blog user` })
    // }
    try {
        await Blog.deleteOne({ _id: id })
        console.log('succesfully deleted!')
        return response.status(204).send('blog successfully deleted')
    } catch (e) {
        return response.status(500).json({ error: 'error while deleting' })
    }
})

blogsRouter.put('/:id', async (request,response) => {
    const id = request.params.id
    const body = request.body
    const blogToBeUpdated = await Blog.findById(id)
    if(!blogToBeUpdated){
        response.status(404).send('no blog found')
        return
    }
    const blogToBeUpdatedId = blogToBeUpdated._id
    await Blog.findByIdAndUpdate(blogToBeUpdatedId,body)
    response.status(200).send('blog updated correctly')
})

module.exports = blogsRouter