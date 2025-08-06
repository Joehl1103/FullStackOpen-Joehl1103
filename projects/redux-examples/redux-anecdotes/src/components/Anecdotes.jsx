import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvote, setNotes } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer.js'
import Notifications from './Notifications.jsx'
import anecdoteService from '../services/anecdotes.js'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const filterState = useSelector(state => state.filterValue)
  let anecdotes = useSelector(state => state.anecdotes)
  if (filterState !== '') {
    anecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filterState))
  }

  const handleUpvote = (id, content) => {
    dispatch(upvote(id))
    dispatch(setNotification(`You just upvoted '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      <Notifications />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            {anecdote.votes}
            <button onClick={() => handleUpvote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Anecdotes
