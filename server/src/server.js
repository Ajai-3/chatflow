import http from "http"
import app from "./app.js"
import connectDB from "./config/db.config.js"
const PORT = process.env.PORT

const server = http.createServer(app)

connectDB()

server.listen(PORT, () => {
    console.log(`Server starts on port ${PORT}`)
})