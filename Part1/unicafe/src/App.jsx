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
      <tr>
           <td style={{border: "1px solid black", padding: "8px"}}>{props.name}  </td>
           <td style={{border: "1px solid black", padding: "8px"}}>{props.type} {props.name === "Positive" && "%"}</td>
      </tr>
  )
}

const StatsDisplayAll = (props) => {
  if(props.good === 0 
    && props.neutral === 0 
    && props.bad ===0 
    && props.averageRounded === 0 
    && props.positiveFeedbackPercent === 0){
   return( 
   <div>
      <p>No feedback to display</p>
   </div>
   )
  } else {

  return (
    <>
    <table style={{borderCollapse: "collapse", width: "25%"}}>
      <tbody>
        <StatDisplay name="Good" type={props.good}/>
        <StatDisplay name="Neutral" type={props.neutral}/>
        <StatDisplay name="Bad" type={props.bad}/>
        <StatDisplay name="All" type={props.all}/>
        <StatDisplay name="Average" type={props.averageRounded}/>
        <StatDisplay name="Positive" type={props.positiveFeedbackPercent}/>
      </tbody>
    </table> 
    </>
  )
}
}

function useAverager(all){
  const [averageInts,setAverageInts] = useState(0)

  const averageCalc= (averageInts,all)=>{
    let average = averageInts/all
    let averageRounded = parseFloat(average.toFixed(2))

    return averageRounded
  }

  const averageRounded = isNaN(averageInts) || averageInts === 0 ? 0 :averageCalc(averageInts,all) 
  return {
    averageRounded,setAverageInts,averageInts
  }
}

function usePositiveCalc(good,all){

  const positiveFeedbackCalc = (good,all) => {
    let calc = 0
    if(good === 0 || all == 0){
      calc = 0
    } else {
      calc = good/all
    }
    let decimals = 2
    const factor = 10 ** decimals
    let calcToFixed = (Math.round(calc * factor)/factor).toFixed(2)
    let percent = (calcToFixed * 100).toFixed(2)
    return percent
  }

  const positiveFeedbackPercent =  good === 0 || isNaN(good) ? 0 : positiveFeedbackCalc(good,all)
  return {positiveFeedbackCalc,positiveFeedbackPercent}
}


const App = () => {
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good+neutral+bad
  
  const {averageInts,setAverageInts,averageRounded} = useAverager(all)
  
  const {positiveFeedbackPercent} = usePositiveCalc(good,all)

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
      <StatsDisplayAll
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        averageRounded={averageRounded}
        positiveFeedbackPercent={positiveFeedbackPercent}
        /> 
      <hr/>
      <Button onClick={()=>onClick("reset")} text="reset"/>

    </>
  )
}

export default App
