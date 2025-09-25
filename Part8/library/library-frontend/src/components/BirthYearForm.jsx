import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import { EDIT_AUTHOR, GET_ALL_AUTHORS } from '../queries'
import React from 'react'
import Select from 'react-select'

const BirthYearForm = () => {
  const [year, setYear] = useState('')
  const [name, setName] = useState('')
  console.log('name', name)
  const authorResult = useQuery(GET_ALL_AUTHORS)
  const authors = authorResult.data.allAuthors
  const [editBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_ALL_AUTHORS }]
  })

  async function handleBirthYearChange(event) {
    event.preventDefault()
    console.log('year', year)
    console.log('typeof year', typeof year)
    typeof year === 'string' ? () => {
      const yearToString = Number(year)
      setYear(yearToString)
    } : null
    let result = undefined
    try {
      result = await editBirthYear({ variables: { name: name, setBornTo: year } })
    } catch (e) {
      console.warn(`Error: ${e.message}`)
    }
    console.log(`successfully edited ${name}'s birth year`, result.data)
  }

  const options = authors.map(a => ({ value: a.name, label: a.name }))
  return (
    <div>
      <form onSubmit={handleBirthYearChange}>
        <label>Author name:</label>
        {/*react-select*/}
        {/* <Select options={options} /> */}
        {/*react select tag*/}
        <select value={name} onChange={({ target }) => setName(target.value)}>
          <option></option>
          {authors.map(a =>
            <option key={a.name}>{a.name}</option>
          )}
        </select>
        <br />
        {/* <input */}
        {/*   value={name} */}
        {/*   onChange={({ target }) => setName(target.value)} /> */}
        {/* <br /> */}
        <label>new birth year:</label>
        <input
          value={year}
          onChange={({ target }) => setYear(Number(target.value))} />
        <br />
        <button type='submit'>Change</button>
      </form>
    </div >
  )
}

export default BirthYearForm
