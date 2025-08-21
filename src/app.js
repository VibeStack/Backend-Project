import express, { Router } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
const port = process.env.PORT

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import segregation

import userRouter from "./routes/user.routes.js"

// Routes Declaration

app.use("/api/v1/users",userRouter)
// http://localhost:8000/api/v1/users/register


export {app}