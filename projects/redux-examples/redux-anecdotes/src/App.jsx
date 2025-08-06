import Anecdotes from './components/Anecdotes'
import AnedoteForm from './components/AnecdoteForm'
import Filter from './components/Filter.jsx'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes.js'
import { setNotes } from './reducers/anecdoteReducer.js'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll()
      .then(anecdotes => {
        dispatch(setNotes(anecdotes))
      })
  }, [])

  return (
    <div>
      <Filter />
      <Anecdotes />
      <AnedoteForm />
    </div>
  )
}

export default App
