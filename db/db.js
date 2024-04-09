 const mongoose = require('mongoose')
const MONGO_URL = "mongodb://127.0.0.1:27017/learingBackend"


const connectDB = async()=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Mongo DB connected")
    } catch (error) {
        console.log("mongoose connection error",error)
    }
}
module.exports = connectDB;