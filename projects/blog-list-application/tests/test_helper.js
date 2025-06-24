const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const usersInDb = async () => {
    const users = await User.find({})
    const userMap = users.map(u => u.toJSON())
    return userMap
}

const userId = async () => {
    const users = await usersInDb()
    const userId = users[0]._id.toString()
    return userId
}

const getInitialBlogs = async() => {
    const id = await userId()
    const users = await usersInDb()
    const username = users[0].username
    const name = users[0].name
    const initialBlogs = [
    {
        title: "first blog post",
        author: "author",
        url: 'http://blog.com',
        likes: 4,
        user: {
            _id: id,
            username: username,
            name: name
        }
    },
    {
        title: "second blog post",
        author: "author",
        url: 'http://blog.com',
        likes: 10,
        user: {
            _id: id,
            username: username,
            name: name
        }
    }]
    return initialBlogs
}


const newBlogPost = {
    title: "new blog post",
    author: "new author",
    url: "http://blog.com",
    likes: 0,
    user: userId()
}

const newBlogsNoLikes = {
    title: "new blog post without likes",
    author: "new author",
    url: "http://blog.com"
}

const updatedBlogOne = {
    title: "first blog post modified",
    author: "author modified",
    url: 'http://blog.com',
    likes: 4
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const getFirstBlogId = async () => {
    const firstBlog = await Blog.findOne({ title: "first blog post" })
    if(!firstBlog){
        throw new Error('no blog with title `first blog post` found')
    }
    return firstBlog._id
}

const nonExistingId = '6842dd6b28663e5954fe4a30'

const generateToken = async () => {
    const users = await usersInDb()
    const firstUser = users[0]
    const token = jwt.sign(
        firstUser,
        process.env.SECRET,
    )
    return token
}


const createAndSaveNewUser = async () => {
    const passwordHash = await bcrypt.hash('daQw8S6HjB^KA!tC3*x9',10)
        const user = new User({
            username: 'jaloomis',
            name: 'Joe Loomis',
            password: passwordHash
        })
    await user.save()
}

module.exports = {
    getInitialBlogs,
    newBlogPost,
    newBlogsNoLikes,
    blogsInDb,
    getFirstBlogId,
    nonExistingId,
    updatedBlogOne,
    userId,
    usersInDb,
    generateToken,
    createAndSaveNewUser
}