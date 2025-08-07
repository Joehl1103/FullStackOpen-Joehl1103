import { useEffect } from 'react'
import NoteForm from './components/NoteForm.jsx'
import Notes from './components/Notes.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'
import { initializeNotes } from './reducers/noteReducer.js'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getNotes } from './requests.js'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [])

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: () => getNotes
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data ...</div>
  }

  const notes = result.data

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
