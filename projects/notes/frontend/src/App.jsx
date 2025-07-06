import { useState,useEffect } from 'react'
import Notification from './components/Notification'
import Footer from './components/Footer'
import NoteDisplay from './components/NoteDisplay'
import NoteForm from './components/NoteForm'
import noteService from './services/noteService'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [errorMessage,setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [notes,setNotes] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])

  // prevents the notes from rendering on first render, until the useEffect goes into action
  // console.log('notes at start',notes)
  if(!notes){
      return null;
  }

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.clear()
    window.location.reload()

  }

  const addNote = (noteObject) => {
    noteService
          .create(noteObject)
          .then(returnedNote => {
            setNotes(notes.concat(returnedNote)) // concat creates a new copy
          })
          .catch(exception => {
            console.log('exception in noteService.create',exception)
          })
  }

  return (
    <>
      <h1>Notes</h1>

      <Notification message={errorMessage}/>

      {user === null ? 
        <Togglable buttonLabel='Show login form'>
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            setUser={setUser}
            setErrorMessage={setErrorMessage}
          />
        </Togglable>
        : 
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p> 
          <Togglable buttonLabel='add new note'>
            <NoteForm createNote={addNote}/>
          </Togglable>
          
        </div>
      }
      
      <NoteDisplay 
        setErrorMessage={setErrorMessage}
        notes={notes}
        setNotes={setNotes}
        />
      <Footer/>
    </>
  )
}

export default App
