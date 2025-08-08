import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CounterContextProvider } from './CounterContext.jsx'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
)
