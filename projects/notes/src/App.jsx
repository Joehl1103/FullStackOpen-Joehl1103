import Note from './components/Note'
import { useState,useEffect } from 'react'
import axios from 'axios'




const App = () => {
  const [notes,setNotes] = useState([])
  const [newNote,setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // executed immediately after rendering

  const hook = () => {
    console.log('effect running...')
    let start = performance.now()
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
          console.log('promise fulfilled')
          setNotes(response.data)
      })
    let end = performance.now()
    console.log("total time: ",(end-start).toFixed(2))
  }
  useEffect(hook,[])

  // executed immediately since part of the body of the component
  console.log('render',notes.length,'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject= {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }
    setNotes(notes.concat(noteObject)) // isn't this mutating the state directly?
    setNewNote('') // set newNote object to blank again
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note}/>)}
      </ul>
      <form onSubmit={addNote}>
          <input 
            value={newNote}
            onChange={handleNoteChange}
          />
          <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default App
