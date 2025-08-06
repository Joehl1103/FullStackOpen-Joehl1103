import { useDispatch } from 'react-redux'
import { setNotes } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer.js'
import anecdoteService from '../services/anecdotes.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    await anecdoteService.addNote({ content: content, votes: 0 })
    dispatch(setNotification(`You just created a note with the following content '${content}'`))
    const anecdotes = await anecdoteService.getAll()
    dispatch(setNotes(anecdotes))
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
