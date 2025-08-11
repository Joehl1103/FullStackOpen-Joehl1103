import { useCounterDispatch } from '../src/CounterContext.jsx'

const Button = ({ label, type }) => {
  const dispatch = useCounterDispatch()

  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}

export default Button
