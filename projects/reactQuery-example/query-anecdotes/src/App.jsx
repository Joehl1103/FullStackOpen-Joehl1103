import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const App = () => {

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
  const baseUrl = 'http://localhost:3001/anecdotes'

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get(baseUrl).then(res => res.data)
  })

  if (result.isPending) {
    return <div>Data is loading...</div>
  }
  if (result.isError) {
    return <div>anecdote service is not available due to problems in the server: {result.error.message}</div>
  }

  const anecdotes = result.data


  const handleVote = (anecdote) => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    incrementVoteMutation.mutate(changedAnecdote)
  }


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
