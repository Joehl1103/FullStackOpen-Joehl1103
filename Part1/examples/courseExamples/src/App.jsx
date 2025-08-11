import { useState } from "react"

const Display = ({ counter }) => {
  console.log('counter in Display', counter)
  return (
    <div>{counter}</div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const useCounter = () => {
  const [value, setValue] = useState(0)

  const increaseByOne = () => {
    setValue(value + 1)
  }

  const deacreaseByOne = () => {
    setValue(value - 1)
  }

  const setToZero = () => {
    setValue(0)
  }

  return {
    value, increaseByOne, deacreaseByOne, setToZero
  }

}

const App = () => {
  const counter = useCounter()

  return (
    <>
      <Display counter={counter.value} />
      <br /><br />
      <Button onClick={counter.increaseByOne} text="plus" />
      <br /><br />
      <Button onClick={counter.deacreaseByOne} text="minus" />
      <br /><br />
      <Button onClick={counter.setToZero} text="reset" />

    </>
  )
}

export default App
