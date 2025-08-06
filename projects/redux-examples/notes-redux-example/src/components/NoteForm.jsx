import { useDispatch } from "react-redux";
import { createNote } from '../reducers/noteReducer.js'
import noteService from '../services/notes.js'

const NoteForm = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <>
      <h2>Add note</h2>
      <form onSubmit={addNote}>
        <input name='note' /> {/* this allows us to access the value by using target.value.note*/}
        <button type='submit'>add</button>
      </form>
    </>
  )
}

export default NoteForm
