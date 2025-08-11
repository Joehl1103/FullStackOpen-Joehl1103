import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Footer from './components/Footer'
import NoteDisplay from './components/note-components/NoteDisplay'
import NoteForm from './components/note-components/NoteForm'
import noteService from './services/noteService'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/togglable/Togglable'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])
  const notesFormRef = useRef()

  const getAllNotesHook = () => {
    noteService
      .getAll()
      .then(initialNotes => { // for the response.data returned object
        setNotes(initialNotes) // set the response.data for the initial notes
      })
  }
  useEffect(
    getAllNotesHook,
    [] // ensures that the hook only runs once, meaning that the content never changes
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  // prevents the notes from rendering on first render, until the useEffect goes into action
  // console.log('notes at start',notes)
  if (!notes) {
    return null
  }
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('logged in with user', user)
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      console.log(`token set to ${user.token}`)
      setUser(user)

    } catch (e) {
      console.log(`Error: ${e.message}`)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.clear()
    window.location.reload()

  }

  const addNote = (noteObject) => {
    notesFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote)) // concat creates a new copy
      })
      .catch(exception => {
        console.log('exception in noteService.create', exception)
      })
  }

  return (
    <>
      <h1 data-testid="main-notes-header">Notes</h1>

      <Notification message={errorMessage} />

      {user === null ?
        <Togglable buttonLabel='Show login form'>
          <LoginForm loginUser={handleLogin} />
        </Togglable>
        :
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
          <Togglable buttonLabel='add new note' ref={notesFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      }
      <NoteDisplay setErrorMessage={setErrorMessage}
        notes={notes}
        setNotes={setNotes}
      />
      <Footer />
    </>
  )
}

export default App
