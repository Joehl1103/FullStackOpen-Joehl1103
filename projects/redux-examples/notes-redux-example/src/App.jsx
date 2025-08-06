import { useEffect } from 'react'
import NoteForm from './components/NoteForm.jsx'
import Notes from './components/Notes.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'
import { initializeNotes } from './reducers/noteReducer.js'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [])

  return (
    <>
      <NoteForm />
      <h2>Notes</h2>
      <VisibilityFilter />
      <Notes />
    </>
  )
}

export default App
