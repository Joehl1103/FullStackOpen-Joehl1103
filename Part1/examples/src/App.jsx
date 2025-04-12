import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)
  console.log(`State set to counter=${counter}`)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  console.log("rendering...")

  return (
    <div>{counter}</div>
  )
}

export default App
