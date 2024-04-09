const mongoose = require("mongoose")

const menuItmeSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    taste:{
        type:String,
        require:true,
        enum:['spicy','sour','sweet']
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    },
})
const MenuItem = mongoose.model("MenuItem",menuItmeSchema)
module.exports = MenuItem