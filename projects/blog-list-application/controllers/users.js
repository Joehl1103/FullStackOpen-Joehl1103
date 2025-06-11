const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/',async (request,response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const user = new User({
        username,
        name,
        password
    })
    console.log('saving')
    const savedUser = await user.save()
    console.log('saved')

    response.status(201).json(savedUser)
})

usersRouter.get('/', async(request,response) => {
    const blogs = await User.find({}).populate('blogs', { title: 1,author:1,})
    response.status(200).json(blogs)

})

module.exports = usersRouter