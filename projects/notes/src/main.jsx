import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// const notes = [
//   {
//     id:1,
//     content: 'HTML is easy',
//     important: Math.random() < 0.5
//   },
//   {
//     id:2,
//     content: 'CSS is a little less easy',
//     important:true 
//   },
//   {
//     id:3,
//     content: 'JS is not easy at all',
//     important: Math.random() < 0.5
//   }
// ]

createRoot(document.getElementById('root')).render(<App/>)
