import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

    const addNote = (event) => {
        event.preventDefault()
        createNote({
          content: newNote,
          important: true,
        })
        setNewNote('') // set newNote object to blank again
    }

    const handleNoteChange = (event) => {
        // console.log(event.target.value)
        setNewNote(event.target.value)
      }
    return (
      <>
      <h4>Add new note</h4>
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

export default NoteForm