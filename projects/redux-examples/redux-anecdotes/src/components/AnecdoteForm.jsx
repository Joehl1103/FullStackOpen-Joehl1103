import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNote(content))
    dispatch(setNotification(`You just created a note with the following content '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div><input type="text" name='anecdote' /></div>
        <button type="submit" value="submit">create</button>
      </form>

    </>
  )
}

export default AnecdoteForm
