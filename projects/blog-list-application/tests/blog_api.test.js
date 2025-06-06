const { test, after, beforeEach, describe } = require('node:test')
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

test('if likes missing default to 0', async () => {
    await api
        .post('/api/blogs')
        .send(helper.newBlogsNoLikes)
        .expect(201)
        .expect('Content-Type',/application\/json/)

    const response = await api.get('/api/blogs')
    const newBlogPostFromResponse = response.body[2]

    assert.strictEqual(newBlogPostFromResponse.likes,0)
})

test.describe('that missing title and author give bad request and message test suite', async () => {

    const blogWithMissingTitleAndAuthor = {
        likes: 0
    }

    const blogWithMissingTitle = {
        author: "author",
        likes: 0
    }

    const blogWithMissingAuthor = {
        title: "title",
        likes: 0
    }

    test('that missing title and author give bad requests and message', async () => {
   

        const response = await api
            .post('/api/blogs')
            .send(blogWithMissingTitleAndAuthor)
            .expect(400)
            .expect('Content-Type',/text\/html/)

        assert.strictEqual(response.text,'author and title are missing')

                

    })

    test('that missing author give bad request and message', async () => {
   

        const response = await api
            .post('/api/blogs')
            .send(blogWithMissingAuthor)
            .expect(400)
            .expect('Content-Type',/text\/html/)

        assert.strictEqual(response.text,'author is missing')

                

    })

     test('that missing title give bad request and message', async () => {
   

        const response = await api
            .post('/api/blogs')
            .send(blogWithMissingTitle)
            .expect(400)
            .expect('Content-Type',/text\/html/)

        assert.strictEqual(response.text,'no title')

                

    })
})
describe('deleting tests', () => {
    test('that deleting test successfully gives 204 bad request', async () => {
        const firstBlogId = await helper.getFirstBlogId()
        await api
            .delete(`/api/blogs/${firstBlogId}`)
            .expect(204)
    })

    test('that non-existent id causes 400 error', async () => {
        await api
            .delete(`/api/blogs/${helper.nonExistingId}`)
            .expect(400)
    })

    test('that no id returns 400', async () => {
        await api
            .delete('/api/blogs')
            .expect(404)
    })

})


after(async () => {
    await mongoose.connection.close()
})

