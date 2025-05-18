import express from 'express'
const app = express()

// DATA
import persons from './db.json' with {type: "json"}

// HELPER METHODS
const nPersons = [...persons.map(n => n.id)].length
const todayInfo = new Date(Date.now())

// HTTP METHODS

app.get('/',(request,response) => {
    response.send("<h1>Hello guys</h1><br/><p>What is uuuuuuuuuuup?!")
})

app.get('/info',(request,response) => {
    response.send(`<p>Phonebook as info for ${nPersons} persons</p><br>${todayInfo}`)
})

app.get('/api/persons',(request,response) => {
    response.send(persons)
})

const PORT = 3001
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})