import Anecdotes from './components/Anecdotes'
import AnedoteForm from './components/AnecdoteForm'
import Filter from './components/Filter.jsx'

const App = () => {

  return (
    <div>
      <Filter />
      <Anecdotes />
      <AnedoteForm />
    </div>
  )
}

export default App
