import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from 'cookie-parser';
const app = express()
dotenv.config()

import userRouter from "./routes/user.routes.js"
import messageRoute from "./routes/message.routes.js"
import { errorMiddleware } from "./middleware/error.middleware.js"

app.use(cookieParser())
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/user", userRouter)
app.use("/api/v1/message", messageRoute)

app.use(errorMiddleware)

export default app