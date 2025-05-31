import blogs from './blogs.json' with { type: 'json'}
import _ from 'lodash'

// _.find => returns the first truthy value that matches the conditions
// console.log(_.find([1,2,3,4], i => i % 2 === 0))

// console.log(
//     _.find(blogs,blog => blog.likes > 2)
// )

// _.partition => returns two arrays, split by the condition
// console.log(
//     _.partition(blogs, blog => blog.likes > 5)
// )

// _.groupBy => new object with keys generated from the condition

// console.log(
//     _.groupBy(blogs, blog => blog.likes)

// )

// _.filter => returns array of all elements where the predicate function returns truthy

// console.log(
//     _.filter(blogs,
//         blog => blog.likes > 5
//     )
// )

// _.reject => opposite of filter, returns falsy value

// console.log(
//     _.reject(
//         blogs,
//         blog => blog.likes > 5
//     )
// )