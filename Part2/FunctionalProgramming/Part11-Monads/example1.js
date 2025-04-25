const fetch = require('node-fetch')
const Bacon = require('baconjs')

function getInPortuguese(word){
    const apiKey = "AIzaSyCYeC-819nJFtzXguCplQ9_A2avbLuYRzA"
    const url = 'https://www.googleapis.com' + 
        '/language/translate/v2' +
        '?key=' + apiKey +
        '&source=en' +
        '&target=pt' +
        '&q=' + encodeURIComponent(word)
    const promis = fetch(url)
        .then(response => response.json)
        .then(parsedResponse => 
            parsedResponse  
                .data
                .translations(0)
                .translatedText
        )
    const stream = Bacon.fromPromise(promise)
    return stream

}

getInPortuguese('meal')
    .onValue(word => console.log(word))