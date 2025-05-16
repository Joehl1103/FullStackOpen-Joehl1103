import { useState } from 'react'
import Matches from './Components/Matches'
import searchService from './services/searchService'

function App() {
  const [matches,setMatches] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
 // const searchKeys = useState(['name','capital','area','languages','flag'])

  const search = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
    const searchTermLowerCase = searchTerm.toLowerCase()
    console.log("Search term lower case:",searchTermLowerCase)
    // TODO add getAll to get object of all items before searching through them
    
    
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
              } else {
                console.log("NO COMMON NAME")
              }
            }

          }

        }
        return names
        //  console.log(`Names: ${names}`)
      })
       
      .then(names => {
        if (names.length === 1){
          console.log("Only 1 name",names)
          searchAndReturnOneCountryObject(names)
        }
        setMatches(names)
        // console.log(`Names ${names}`)
      })
      .catch(error => {
        console.log(error.message)
      })

   
 
    // search through the entire object of objects to find any names that match and return their official names
    // const names = []



    // for (const [key,value] of entries){
    //  
    //   }
    // }

    // setMatches(names)

    // note that I think the solution should probably be different depending on whether or not you are searching for a specific subset of items vs just the names
    // this should probably be a different kind of search function

    // TODO first search through the entire object to find a matching name in lower case and add that entire object to a temporary array

    // TODO second, search through the temporary array to find the specific properties and add those to the final array


  }

  function searchAndReturnOneCountryObject(nameArray){
    searchService
      .getCountryData(nameArray[0])
      .then(response => {
        console.log(response)
        const oneCountryObject =
          {
              name: response.name.common,
              capital: response.capital[0],
              area: response.area,
              // note that this is an object
              // TODO adjust the Matches method
              languages: response.languages,
              flagURL: response.flags.png // are flags of different kinds or all they all emoji characters?
          }
        setMatches(oneCountryObject)
        console.log("Matches set to oneCountryObject", oneCountryObject)
  })
}

  
  return (
    <>
      <label>find countries: </label>
  
      <input 
          type="text" 
          value={searchTerm} 
          onChange={search}/>

      <Matches matches={matches}/>
  
    </>
  )
}

export default App
