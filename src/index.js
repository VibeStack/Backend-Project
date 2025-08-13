// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js"
import connectDB from "./db/index.js";
import express from "express"
const app = express()

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
    server.on("error", (error) => {
      console.log("Err:", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log(
      "\nError as a result of Promise (DB Connection Failed) ->\n",
      err
    );
  });

/* 
import express from "express"

const app = express()

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",(error)=>{
      console.log("Err:",error);
      throw error
    })
    app.listen(process.env.PORT,()=>{
      console.log(`App is listening on port ${process.env.PORT}`);
    })
  } 
  catch (error) {
    console.error("Error", error);
    throw error;
  }
})();
 */
