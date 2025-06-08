require('dotenv').config()
const express = require('express')
const cors = require('cors');
const connection = require("./db")
const passroutes = require("./routes/passwords")
const addpasswordroutes = require("./routes/addpassword")
const deletepassroutes = require("./routes/deletepassword")

// or as an es module:
// import { MongoClient } from 'mongodb'

connection();


const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

//get all the paswords
app.use("/",passroutes)

// add a new password
app.use("/",addpasswordroutes)

//delete the password
app.use("/",deletepassroutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
