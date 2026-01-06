import { useQuery, useApolloClient, useMutation, useSubscription } from '@apollo/client/react'
import Persons from './Persons.jsx'
import PersonForm from './PersonForm.jsx'
import PhoneForm from './PhoneForm.jsx'
import { ALL_PERSONS, PERSON_ADDED } from './queries.js'
import { useState, useEffect } from 'react'
import LoginForm from './LoginForm.jsx'


/**
 * 
 * @param {*} cache this is the ApolloCache
 * @param {*} query gql query
 * @param {*} addedPerson result of the subscription
 *
 * This function
 */
export const updateCache = (cache, query, addedPerson) => {
  /**
   * 
   * @param {*} -- an array of items to be evaluated for duplicates
   * @returns a   an array deprived of duplicates
   */
  const uniqueByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      /** evaluation conditions for the filter 
       * if the set contains the item name, return do not include in the return, otherwise, add it to the set
       * */
      return seen.has(k) ? false : seen.add(k)
    })
  }
  /** updates the cache, runs the query and take the results 
   * */
  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqueByName(allPersons.concat(addedPerson))
    }
  })
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

function App() {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  /**
   * When a person is added and the subscription call is made in the backend,
   * update the cache by concatenating the results of the subscription with the remainder of the query return
   * */
  useSubscription(PERSON_ADDED, {
    onData: ({ data, client }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)
      console.log('client', client)
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
    }
  })

  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem("phonenumbers-user-token")
    setToken(tokenInLocalStorage)
  })
  const result = useQuery(ALL_PERSONS)
  if (result.loading) {
    return <div>loading...</div>
  }
  if (!result.data) {
    return <div>Error loading person information</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  function notify(message) {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }



  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  )
}

export default App
