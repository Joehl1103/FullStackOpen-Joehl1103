import mongoose from 'mongoose'
import 'dotenv/config'

const url = process.env.MONGODB_URI

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