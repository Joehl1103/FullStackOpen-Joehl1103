const notesRouter = require('express').Router()
const Note = require('../models/note.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

// Fetch All
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ','')
    }
    return null
}
notesRouter.get('/',async (request,response,next) => {
    try {
        const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
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
    console.log('BEGINNING OF NOTES POST')
    const body = request.body
    console.log('body',body)
    const content = body.content
    const important = body.important
    // decodes the payload
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    console.log('decoded token in backend post method',decodedToken)
    const decodedTokenId = decodedToken._id
    if(!decodedTokenId){
        console.log('no decoded token')
        return response.status(401).json({ error: 'token invalid' })
    }
    console.log('decoded token ok')
    const user = await User.findById(decodedTokenId)

    if(!user){
        console.log('no user')
        return response.status(400).json({ error: 'userId missing or not valid'})
    }
    console.log('user ok')

    if (!content || important === undefined){
        console.log('no content or importance')
        // console.log('content',content)
        // console.log('important',important)
        response.status(400).send({ error: 'content or importance missing' })
        return
    }

    const note =  new Note({
        content: body.content,
        important: body.important || false,
        user: user._id
    })
    console.log('new note in post method',note)


    const savedNote = await note.save()
    console.log('savedNote',savedNote)
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