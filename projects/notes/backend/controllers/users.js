const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request,response,next) => {
    const { username, name, password } = request.body

    if(password.length < 8){
        return response.status(400).json({ error: 'Password must be at least 8 characters long'})
    }

    const passwordValidation = validatePassword(password)
    if(!passwordValidation){
        return response.status(400).json({ error: 'Password must contain at least 1 upper case letter, 1 lower case, and 1 symbol: !@#$%&*' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const user = new User({
        username,
        name,
        password,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request,response) => {
    const users = await User.find({}).populate('notes', { content: 1, important: 1 })
    response.json(users)
})

function validatePassword(password){
    return validated = /^(?=.*[A-Z])(?=.*[\d])(?=.*[!*@#$%&]).*$/.test(password)
}

module.exports = usersRouter