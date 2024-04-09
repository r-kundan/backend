const express = require("express");
const router = express.Router()
const MenuItem = require("../models/menu.js")

//post for menuitmes
router.post("/",async (req,res)=>{
    try {
      const data = req.body;
      const newMenu = new MenuItem(data)
      const response = await newMenu.save()
      console.log('data saved sucessfully')
      res.status(200).json(response)
    } catch (error) {
     console.log(error)
     res.status(500).json({error:"internal error to save data"})
    }
 
 })
 router.get("/",async(req,res)=>{
     try {
         const data = await MenuItem.find()
         console.log(data)
         res.send(data)
     } catch (error) {
         console.log(error)
         res.status(500).json({error:"fail to fetch menu data"})
     }
 })
 router.get("/:taste",async(req,res)=>{
    try {
        const Taste = req.params.taste
        if(Taste=="spicy"||Taste=="sweet"||Taste=="sour"){
            const response = await MenuItem.find({taste:Taste})
            console.log("data fetched")
            res.status(200).json(response)
        }else{
            res.status(500).json({error:"invaild taste"})
        }
        
    } catch (error) {
        console.log(error)
     res.status(500).json({error:"internal  to check taste"})
    }
 })

 module.exports = router