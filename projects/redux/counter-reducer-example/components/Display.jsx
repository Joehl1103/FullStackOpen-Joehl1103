import { useCounterValue } from '../src/CounterContext.jsx'

const Display = () => {
  const counter = useCounterValue()
  return <div>BIG A$$ COUNTER: {counter}</div>
}

export default Display
