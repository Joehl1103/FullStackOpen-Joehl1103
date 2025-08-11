import { useState, useEffect } from 'react'
import serviceService from './services/services'

function App() {
  const [stuff, setStuff] = useState([])
  useEffect(() => {
    // get and set stuff from backend
    const things = serviceService.getStuff()
      .then(stu => {
        setStuff(stu)
        console.log('stu',stu)
      })
      .catch(e => {
        console.log(`Error: ${e.message}`)
      })
  },[])

  if(stuff.length === 0){
    return <div>nothing to see here...</div>
  }
  return (
    <div>
      {stuff.map( stu => {
        return (
          <div key={stu.id}>
            <ul>
              <li>{stu.id}</li>
              <li>{stu.title}</li>
              <li>{stu.author}</li>
            </ul>
          </div>
        )
      })}
    </div> 
  )
}

export default App
