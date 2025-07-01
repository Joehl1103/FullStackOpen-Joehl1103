const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request,response) => {
    const { username, password } = request.body
    console.log(`logging in with ${username} and ${password}`)
    const user = await User.findOne({ username })
    console.log('Found user',user)
    const passwordCorrect = user === null ? false : await bcrypt.compare(password,user.passwordHash)
    console.log('password correct',passwordCorrect)
    if(!(user && passwordCorrect)){
        console.log('user or password incorrect')
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }
    console.log('user and password correct')

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60*60 }
    )


    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter