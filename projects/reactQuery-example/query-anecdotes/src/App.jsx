import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdotes from './components/Anecdotes'
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

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification/>
      <AnecdoteForm />
      <Anecdotes anecdotes={anecdotes} />
    </div>
  )
}

export default App
