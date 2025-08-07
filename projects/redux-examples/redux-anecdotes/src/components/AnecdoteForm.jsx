import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { setAndRemoveNotification } from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddingAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addNewAnecdote(content))
    dispatch(setAndRemoveNotification(`You just created a note with the following content '${content}'`, 5000))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddingAnecdote}>
        <div><input type="text" name='anecdote' /></div>
        <button type="submit" value="submit">create</button>
      </form>

    </>
  )
}

export default AnecdoteForm
