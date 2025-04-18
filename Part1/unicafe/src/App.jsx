import { useState } from 'react'


const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatDisplay = (props) => {
  return (
    <div>  
      <p>{props.name}: {props.type}</p>
    </div>

  )
}

const App = () => {
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onClick = (value) =>{
    if(value === "good"){
      setGood(good+1)
      console.log("good + 1")
    } else if(value === "neutral"){
      setNeutral(neutral+1)
      console.log("neutral + 1")
    } else if(value === "bad") {
      console.log("bad + 1")
      setBad(bad+1)
    } else {
      console.log("resetting")
      setGood(0)
      setNeutral(0)
      setBad(0)
    }
  }

return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={() => onClick("good")} text="good"/>
      <Button onClick={() => onClick("neutral")} text="neutral"/>
      <Button onClick={() => onClick("bad")} text="bad"/>
      <h1>Statistics</h1>
      <StatDisplay name="Good" type={good}/>
      <StatDisplay name="Neutral" type={neutral}/>
      <StatDisplay name="Bad" type={bad}/>
      <hr/>
      <Button onClick={()=>onClick("reset")} text="reset"/>

    </>
  )
}

export default App
