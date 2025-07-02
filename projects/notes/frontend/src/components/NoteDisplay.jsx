import { useState} from "react"
import noteService from "../services/noteService"
import Note from './Note'

const NoteDisplay = (props) => {
 
    const [showAll, setShowAll] = useState(true)
    
    // executed immediately after rendering

    const toggleImportanceOf = (id) => {
        const note = props.notes.find(n => n.id === id)
        const changedNote = {...note,important: !note.important}
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
        noteService.deleteNote(id)
          .then(response => {
            // console.log("delete response",response)
            const notesCopy = [...props.notes].filter(note => note.id !== id)
            props.setNotes(notesCopy)

          })
      }

      // console.log('notes in notedisplay',props.notes)
      const notesToShow = showAll ? props.notes : props.notes.filter(note => note.important === true)

      return (
        <div>
            <button onClick={() => setShowAll(!showAll)}>
                Show {showAll ? 'important' : 'all'}
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
