import { useState } from 'react'
import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import { useField } from './hooks/index.js'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  console.log('anecdotes in AnecdoteList', anecdotes)
  return (
    < div >
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => {
          return (
            <li key={anecdote.id} >
              <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
            </li>
          )
        })
        }
      </ul >
    </div >
  )
}

const Anecdote = ({ anecdote }) => {
  console.log(`displaying individual anecdote ${anecdote.content}`)

  return (
    <>
      <h3>{anecdote.content}</h3>
      <span>by {anecdote.author}</span><br />
      <span>url: <Link to={`${anecdote.url}`}>{anecdote.url}</Link ></span >
    </>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ setNotification, addNew }) => {
  const copyObjectWithoutOnReset = (original) => {
    return Object.assign({}, Object.keys(original).reduce((acc, key) => {
      if (key !== 'onReset') {
        acc[key] = original[key]
      }
      return acc
    }, {}))
  }
  const content = useField('content')
  const contentCopy = copyObjectWithoutOnReset(content)
  const author = useField('author')
  const authorCopy = copyObjectWithoutOnReset(author)
  const url = useField('url')
  const urlCopy = copyObjectWithoutOnReset(url)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('event in handleSumit', e)
    addNew({
      content: content.value,
      author: author.value,
      url: url.value,
      votes: 0
    })
    setNotification(`Created new note by ${author.value}`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const handleReset = () => {
    content.handleReset()
    author.handleReset()
    url.handleReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...contentCopy} />
        </div>
        <div>
          author
          <input {...authorCopy} />
        </div>
        <div>
          url for more info
          <input {...urlCopy} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const Notification = ({ notification }) => {
  const border = {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 2,
    padding: 5
  }

  return (
    <>
      <div style={border}>
        {notification}
      </div>

    </>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      url: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      url: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/:id')
  const anecdote = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      {notification ? <Notification notification={notification} /> : null}
      <Menu />
      <hr />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} notification={notification} setNotification={setNotification} />} />
      </Routes>
      <hr />
      <Footer />

    </div>
  )
}

export default App
