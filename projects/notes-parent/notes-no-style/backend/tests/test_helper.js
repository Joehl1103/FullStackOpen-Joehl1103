const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// NOTES
const initialNotes = [
    {
        content: 'HTML is easy',
        important: false
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true
    }
]

const nonExistingId = async () => {
    const note = new Note({ content: 'willremovethissoon'})
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}

const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

// USERS
const usersInDb = async () => {
    const users = await User.find({})
    const userMap = users.map(u => u.toJSON())
    return userMap
}

const userId = async () => {
    const users = await usersInDb()
    const userId = users[0]._id.toString()
    return userId
}

const generateToken = async () => {
    const users = await usersInDb()
    const firstUser = users[0]
    const token = jwt.sign(
        firstUser,
        process.env.SECRET,
    )
    return token
}

module.exports = { initialNotes, nonExistingId,notesInDb, usersInDb, userId, generateToken }
