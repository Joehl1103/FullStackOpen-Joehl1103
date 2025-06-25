const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user') 
const jwt = require('jsonwebtoken')
const helper = require('../tests/test_helper')
const blog = require('../models/blog')

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

blogsRouter.post('/',async (request,response) => {
    // check if request has likes
    let body = request.body
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    console.log('decoded token',decodedToken)
    if(!decodedToken._id){
        console.log('decoded token not ok')
        return response.status(401).json({ error: 'token invalid' })
    }
    console.log('decoded token ok')
    const user = await User.findById(decodedToken._id)
    // check for likes
    if(!user){
        return response.status(400).json({ error: 'userId missing or not valid' })
    }
    console.log('user ok')

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

blogsRouter.delete('/:id', async (request,response) => {
    const id = request.params.id
    if(!id){
        return response.status(400).send('id not found in request')
    }
    const blogToBeDeleted = await Blog.findById(id)
    if(!blogToBeDeleted){
        return response.status(400).send('no blog found')
    }
    
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    console.log('decoded token',decodedToken)
    //TODO note that I am changing to .id but that I am keeping an eye out for where it might fail because of being ._id
    const user = await User.findById(decodedToken.id)
    const blogUser = blogToBeDeleted.user.toString()
    console.log('blogUser',blogUser)
    //TODO idem
    console.log(user.id)
    //TODO idem
    if(!(user.id === blogUser)){
        console.log('user id and blogUser id are not the same')
        return response.status(401).json({ error: `id of token not the same as id of blog user` })
    }
    
    console.log('blog user id',blogToBeDeleted.toString())
    try {
        await Blog.deleteOne({ _id: id })
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