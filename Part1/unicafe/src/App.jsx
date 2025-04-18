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

const PositiveFeedbackDisplay= ({name = "Positive",feedback = "0%"})=>{
  return (
    <>
      <p>{name}: {feedback}</p>
    </>
  )
}

function useAverager(all){
  const [averageInts,setAverageInts] = useState(0)

  const averageCalc= (averageInts,all)=>{
    return averageInts/all
  }

  const average = averageCalc(averageInts,all)
  const averageRounded = parseFloat(average.toFixed(2))
  return {
    averageInts,setAverageInts,averageCalc,averageRounded
  }
}

function usePositiveCalc(good,all){

  const positiveFeedbackCalc = (good,all) => {
    return `${(good/all)*100}%`
  }

  const positiveFeedbackPercent = positiveFeedbackCalc(good,all)

  return {positiveFeedbackCalc,positiveFeedbackPercent}
}

const App = () => {
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good+neutral+bad
  
  const {averageInts,setAverageInts,averageRounded,averageCalc} = useAverager(all)
  
  const {positiveFeedbackCalc,positiveFeedbackPercent} = usePositiveCalc(good,all)

  const onClick = (value) =>{
    if(value === "good"){
      setGood(good+1)
      setAverageInts(averageInts+1)
    } else if(value === "neutral"){
      setNeutral(neutral+1)
    } else if(value === "bad") {
      setAverageInts(averageInts-1)
      setBad(bad+1)
    } else {
      console.log("resetting")
      setGood(0)
      setNeutral(0)
      setBad(0)
    }
    averageCalc(averageInts,all)
    positiveFeedbackCalc(good/all)
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
      <StatDisplay name="All" type={all}/>
      <StatDisplay name="Average" type={averageRounded}/>
      <PositiveFeedbackDisplay feedback={positiveFeedbackPercent}/>
      <hr/>
      <Button onClick={()=>onClick("reset")} text="reset"/>

    </>
  )
}

export default App
