import noteService from "../services/noteService"

const NoteForm = ({ newNote, setNotes, setNewNote,notes}) => {

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
          .catch(exception => {
            console.log('exception in noteService.create',exception)
          })
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