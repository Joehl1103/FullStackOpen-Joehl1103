import { useState } from 'react'
import Matches from './Components/Matches'
import searchService from './services/searchService'

function App() {
  const [matches,setMatches] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [type,setType] = useState('none')


  const search = (event) => {
    console.log("search term: ",event.target.value)
    setSearchTerm(event.target.value)
    const searchTermLowerCase = searchTerm.toLowerCase()
    console.log("Search term lower case:",searchTermLowerCase)
    
    searchService
      .getAll()
      .then(responseData => {
        let allCountries = {}
        allCountries = responseData
        const entries = Object.entries(allCountries)
        const names = []
        for (const [key,value] of entries){
          const countryEntries = Object.entries(value)
          for (const [key,value] of countryEntries){
            if (key === "name"){
              if (value.common && value.common.toLowerCase().includes(searchTermLowerCase)){
                names.push(value.common)
              } 
            }
          }
        }
        console.log("Returning array of names,",names)
        return names
      })
       
      .then(names => {
     
        if (names.length === 1){
          searchAndReturnOneCountryObject(names)
        }
        setMatches(names)
        setType('multiple')
      })
      .catch(error => {
        console.log(error.message)
      })

  }

  function searchAndReturnOneCountryObject(nameArray){
    console.log("searchAndReturnOneCountryObject function called with name Array",nameArray)
    searchService
      .getCountryData(nameArray[0])
      .then(response => {
        console.log(response)
        const oneCountryObject =
          {
              name: response.name.common,
              capital: response.capital[0],
              area: response.area,
              languages: response.languages,
              flagURL: response.flags.png,
              capitalInfo: response.capitalInfo
               // are flags of different kinds or all they all emoji characters?
          }
        setMatches(oneCountryObject)
        setType('single')
        console.log("Matches set to oneCountryObject", oneCountryObject)
  })
}
// RENDER

if (matches.length === 0){
  return (
    <>
        <label>find countries: </label>
    
        <input 
            type="text" 
            value={searchTerm} 
            onChange={search}/>
      </> 
  )

} else {
 
    return (
      <>
        <label>find countries: </label>
    
        <input 
            type="text" 
            value={searchTerm} 
            onChange={search}/>

        <Matches matches={matches} type={type} searchAndReturnOneCountryObject={searchAndReturnOneCountryObject}/>
    
      </>
    )

  }
}


export default App
