import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const notes = [
  {
    id:1,
    content: 'HTML is easy',
    important: true
  },
  {
    id:2,
    content: 'CSS is a little less easy',
    important:false
  },
  {
    id:3,
    content: 'JS is not easy at all',
    important: true
  }
]

createRoot(document.getElementById('root')).render(<App notes={notes} />)
