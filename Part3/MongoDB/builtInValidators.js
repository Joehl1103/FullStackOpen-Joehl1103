require('dotenv').config()
const mongoose = require('mongoose')
const assert = require('assert')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_ANOTHERDB_URI

mongoose.connect(url)
console.log(`connected at url ${url}`) 

const breakfastSchema = mongoose.Schema({
    eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12
    },
    bacon: {
        type: Number,
        required: [true,'Why no bacon?']
    },
    drink: {
        type: String,
        enum: ['Coffee','Tea'],
        required: function(){
            return this.bacon > 3
        }
    }
})

const Breakfast = mongoose.model('Breakfast',breakfastSchema)

const badBreakfast = new Breakfast({
    eggs:2,
    bacon:0,
    drink:'Milk'
})


// let error = badBreakfast.validateSync()

// assert.equal(error.errors['eggs'].message,'Too few eggs')
// assert.ok(!error.errors['bacon'])
// assert.equal(error.errors['drink'].message,'`Milk` is not a valid enum value for path `drink`.')

badBreakfast.bacon = 5
badBreakfast.drink = null

// const error = badBreakfast.validateSync()
// console.log(error.errors)
// assert.equal(error.errors['drink'].message,'Path `drink` is required.')

badBreakfast.bacon = null
const error = badBreakfast.validateSync()
assert.equal(error.errors['bacon'].message,'Why no bacon?')


mongoose.connection.close()
console.log('connection closed')

