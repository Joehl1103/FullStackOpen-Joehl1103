import {useState} from 'react'

const Add = (props) => {
   
      const [newName,setNewName] = useState('')
      const [newPhone,setNewPhone] = useState('')

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
        const personsCopy = [...props.persons, newObject]
        // set the copy to the original
        props.setPersons(personsCopy)
        // reset newName
        setNewName('')
      }

      function checkForExistingName(){
        console.log("checkForExistingName newName: ",newName)
        const existingName = props.persons.filter(person => person.name.toLowerCase().includes(newName.toLowerCase))
        console.log("existingName: ",typeof existingName, " ",JSON.stringify(existingName))
        return existingName.length !== 0 ? true : false
      }

return (
    <div>
        <h3>Add</h3>
        {/* add a custom submission function reference directly to the form so as not to trigger
        the page to rerender*/}

        <form onSubmit={addPersonToList}>
        <div>
            Name: <input
                    type="text"
                    value={newName}
                    onChange={e => {
                    setNewName(e.target.value)

                    }}/>
        </div>
        <div>
            <label>Phone number: </label>
            <input
                type="tel"
                pattern="\(\d{3}\)\s\d{3}-\d{4}"
                value={newPhone}
            onChange={e => setNewPhone(e.target.value)}
            placeholder="(000) 000-0000"
            />

        </div>
        <div>
          {/*ensure that the type of the button is submit so that the form can read it */}
          <button type='submit'>add</button>
        </div>
        </form>
    </div>
    )
}
export default Add