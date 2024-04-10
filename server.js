const express = require("express")
require('dotenv').config()
const app = express()
const connectDB = require('./db/db.js');
const MenuItem = require('./models/menu.js')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000
const passport = require("./auth/auth.js")


app.use(bodyParser.json())






connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(` server not start at ${PORT} || mongo db connection fail`, error)
    })

// middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request mate to: ${req.originalUrl} `)
    next()
}
app.use(logRequest)

app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local',{session:false});



app.get('/', (req, res) => {
    res.send("welcome to home page")
})

//import the router files
const personRoutes = require("./routes/personRoute.js")
const menuRoutes = require("./routes/menuRoute.js");

// use routes
app.use("/person",personRoutes)
app.use("/menuitem",menuRoutes)

