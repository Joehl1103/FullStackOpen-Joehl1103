import {useState} from 'react'

const History = (props) => {
  if(props.allClicks.length === 0){
    return (
      <>
        the app is used by pressing the buttons
      </>
    )
  }
  return (
    <>
      button press history: {props.allClicks.join(', ')}
    </>
  )
}

const Button = (props) => { 
  console.log('props value is ',props)
  const {onClick,text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks,setAll] = useState([])
  const [counter, setCounter] = useState(1)
  const [total, setTotal] = useState(0)
     
  const handleLeftClick = () => {
    setCounter(counter+1)
    setAll(allClicks.concat(`${counter}: L`))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft+right)
  }
    
  const handleRightClick = () => {
    setCounter(counter+1)
    setAll(allClicks.concat(`${counter}: R`))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left+updatedRight)
  }
  
  return (
      <>
        {left}{' '}
        <Button onClick={handleLeftClick} text="left"/>
        <Button onClick={handleRightClick} text="right"/>
        {' '}{right}<br/><br/>
        <History allClicks={allClicks}/>
        <p>Total clicks: <b>{total}</b></p>
      </>
    )
}

export default App