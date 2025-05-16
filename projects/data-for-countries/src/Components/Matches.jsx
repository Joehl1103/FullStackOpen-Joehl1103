const Matches = (matches) => {

    console.log("Matches in Matches Component:",matches,"Type of Matches: ",typeof matches)

    /* note that Matches is either an array of names or an object depending on
    whether it is an array of just names or an object containing all of the country's info
    */
    if (Array.isArray(matches.matches)){
        let nMatchCount = null;

        const matchesArray = matches.matches

        function countNumberOfMatches(matchesArray){
            let count = 0;
            for (let i = 0; i < matchesArray.length;i++){
            count++
            }
            return count
        }

        nMatchCount = countNumberOfMatches(matchesArray)
        
        if (nMatchCount > 15){
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
    } else {
        const countryObject = matches.matches
        const countryObjectLanguageObject = countryObject.languages
        if (countryObjectLanguageObject != undefined){
            const languageObjectEntries = Object.entries(countryObjectLanguageObject)
             const languagesArray = []
      
            for (const [key,value] of languageObjectEntries){
                languagesArray.push(value)
            }

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

        } else {
            console.log("Country Object Language Object undefined")

            return (
                null
            )
        }
       
    }
}

export default Matches