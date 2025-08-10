import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import NotificationContext, { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {

  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const baseUrl = 'http://localhost:3001/anecdotes'

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

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
    notificationDispatch({ type: 'NEW', payload: content })
    setTimeout(() => {
      notificationDispatch({ type: 'NONE' })
    }, 5000)
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
