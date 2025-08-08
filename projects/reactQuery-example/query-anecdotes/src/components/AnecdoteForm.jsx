import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const baseUrl = 'http://localhost:3001/anecdotes'

  const createAnecdote = (newAnecdote) => {
    console.log('anecdote in createAnecdote', newAnecdote)
    const result = axios.post(baseUrl, newAnecdote)
      .then(res => {
        console.log('post request went through successfully', res)
        return res.data
      })
      .catch((err) => {
        console.log(`Error in post request ${err.message}`)
      })
    console.log('result in createAnecdote', result)
    return result
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      console.log('newAnecdote in newAnecdoteMutation', newAnecdote)
      const notes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], notes.concat(newAnecdote))
    }
  })

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
