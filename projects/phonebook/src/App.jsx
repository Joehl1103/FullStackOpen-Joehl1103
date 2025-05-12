import { useState,useEffect } from 'react'
import PersonDisplay from './components/Person'
import Search from './components/Search'
import Add from './components/Add'
import axios from 'axios'
import {noteService} from './service/personService'

function App() {
 const [persons,setPersons] = useState([])
 const [newName,setNewName] = useState('')
 const [newPhone,setNewPhone] = useState('')
 const [searchTerm,setSearchTerm] = useState('')

 const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('Promise fulfilled')
      setPersons(response.data)
    })
 }

 useEffect(hook,[])
 
 function addPersonToList(event){
  // prevent default form behavior: re-rendering the page
  event.preventDefault()

  const newNameExists = checkForExistingName()
    console.log("Does newName exist? ",newNameExists)
    if (newNameExists){
      alert(`${newName} already exists in the phonebook`)
      return
    }
    // create the new object using newName, set by the onChange event handler
    const newObject = {name: newName,number: newPhone}
    // destrcture persons in a new array, and include the newObject
    const personsCopy = [...persons, newObject]
    // set the copy to the original
    setPersons(personsCopy)
    // reset newName
    setNewName('')
}

function checkForExistingName(){
  console.log("checkForExistingName newName: ",newName)
  const existingName = persons.filter(person => person.name.toLowerCase().includes(newName.toLowerCase))
  console.log("existingName: ",typeof existingName, " ",JSON.stringify(existingName))
  return existingName.length !== 0 ? true : false
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
        searchTerm={searchTerm}/>
    </>
  )

}

export default App
