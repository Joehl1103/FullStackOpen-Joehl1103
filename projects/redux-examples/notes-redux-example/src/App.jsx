import { createNote, toggleImportanceOf } from './reducers/noteReducer.js'
import { useSelector, useDispatch } from 'react-redux'
import NoteForm from './components/NoteForm.jsx'
import Notes from './components/Notes.jsx'

const App = () => {
  return (
    <>
      <NoteForm />
      <Notes />
    </>
  )
}

export default App
