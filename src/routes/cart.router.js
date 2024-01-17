const express = require("express")
const router = express.Router()

var CART = []

router.get("/api/carts", (req,res)=>{
    res.status(200).send(CART)
})