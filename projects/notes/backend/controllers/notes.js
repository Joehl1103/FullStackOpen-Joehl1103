const notesRouter = require('express').Router()
const Note = require('../models/note.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

// Fetch All
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    // TODO does the authorization header automatically contain a Bearer option or does this need to be specified?
    if(authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ','')
    }
    return null
}
notesRouter.get('/',async (request,response,next) => {
    try {
        const notes = await Note.find({}).populate('user', { username: 1, name: 1})
        response.json(notes)
    } catch (error){
        console.log('an error occurred. Transferring error to error handling middleware')
        next(error)
    }
})

notesRouter.get('/:id',async (request,response) => {
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

notesRouter.post('/',async (request,response) => {
    const body = request.body
    const content = body.content
    const important = body.important
    // decodes the payload
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    const decodedTokenId = decodedToken._id
    if(!decodedTokenId){
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedTokenId)

    if(!user){
        return response.status(400).json({ error: 'userId missing or not valid'})
    }
    if (!content || !important){
        response.status(400).send({ error: 'content or importance missing' })
        return
    }

    const note =  new Note({
        content: body.content,
        important: body.important || false,
        user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.status(201).json(savedNote)
})

notesRouter.put('/:id',(request,response,next) => {
    const { content,important } = request.body

    Note.findById(request.params.id)
        .then(note => {
            if(!note){
                return response.status(400).end()
            }

            note.content = content
            note.important = important

            return note.save().then((updatedNote => {
                response.json(updatedNote)
            }))
        })
        .catch(error => next(error))
})

//Delete Note
notesRouter.delete('/:id',async (request,response) => {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = notesRouter