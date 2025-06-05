const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('get all blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length,helper.initialBlogs.length)
})

test('name of id equals `id`', async () => {
    const response = await api.get('/api/blogs')
    assert.ok(response.body[0].hasOwnProperty('id'))

})

test('post new blog', async () => {
    const newBlog = helper.newBlogPost

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const newBlogPostFromResponse = response.body[2]

    assert.strictEqual(response.body.length,helper.initialBlogs.length + 1)
    assert.strictEqual(newBlogPostFromResponse.title,newBlog.title)

})

test.only('if likes missing default to 0', async () => {
    await api
        .post('/api/blogs')
        .send(helper.newBlogsNoLikes)
        .expect(201)
        .expect('Content-Type',/application\/json/)

    const response = await api.get('/api/blogs')
    const newBlogPostFromResponse = response.body[2]

    assert.strictEqual(newBlogPostFromResponse.likes,0)
})

after(async () => {
    await mongoose.connection.close()
})