 const mongoose = require('mongoose')
const MONGO_URL = process.env.DB_URL
require('dotenv').config()



const connectDB = async()=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Mongo DB connected")
    } catch (error) {
        console.log("mongoose connection error",error)
    }
}
module.exports = connectDB;