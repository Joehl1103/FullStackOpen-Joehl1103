import { useEffect } from 'react'
import NoteForm from './components/NoteForm.jsx'
import Notes from './components/Notes.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'
import { initializeNotes } from './reducers/noteReducer.js'
import { useDispatch } from 'react-redux'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getNotes, createNote } from './requests.js'

const App = () => {

  const newNoteMutation = useMutation({ mutationFn: createNote })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: () => getNotes()
  })

  if (result.isLoading) {
    return <div>loading data ...</div>
  }

  const notes = result.data


  return (
    <>
      <NoteForm addNote={addNote} />
      <h2>Notes</h2>
      <VisibilityFilter />
      <Notes notesArray={notes} />
    </>
  )
}

export default App
