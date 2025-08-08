import { useContext } from 'react'
import CounterContext from './CounterContext.jsx'
import Button from '../components/Button.jsx'
import Display from '../components/Display.jsx'

function App() {

  return (
    <>
      <Display />
      <div>
        <Button type={'INC'} label={'👍'} />
        <Button type={'DEC'} label={'👎'} />
        <Button type={'ZERO'} label={'👌'} />
      </div>
    </>
  )
}

export default App
