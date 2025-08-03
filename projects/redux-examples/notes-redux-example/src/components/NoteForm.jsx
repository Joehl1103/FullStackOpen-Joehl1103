import { useDispatch } from "react-redux";
import { createNote } from '../reducers/noteReducer.js'

const NoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
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
