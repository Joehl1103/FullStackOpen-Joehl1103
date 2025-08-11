import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    console.log('event.target.value', event.target.value)
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    value, name, onChange, onReset
  }
}

