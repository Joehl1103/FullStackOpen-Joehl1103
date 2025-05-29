const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one',() => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result,1)
})

describe('total likes',() => {

    const emptyBlogArray = []

    const oneBlogArray = [
        {
            title: "something",
            author: "someone",
            url: "http://somewhere.com",
            likes: 2
        }
    ]

    const twoBlogArray = [
        {
            title: "something",
            author: "someone",
            url: "http://somewhere.com",
            likes: 2
        },
        {
            title: "something else",
            author: "someone else",
            url: "http://somewhereElse.com",
            likes: 123
        }
    ]

    test('of empty list is zero',() => {
        assert.strictEqual(listHelper.totalLikes(emptyBlogArray),0)
    })

    test('when likes has only one blog, equals likes of that',() => {
        assert.strictEqual(listHelper.totalLikes(oneBlogArray),2)
    })

    test('of list greater than 1 equals sum of likes',() => {
        assert.strictEqual(listHelper.totalLikes(twoBlogArray),125)
    })
})