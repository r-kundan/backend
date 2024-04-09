const express = require("express")
const app = express()
const connectDB = require('./db/db.js');
const PORT = 3000;
const MenuItem = require('./models/menu.js')
const bodyParser = require('body-parser');


app.use(bodyParser.json())

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server on port ${PORT}`)
    })
})
.catch((error)=>{
    console.log(`server not start at ${PORT} || mongo db connection fail`,error)
})

// middleware function
const logRequest = (req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request mate to: ${req.originalUrl} `)
    next()
}

app.get('/',logRequest,(req,res)=>{
    res.send("welcome to home page")
})

//import the router files
const personRoutes = require("./routes/personRoute.js")
const menuRoutes = require("./routes/menuRoute.js")

// use routes
app.use("/person",personRoutes)
app.use("/menuitem",menuRoutes)

