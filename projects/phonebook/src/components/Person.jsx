const PersonDisplay = (props) => {
    // console.log("Person Display Props: ",props)
    const st = props.searchTerm
    const personsArray = props.persons
    const personsArrayLowerCase = personsArray.map(
        person => { return person = {
            name: person.name.toLowerCase(),
            number: person.number
        }})
    const personsArrayFiltered = personsArrayLowerCase.filter(person => {
        return person.name.includes(st)})
     console.log("Filtered Persons Array object: ",personsArrayFiltered)

    console.log("Search term prop in PersonDisplay: ", props.searchTerm)
    if (st != ""){
        console.log("search term is not blank. Searching for: ",props.searchTerm)
        return(
            <div>
            {personsArrayFiltered.map(person => {
                return <li key={person.name}>Name: {person.name}, Phone Number: {person.number}</li>
            })}
        </div>
    ) 
    } else {
        console.log("No search term. Displaying normal set of persons")
    return(
        <div>
            {personsArray.map(person => {
                return <li key={person.name}>Name: {person.name}, Phone Number: {person.number}</li>
            })}
        </div>
    )
}
}

export default PersonDisplay