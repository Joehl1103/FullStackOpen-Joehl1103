const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user') 

blogsRouter.get('/',(request,response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/',async (request,response) => {

    // check if request has likes
    let body = request.body
    console.log('body',body)
    // check for likes
    const likes = body.likes
    const author = body.author
    const title = body.title
    const userId = body.user
    console.log('userId',userId)

    const user = await User.findById(body.user)
    console.log('checking user')
    if(!user){
        console.log('no user')
        return response.status(400).json({ error: 'userId missing or not valid' })
    }

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
        body.likes = 0
    } 

    const blog = new Blog({
        title: title,
        author: author,
        url: body.url,
        likes: likes,
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