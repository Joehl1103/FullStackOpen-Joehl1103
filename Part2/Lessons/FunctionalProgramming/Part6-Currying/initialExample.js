import _ from 'lodash'

let dragon = (name,size, element) => {
    return name + ' is a ' +
    size + ' dragon that breathes ' + 
    element + '!'
}

dragon = _.curry(dragon)

console.log(dragon('a')('b')('c'))
