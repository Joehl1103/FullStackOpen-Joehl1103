import { useState } from 'react'

function App() {
  const [firstName,setFirstName] = useState('')
  const [age, setAge] = useState('')
  const ageAsNumber = Number(age)

  return (
    <>
      <label>
        First Name:
        <input
          value={firstName}
          onChange={e => setFirstName(e.target.value)}/>
      </label>
      <br/>
      <label>
      Age:
      <input
        value={age}
        onChange={e=>setAge(e.target.value)}
        type="number"
        />
        <button onClick={() => setAge(ageAsNumber + 10)}>
          Add 10 years
        </button>
      </label>
      {firstName !== '' && <p>Your name is {firstName}.</p>}
      {ageAsNumber > 0 && <p>Your age is {ageAsNumber}.</p>}
    </>
  )
}

export default App
