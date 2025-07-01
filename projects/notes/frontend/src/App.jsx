import { useState,useEffect } from 'react'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Login from './components/Login'
import NoteDisplay from './components/NoteDisplay'
import NoteForm from './components/NoteForm'
import noteService from './services/noteService'

const App = () => {
  const [errorMessage,setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [notes,setNotes] = useState([])
  const [newNote,setNewNote] = useState('')

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => { // for the response.data returned object
          setNotes(initialNotes) // set the response.data for the initial notes
      })
  }
  useEffect(
    hook,
    [] // ensures that the hook only runs once, meaning that the content never changes
  )

  // prevents the notes from rendering on first render, until the useEffect goes into action
  console.log('notes at start',notes)
  if(notes.length === 0){
      return null;
  }

  return (
    <>
      <h1>Notes</h1>

      <Notification message={errorMessage}/>

      {user === null ? <Login setErrorMessage={setErrorMessage} setUser={setUser}/> : 
        <div>
          <p>{user.name} logged-in</p>
          <NoteForm
            setNotes={setNotes}
            setNewNote={setNewNote}/>
        </div>
      }
      
      <NoteDisplay 
        setErrorMessage={setErrorMessage}
        notes={notes}
        setNotes={setNotes}
        newNote={newNote}
        setNewNote={setNewNote}
        />
      <Footer/>
    </>
  )
}

export default App
