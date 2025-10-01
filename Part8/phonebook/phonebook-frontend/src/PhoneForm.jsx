import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_NUMBER } from './queries'


const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [changeNumber, result] = useMutation(EDIT_NUMBER, {
    // onError: (error) => {
    //   console.log('an error occurred')
    //   const messages = error.errors.map(e => e.message).join('\n')
    //   setError(messages)
    // }
  })
  // console.log('result from mutation', result)

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      console.log('setting error')
      setError('person not found')
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()

    changeNumber({ variables: { name, phone } })

    setName('')
    setPhone('')
  }
  return (
    <>
      <h2>change number</h2>
      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          phone <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)} />
        </div>
        <button type='submit'>change phone</button>
      </form>
    </>
  )
}

export default PhoneForm
