// require('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"   // ✅ use the configured app


dotenv.config({
  path:'./.env'
})

const PORT = process.env.PORT || 8000;

connectDB()
.then(()=>{
  app.listen(PORT,()=>{
    app.on("error",(error)=>{
      console.log("Error:",error)
      process.exit(1);
    })
    console.log(`Server is running at http://localhost:${PORT}`)
  })
})
.catch((err)=>{
  console.log("Error: MongoDB Connection failed from file index.js!\n",err)
})


/*
import express from "express"
const app = express()

(async ()=>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",(error)=>{
      console.log("Error:",error)
      throw error
    })
    app.listen(process.env.PORT,()=>{
      console.log(`App is lisstening on port ${process.env.PORT}`)
    })
  } 
  catch(error){
    console.error("Error",error)
    throw error;
  }
})()
*/