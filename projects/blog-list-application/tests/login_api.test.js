const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
console.log('before api')
const api = supertest(app.app)
console.log('after api')

describe('testing login', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await helper.deleteAndCreateRootUser()
    })

    test('succeeds with status 200', async () => {
        const user = await User.findOne({ username: 'rootey' })
        console.log('user',user)
        const loginInfo = {
            username: user.username,
            password: 'y7Xt^4gKucTkz9d78EhX'
        }

        const response = await api
            .post('/api/login')
            .send(loginInfo)
            .expect(200)

        assert.ok(response.body.token)
        assert.strictEqual(response.body.username,user.username)
        assert.strictEqual(response.body.name,user.name)

    })

    test('fails if password incorrect', async () => {
        const user = await User.findOne({ username: 'rootey' })
        const loginInfo = {
            username: user.username,
            password: 'bad password'
        }

        const response = await api
            .post('/api/login')
            .send(loginInfo)
            .expect(401)
    })

    test.only('fails if no user', async () => {
        const loginInfo = {
            username: 'no user',
            password: 'daQw8S6HjB^KA!tC3*x9'
        }

        const response = await api
            .post('/api/login')
            .send(loginInfo)
            .expect(401)
    })
})

after(async () => {
    await mongoose.connection.close()
})