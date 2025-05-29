require('dotenv').config()
const db = require('mongoose')
const assert = require('assert')
const url = process.env.MONGODB_ANOTHERDB_URI
db.connect(url)
console.log("Connected")

const userSchema = db.Schema({
    phone: {
        type: String,
        validate: {
            validator: function(v){
                return /\d{3}-\d{3}-\d{4}/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true,'User phone number required']
    }
})

const User = db.model('user',userSchema)
const user = new User()
let error

user.phone = '201-333-1231'
error = user.validateSync()
assert.equal(error,null)

db.connection.close()
console.log("Disconnected")