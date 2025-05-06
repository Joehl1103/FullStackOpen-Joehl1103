/* a functor when given a value and a function, it will unwrap the parts, feed them
to the function and return them in a structured form

Examples:
Array.filter
Array.map

WRONG!!! See Example 2
*/

function stringFunctor(value,fn){
    let chars = value.split('')
    return chars.map(function(char){
        return String.fromCharCode(fn(char.charCodeAt(0)))
    }).join('')
}

function plus1(value){
    return value +1
}
function minus1(value){
    return value-1
}

console.log(plus1(3))
const arrayMap = [2,3].map(plus1)
console.log(arrayMap)
console.log(stringFunctor('ABV',plus1))
console.log(stringFunctor('XYZ',minus1))