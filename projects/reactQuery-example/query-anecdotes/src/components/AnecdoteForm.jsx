import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createAnecdote = (newAnecdote) => {
    const result = axios.post(baseUrl, newAnecdote)
      .then(res => {
        return res.data
      })
      .catch((err) => {
        console.log(`Error in post request ${err.message}`)
      })
    return result
  }
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const notes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], notes.concat(newAnecdote))
    }
  })

  const baseUrl = 'http://localhost:3001/anecdotes'



  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
