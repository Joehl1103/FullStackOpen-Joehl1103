import blogs from './blogs.json' with { type: "json"}
import _ from 'lodash'

// _.countBy

console.log(_.countBy(blogs, blog => blog.likes === 12))