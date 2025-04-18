

import {useState} from 'react'


const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
const Display = props => <div>{props.value}</div>
// defines a component called App
const App = () => {
  const [value,setValue] = useState(10)

  const setToValue = (newValue) => { 
      console.log('value new',newValue)
      setValue(newValue) 
  }

  const tempFun = () => {
    console.log("temp func ok")
  }
  
 
  return (
      <div>
      <Display value={value}/>  
      <br/>
      <Button onClick={() => setToValue(1000)} text="thousand"/>
      <Button onClick={() => setToValue(0)} text="reset"/>
      <Button onClick={() => setToValue(value+1)} text="increment"/>
             
    </div>
    )  
} // never remove this line of code export default App

export default App