const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
console.log('before api')
const api = supertest(app)
console.log('after api')

describe('testing login', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('REDACTED_TEST_PASSWORD',10)
        const user = new User({
            username: 'jaloomis',
            name: 'Joe Loomis',
            password: passwordHash
        })
        await user.save()
    })

    test.only('succeeds with status 200', async () => {
        const user = await User.findOne({ username: 'jaloomis' })
        console.log('user',user)
        const loginInfo = {
            username: user.username,
            password: 'REDACTED_TEST_PASSWORD'
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
        const user = await User.findOne({ username: 'jaloomis' })
        const loginInfo = {
            username: user.username,
            password: 'bad password'
        }

        const response = await api
            .post('/api/login')
            .send(loginInfo)
            .expect(401)
    })

    test('fails if no user', async () => {
        const loginInfo = {
            username: 'no user',
            password: 'REDACTED_TEST_PASSWORD'
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