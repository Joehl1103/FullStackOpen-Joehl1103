import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNote(content))
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
