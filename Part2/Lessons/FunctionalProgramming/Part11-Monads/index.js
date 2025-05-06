/*
Functors implement maps
Monads implement flatmap; more powerful functor

A callback function is a function called by another function.
*/

const Bacon = require('baconjs')
const stream = new Bacon.Bus()

stream
    .map(word => word.toUpperCase())
    .onValue(word => console.log(word))

stream.push('cat')
stream.push('meal')
stream.push('trumpet')