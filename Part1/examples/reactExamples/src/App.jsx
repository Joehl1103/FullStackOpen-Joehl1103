import {useState} from 'react'


const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks,setAll] = useState([])
  const [counter, setCounter] = useState(1)
  const [total, setTotal] = useState(0)
     
  const handleLeftClick = () => {
    setCounter(counter+1)
    setAll(allClicks.concat(`${counter}: L`))
    console.log('left before',left)
    setLeft(left+1)
    console.log('left after',left) 
    setTotal(left+right)
  }
    
  const handleRightClick = () => {
    setCounter(counter+1)
    setAll(allClicks.concat(`${counter}: R`))
    console.log('right before',right)
    setRight(right+1)
    console.log('right after',right)
    setTotal(left+right)
  }
  
  return (
    <>
     {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>This is an array of all the clicks: [ {allClicks.join(', ')} ]</p>
      <p>Total clicks: <b>{total}</b></p>
    </>
    )
}

export default App