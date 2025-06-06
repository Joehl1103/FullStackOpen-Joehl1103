const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "first blog post",
        author: "author",
        url: 'http://blog.com',
        likes: 4
    },
    {
        title: "second blog post",
        author: "author",
        url: 'http://blog.com',
        likes: 10
    }
]

const newBlogPost = {
    title: "new blog post",
    author: "new author",
    url: "http://blog.com",
    likes: 0
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
    return firstBlog._id
}

const nonExistingId = '6842dd6b28663e5954fe4a30'

module.exports = {
    initialBlogs,
    newBlogPost,
    newBlogsNoLikes,
    blogsInDb,
    getFirstBlogId,
    nonExistingId,
    updatedBlogOne
}