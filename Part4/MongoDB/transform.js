import mongoose from 'mongoose'

const password = process.argv[2]
const url = `mongodb+srv://jkhloomis:${password}@cluster0.z1gftkf.mongodb.net/anotherDatabase?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
console.log("connection established")

const schema = mongoose.Schema({
    myDate: {
        type:Date,
        transform: v => v.getFullYear()
    }
})

const Model = mongoose.model('Test',schema)

const doc = new Model({myDate: new Date('2019/06/01')})
console.log(doc.myDate instanceof Date)

const res = doc.toObject({transform: true})
console.log(res)

mongoose.connection.close()
console.log("Connection closed")