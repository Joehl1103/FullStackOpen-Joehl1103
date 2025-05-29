const _ = require('lodash')

const numbers = [1,2,3,4]

let listOfNumbers = '';

_.each(numbers,function(x) {listOfNumbers += x + ' '})

console.log(listOfNumbers)