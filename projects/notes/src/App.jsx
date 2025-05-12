import Note from './components/Note'
import { useState,useEffect } from 'react'
import noteService from './services/noteService'



const App = () => {
  const [notes,setNotes] = useState([])
  const [newNote,setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // executed immediately after rendering

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => { // for the response.data returned object
          setNotes(initialNotes) // set the response.data for the initial notes
      })
  }
  useEffect(hook,[])

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note,important: !note.important}
    noteService
      .update(id,changedNote)
      .then(returnedNote => {
         setNotes(notes.map(n => n.id === id ? returnedNote : n)) // map method returns a new array that is passed to the setNotes method
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted from the server`)
        setNotes(notes.filter(n => n.id !== id))
      })
    console.log(`importance of  ${id} needs to be toggled`)
  } 

  const addNote = (event) => {
    event.preventDefault()
    const noteObject= {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote)) // concat creates a new copy
        setNewNote('') // set newNote object to blank again
      })
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
          <Note 
            key={note.id}
            note={note}
            toggleImportanceOf={() => toggleImportanceOf(note.id)}/>)}
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
