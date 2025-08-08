import { useContext } from 'react'
import CounterContext from '../src/CounterContext'

const Display = () => {
  const [counter, dispatch] = useContext(CounterContext)
  return <div>BIG A$$ COUNTER: {counter}</div>
}

export default Display
