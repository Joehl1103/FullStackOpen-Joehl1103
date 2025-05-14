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

  const newNameExists = checkForExistingName()
    // console.log("Does newName exist? ",newNameExists)
    if (newNameExists){
      alert(`${newName} already exists in the phonebook`)
      return
    }


    // create the new object using newName, set by the onChange event handler
    const newObject = {name: newName,number: newPhone}

    personService
      .create(newObject)
      .then(returnedPerson => {
        const personsCopy = [...persons, returnedPerson]
        setPersons(personsCopy)
        setNewName('')
      })
    }

function checkForExistingName(){
  // console.log("checkForExistingName newName: ",newName)
  const existingName = persons.filter(person => person.name.toLowerCase().includes(newName.toLowerCase))
  // console.log("existingName: ",typeof existingName, " ",JSON.stringify(existingName))
  return existingName.length !== 0 ? true : false
}

function deletePerson(id,personToBeDeleted){
  if(window.confirm(`Are you sure you want to delete ${personToBeDeleted.name}?`)){
    personService
    .deletePerson(id,personToBeDeleted)
    .then(responseData => {
      // re render the component's person list without the deleted object
      // spread the persons object into a new persons array, without the deleted person object
      const tempPersons = persons.filter(person => person.id !== responseData.id)
      setPersons(tempPersons)
    })
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
