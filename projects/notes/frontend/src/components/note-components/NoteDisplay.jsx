import { useState } from 'react'
import noteService from '../../services/noteService'
import Note from './Note'

const NoteDisplay = (props) => {
    const [showAll, setShowAll] = useState(true)
    // executed immediately after rendering

    const toggleImportanceOf = (id) => {
        const note = props.notes.find(n => n.id === id)
        const changedNote = { ...note,important: !note.important }
        noteService
            .update(id,changedNote)
            .then(returnedNote => {
                props.setNotes(props.notes.map(n => n.id === id ? returnedNote : n)) // map method returns a new array that is passed to the props.setNotes method
            })
            .catch(error => {
                props.setErrorMessage(
                    `${error.message}: Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    props.setErrorMessage(null)
                },5000)
                props.setNotes(props.notes.filter(n => n.id !== id))
            })
    }

    const deleteNote = (id) => {
        if(window.confirm('Are you sure you want to delete this note?')){
            noteService.deleteNote(id)
                .then(() => {
                    const notesCopy = [...props.notes].filter(note => note.id !== id)
                    props.setNotes(notesCopy)
                })
                .catch(error => {
                    console.log(`Error deleting note in the front end ${error.message}`)
                })
        }
    }

    const notesToShow = showAll ? props.notes : props.notes.filter(note => note.important === true)

    return (
        <div>
            <h4>List of Notes</h4>
            <button onClick={() => setShowAll(!showAll)}>
                Show {showAll ? 'important notes' : 'all notes'}
            </button>
            <div>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportanceOf={() => toggleImportanceOf(note.id)}
                        deleteNote={deleteNote}/>)}
            </div>
        </div>
    )
}

export default NoteDisplay
