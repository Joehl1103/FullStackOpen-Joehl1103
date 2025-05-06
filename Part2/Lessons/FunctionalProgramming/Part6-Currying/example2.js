import _ from 'lodash'

let dragons = [
    {name: 'fluffykins', element:'lightning'},
    {name: 'noomi', element:'lightning'},
    {name: 'karo', element:'fire'},
    {name: 'doomer', element:'timewarp'},
]

// this function is curryable, which means that it can be expected to pass arguments to any function that it returns
let hasElement = _.curry((element,obj) => obj.element === element)

// since hasElement is curryable, it will return its function and pass it as an argument in filter
let lightningDragon = dragons.filter(hasElement('lightning'))

console.log(lightningDragon)