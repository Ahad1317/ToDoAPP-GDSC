const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const itemRoute = require("./routes/items")
const app = express()
const cors = require('cors');

app.use(express.json()) //for getting data in json format

const PORT = process.env.PORT || 3300
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(()=>
console.log("Database connected"))
.catch(err=>console.log(err))

app.use('/', itemRoute)

app.listen(PORT,(req,res)=>{
    console.log("Workingg brooo")
})

