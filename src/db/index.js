import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async ()=>{
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\nMongoDB connected Successfully !! DB Host ${connectionInstance.connection.host}`);
  } 
  catch (error) {
    console.log("\nMONGODB connection failed:\n\n",error);
    process.exit(1)
  }
}

export default connectDB