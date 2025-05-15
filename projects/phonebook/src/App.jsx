import { useState,useEffect } from 'react'
import PersonDisplay from './components/PersonDisplay'
import Search from './components/Search'
import Add from './components/Add'
import personService from './service/personService'

function App() {
 const [persons,setPersons] = useState([])
 const [newName,setNewName] = useState('')
 const [newPhone,setNewPhone] = useState('')
 const [searchTerm,setSearchTerm] = useState('')

 // Display current items in database
 const hook = () => {
  // console.log('effect')
  personService
    .getAll()
    .then(displayedPersons => setPersons(displayedPersons))
  
 }

 useEffect(hook,[])
 
 // Add a person to the list
 function addPersonToList(event){
  // prevent default form behavior: re-rendering the page
  event.preventDefault()

  const newNameExists = checkForExistingName(newName)
    // console.log("Does newName exist? ",newNameExists)
    if (newNameExists){
      if(window.confirm(`${newName} already exists in the phonebook. Replace the old number with the new one?`)){
        const personToBeUpdatedArray = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
        const personToBeUpdateId = personToBeUpdatedArray[0].id
        const updatedPerson = {name: newName,number: newPhone}
        personService
          .updatePerson(personToBeUpdateId,updatedPerson)
          .then(hook)

      }
      return
    }
    // create the new object using newName, set by the onChange event handler
    const newObject = {name: newName,number: newPhone}

    personService
      .create(newObject)
      .then(hook)
    }

function checkForExistingName(newName){
  const existingName = persons.filter(person =>  person.name.toLowerCase() === newName.toLowerCase())
  return existingName.length !== 0 ? true : false
}

function deletePerson(id,personToBeDeleted){
  if(window.confirm(`Are you sure you want to delete ${personToBeDeleted.name}?`)){
    personService
    .deletePerson(id,personToBeDeleted)
    .then(hook)
  } else {
    return
  }
  
}


  return (
    <>
      <h2>Phonebook</h2>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}/>
      <Add
        persons={persons}
        setPersons={setPersons}
        addPersonToList={addPersonToList}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        />
        <h3>List</h3>
      <PersonDisplay 
        persons={persons}
        searchTerm={searchTerm}
        deletePerson={deletePerson}/>
    </>
  )

}

export default App
