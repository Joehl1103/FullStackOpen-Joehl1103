const Matches = (matches) => {

    /* note that Matches is either an array of names or an object depending on
    whether it is an array of just names or an object containing all of the country's info
    */
    console.log("Matches:",matches,"Type of Matches: ",typeof matches)
    let nMatchCount = null;
    if (Array.isArray(matches)){
        const matchesArray = matches.matches
        function countNumberOfMatches(matchesArray){
            let count = 0;
            for (let i = 0; i < matchesArray.length;i++){
            count++
            }
            return count
        }

        nMatchCount = countNumberOfMatches(matchesArray)
         } else if (nMatchCount > 10){
        return (
            <div>
                <p>Too many matches, please be more specific</p>
            </div>
        )
        // >1 && < 11
    } else {
        const countryArray = matches.matches
    
        return (
            <div>
            {countryArray.map(name => {
                return <p key={name}>{name}</p>
            })}
            </div>
        )
    }
    }
        
        // 1 match
    if (nMatchCount === 1){
        const countryObject = matches[0]
        // TODO add a search method that is specific to searching for a single country
        // TODO object and returns all the specific properties
        const languagesArray = countryObject.languages
        // console.log(languagesArray)
        return (
            <div>
                <h1>{countryObject.name}</h1>
                <p>
                    Capital: {countryObject.capital}<br/>
                    Area: {countryObject.area}
                </p>
                <h2>Languages</h2>
                <ul>{languagesArray.map(language => {
                        
                            return <li key={language}>{language}</li>
                        }
                        )
                    }
                </ul>
                <p>Flag:</p><br/>
                <img src={countryObject.flagURL}/>

            </div>
        )
        // > 10
   
}

export default Matches