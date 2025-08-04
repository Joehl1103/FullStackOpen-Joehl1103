import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    console.log('state in Anecdotes', state)
    if (state.filterValue !== '') {
      return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filterValue))
    }
    return state.anecdotes
  })

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            {anecdote.votes}
            <button onClick={() => dispatch(voteAction(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Anecdotes
