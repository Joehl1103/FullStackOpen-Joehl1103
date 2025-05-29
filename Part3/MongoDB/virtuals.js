import mongoose from 'mongoose'

const password = process.argv[2]
const url = `mongodb+srv://jkhloomis:${password}@cluster0.z1gftkf.mongodb.net/anotherDatabase?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
console.log("connection established")

const opts = {toJson: {virtuals: true}}

const userSchema = mongoose.Schema({
    _id: Number,
    email: String
})

userSchema.virtual('domain').get(function(){
    return this.email.slice(this.email.indexOf('@'+1))
})

const User = mongoose.model('User',userSchema)

const doc = new User({_id: 1,email:'test@gmail.com'})

doc.toJSON().domain
// ensure that the JSON object is an a POJO
console.log(doc.toObject({virtuals: true}))

mongoose.connection.close()
console.log("Connection closed")