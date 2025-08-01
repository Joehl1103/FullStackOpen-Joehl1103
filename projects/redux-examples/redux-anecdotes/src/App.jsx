import { useSelector, useDispatch } from 'react-redux'
import store from './store.js'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type: 'UPVOTE', payload: id })
  }

  const addNewNote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('content', content)
    event.target.anecdote.value = ''
    console.log('content', content)

    dispatch({ type: 'NEW_NOTE', payload: { content: content } })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNewNote}>
        <div><input type="text" name='anecdote' /></div>
        <button type="submit" value="submit">create</button>
      </form>
    </div>
  )
}

export default App
