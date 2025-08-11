import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useNotificationDispatch } from '../NotificationContext'

const Anecdotes = ({ anecdotes }) => {

  const notificationDispatch = useNotificationDispatch()

  const baseUrl = 'http://localhost:3001/anecdotes'

  const queryClient = useQueryClient()

  const incrementVote = (changedAnecdote) => {
    return axios.put(`${baseUrl}/${changedAnecdote.id}`, changedAnecdote).then(res => res.data)
  }

  const incrementVoteMutation = useMutation({
    mutationFn: incrementVote,
    onSuccess: (changedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => {
        if (a.id === changedAnecdote.id) {
          return changedAnecdote
        }
        return a
      }))
    }
  })

  const handleVote = (anecdote) => {
    console.log('anecdote in handleVote', anecdote)
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    incrementVoteMutation.mutate(changedAnecdote)
    notificationDispatch({ type: 'UPVOTE', payload: anecdote.content })
    setTimeout(() => {
      notificationDispatch({ type: 'NONE' })
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote => {
        return (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
        )
      }
      )}
    </>
  )
}

export default Anecdotes
