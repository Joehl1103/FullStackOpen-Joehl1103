import { useState } from "react"

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value',counter)


  const increaseByOne = () => {
    console.log('increasing, value before',counter)
    setCounter(counter + 1)
  }
  
  const deacreaseByOne = () => {
    console.log('decreasing, value before',counter)
    setCounter(counter - 1)
  }
  
  const setToZero = () => {
    console.log('resetting to zero, value before',counter)
    setCounter(0)
  }
  

  return (
    <>
      <Display counter={counter}/>
      <br/><br/>
      <Button onClick={increaseByOne} text="plus"/>
      <br/><br/>
      <Button onClick={deacreaseByOne} text="minus"/>
      <br/><br/>
      <Button onClick={setToZero} text="reset"/>
    </>
  )
}

export default App