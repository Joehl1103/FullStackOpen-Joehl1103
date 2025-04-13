import { useState } from "react"

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter+1)}>
        plus
      </button>
    </>
  )
}

export default App