import { useContext } from 'react'
import CounterContext from '../src/CounterContext'

const Button = ({ label, type }) => {
  const [counter, dispatch] = useContext(CounterContext)

  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}

export default Button
