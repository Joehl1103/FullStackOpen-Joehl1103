import Anecdotes from './components/Anecdotes'
import AnedoteForm from './components/AnecdoteForm'
import Filter from './components/Filter.jsx'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer.js'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
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
