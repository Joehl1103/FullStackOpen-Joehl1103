import { useDispatch, useSelector } from "react-redux"
import { setNotes } from '../reducers/noteReducer.js'
import noteService from '../services/notes'

const Note = ({ note, handleClick }) => {
  return (
    <>
      <li key={note.id} onClick={handleClick}>
        {note.content} <strong>{note.important ? 'important' : ''}</strong>
      </li>
    </>
  )
}
const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  const handleImportanceToggle = async (id) => {
    // fetch the id and update it in the database
    const noteToChange = await noteService.getNoteById(id)
    const changedNote = {
      ...noteToChange,
      important: !noteToChange.important
    }
    await noteService.saveNote(changedNote)
    const allNotes = await noteService.getAll()
    dispatch(setNotes(allNotes))
  }

  return (
    <>
      <ul>
        {notes.map(note =>
          <Note
            key={note.id}
            note={note}
            handleClick={() => handleImportanceToggle(note.id)}
          />
        )}
      </ul>
    </>
  )
}

export default Notes
