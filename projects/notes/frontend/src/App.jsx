import Note from './components/Note'
import { useState,useEffect } from 'react'
import noteService from './services/noteService'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'


const App = () => {
  const [notes,setNotes] = useState([])
  const [newNote,setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // executed immediately after rendering

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
  if(!notes){
    return null;
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note,important: !note.important}
    noteService
      .update(id,changedNote)
      .then(returnedNote => {
         setNotes(notes.map(n => n.id === id ? returnedNote : n)) // map method returns a new array that is passed to the setNotes method
      })
      .catch(error => {
        setErrorMessage(
          `${error.message}: Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  } 

  const addNote = (event) => {
    event.preventDefault()
    const noteObject= {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote)) // concat creates a new copy
        setNewNote('') // set newNote object to blank again
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const deleteNote = (id) => {
    noteService.deleteNote(id)
      .then(response => {
        console.log("delete response",response)
        const notesCopy = [...notes].filter(note => note.id !== id)
        setNotes(notesCopy)
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with',username,password)
    try{
      const user = await loginService.login({
        username,password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  const loginForm = () =>{
    return (
      <form onSubmit={handleLogin}>
        <div>
          username:{' '}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{' '}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>)
  }

  const noteForm = () =>{
    return(
    <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Submit</button>
    </form>
    )
  }

  return (
    <>
      <h1>Notes</h1>

      <Notification message={errorMessage}/>

      {user === null ? loginForm() : 
        <div>
          <p>{user.name} logged-in</p>
          noteForm()
        </div>
      }
      
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? 'important' : 'all'}
      </button>
      <div>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportanceOf={() => toggleImportanceOf(note.id)}
            deleteNote={deleteNote}/>)}
      </div>
      
      <Footer/>
    </>
  )
}

export default App
