import noteService from "../services/noteService"

const NoteForm = (props) => {

    const addNote = (event) => {
        event.preventDefault()
        const noteObject= {
          content: props.newNote,
          important: Math.random() < 0.5,
        }
        noteService
          .create(noteObject)
          .then(returnedNote => {
            props.setNotes(props.notes.concat(returnedNote)) // concat creates a new copy
            props.setNewNote('') // set newNote object to blank again
          })
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        props.setNewNote(event.target.value)
      }
    return (
        <form onSubmit={addNote}>
            <input 
                value={props.newNote}
                onChange={handleNoteChange}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default NoteForm