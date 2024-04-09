const express = require("express")
const router = express.Router()
const Person = require("../models/person.js")



//Post route to add a person we can use this for sign up page 
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        //create a new person document using mongoose model
        const newPerson = new Person(data);
        //save the new person to the database
        const response = await newPerson.save();
        console.log('data saved sucessfully')
        res.status(200).json(response)
    } catch (error) {
        console.log(error, " internal server  error")
        res.status(500).json({ error: "internal server error" })

    }
})
//get method to get the person data 
router.get("/", async (req, res) => {
    try {
        const data = await Person.find()
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "fail to fetch person data" })
    }
})
router.get("/:worktype", async (req, res) => {
    try {
        const workType = req.params.worktype;
        if (workType == "chef" || workType == "manager" || workType == "waiter") {
            const response = await Person.find({ work: workType })
            console.log("data fetched")
            res.status(200).json(response)
        } else {
            res.status(500).json({ error: "invailed worktype" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "fail to fetch person data" })
    }
})

router.put("/:id", async (req, res) => {
    try {
        //extract  the id from URL parameters
        const personId = req.params.id
        //data which will be update
        const updatedPersonData = req.body
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Return the updated data
            runValidators: true //use mongoose validation which is used in person model
        })
        if(!response){
            res.status(404).json({error:"person not found"})
        }
        console.log("updated data ")
            res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "fail to update person data" })
    }
})

router.delete("/:id",async(req,res)=>{
   try {
     const personID = req.params.id
     const response = await Person.findByIdAndDelete(personID)
     res.status(202).json(response)
     if(!response){
        res.status(404).json({error:"person not found"})
    }
    console.log(" data deleted ")
        res.status(200).json({message:"data deleted sucessfully"})

} catch (error) {
    console.log(error)
    res.status(500).json({ error: "fail to delete person data" })
}
})

module.exports = router