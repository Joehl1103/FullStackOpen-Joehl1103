const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [4, 'Username must be at least 5 characters long'],
        validate: {
            validator: function (v){
                return /^(?=.*[A-Za-z])(?=.*[\d])?(?!.*[\s]).*$/.test(v)
            },
            message: 'username must not contain whitespaces',
        },
    },
    name: String,
    password: {
        type: String,
        minLength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(v){
                return /^(?=.*[A-Z])(?=.*[\d])(?=.*[!*@#$%&]).*$/.test(v)
            },
            message: 'Password must contain at least 1 number, 1 upper-case letter, and one special character: !@#$%&*'
        },
    },
    passwordHash: String,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ],
})

userSchema.set('toJson', {
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User