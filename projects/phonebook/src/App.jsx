import { useState } from 'react'
import PersonDisplay from './components/Person'
import Search from './components/Search'
import Add from './components/Add'

function App() {
 const [persons,setPersons] = useState([
        {
          name: 'Joseph Loomis',
          number: "(787) 987-1234"
        },{
          name: 'Jalunga Dongelston',
          number: "(878) 123-3947"
        },
        {
          name: 'Paloma Smith',
          number:'(898) 432-2341'
        },
        {
          name:'Harry Bravo',
          number: '(123) 234-2342'
        }
 ])
 const [searchTerm,setSearchTerm] = useState('')

// TODO add back event handlers to main component
// TODO add back any state variables that are missing and pass them to the child components
 

  
  // Why is the PersonDisplay not rendering
  return (
    <>
      <h2>Phonebook</h2>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}/>
      <Add
        persons={persons}
        setPersons={setPersons}
        />
        <h3>List</h3>
      <PersonDisplay 
        persons={persons}
        searchTerm={searchTerm}/>
    </>
  )

}

export default App
