import NoteForm from './components/NoteForm.jsx'
import Notes from './components/Notes.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'

const App = () => {
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
