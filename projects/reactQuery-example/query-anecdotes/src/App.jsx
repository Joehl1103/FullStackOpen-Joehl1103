import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const App = () => {

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

  console.log(JSON.parse(JSON.stringify('result of query', result)))


  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = result.data

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
