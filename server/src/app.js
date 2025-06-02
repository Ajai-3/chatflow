import express from "express"
import dotenv from "dotenv"
import cors from "cors"
const app = express()
dotenv.config()

import userRouter from "./routes/user.routes.js"


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", userRouter)

export default app