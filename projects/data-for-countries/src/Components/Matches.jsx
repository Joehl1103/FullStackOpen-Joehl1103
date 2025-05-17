const Matches = (props) => {
    const {matches,type,searchAndReturnOneCountryObject} = props
    console.log("Matches in Matches Component:",matches,"Type of Matches: ",typeof matches)
    console.log("type",type)

    function convertNameToArrayAndCallOneCountryFunction(name){
        const nameArray = [name]
        searchAndReturnOneCountryObject(nameArray)
    }



    if (type === 'multiple'){
        let nMatchCount = null;

        const matchesArray = matches
        console.log("matchesArray", matchesArray)

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
            const countryArray = matches
        
            return (
                <div>
                {countryArray.map(name => {
                    return <p key={name}>{name} <button type="button" onClick={() => convertNameToArrayAndCallOneCountryFunction(name)}>See all info</button></p>
                })}
                </div>
            )
        }
    } else if(type === 'single'){
        const countryObject = matches
        console.log("Country Object:", countryObject)
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

        } else if(type === 'none'){
            console.log("Country Object Language Object undefined")

            return (
                null
            )
        }
       
    }
}

export default Matches