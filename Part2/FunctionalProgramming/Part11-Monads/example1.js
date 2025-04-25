// const fetch = require('node-fetch')
const Bacon = require('baconjs')

function getInPortuguese(word){
    console.log("Initializing functions")
    const apiKey = "AIzaSyCYeC-819nJFtzXguCplQ9_A2avbLuYRzA"
    const url = 'https://www.googleapis.com' + 
        '/language/translate/v2' +
        '?key=' + apiKey +
        '&source=en' +
        '&target=pt' +
        '&q=' + encodeURIComponent(word)
    console.log("URL: ",url)
    const promise = fetch(url)
        .then(response => {
            response.json
            console.log("Json response: ",response.json())
            })
        .then(parsedResponse => {
            pro = parsedResponse.data.translations[0].translatedText
            if (pro.length === 0){
                console.log("empty")
                return
            }
            console.log(
            parsedResponse  
                .data
                .translations[0]
                .translatedText)
            })
        // .then(data => {
        //     if(data === null || data === undefined){
        //         console.log("promise is empty")
        //     } else if (Array.isArray(data) && data.length === 0){
        //         console.log('data is an empty array')
        //     }
        //     }
        // )
    // // console.log("Promise type",typeof promise)
    // console.log("Promise: ",JSON.stringify(promise)) 
    // if (promise.length === 0){
    //     console.log("promise is empty")
    //     return
    // }
    const stream = Bacon.fromPromise(promise)
    console.log("Returning stream")
    return stream

}

// try {
console.log("Getting in Portuguese")
getInPortuguese('meal').onValue(word => console.log("Value: ",word))
console.log("Got in Portuguese")
// } catch (e){
//     console.error(e.message)
// }