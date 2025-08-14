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

export {app}