import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { CREATE_PERSON, ALL_PERSONS } from './queries.js'
import { updateCache } from './App.jsx'

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      console.log('error in createPerson', error.errors)
      const messages = error.errors.map(e => e.message).join('\n')
      setError(messages)
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_PERSONS }, response.data.addPerson)
    }
  })

  const submit = (event) => {
    event.preventDefault()

    try {
      createPerson({ variables: { name, phone, street, city } })
    } catch (e) {
      console.warn(`Error while creating person ${e.message}`)
    }

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          phone <input value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <div>
          street <input value={street} onChange={({ target }) => setStreet(target.value)} />
        </div>
        <div>
          city <input value={city} onChange={({ target }) => setCity(target.value)} />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default PersonForm
