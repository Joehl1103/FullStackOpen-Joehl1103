const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

router.post('/reset',async (request, response) => {
    // console.log('entering testing post')
    await Note.deleteMany({})
    // console.log('deleted all notes')
    await User.deleteMany({})
    // console.log('deleted users')

    response.status(204).end()
})

module.exports = router