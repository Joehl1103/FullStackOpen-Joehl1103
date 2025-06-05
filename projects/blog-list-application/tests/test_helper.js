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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    newBlogPost,
    newBlogsNoLikes,
    blogsInDb
}