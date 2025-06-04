import express from "express"
import { getAllUsernames, getChatUsers, getProfile, loginUser, logout, registerUser } from "../controller/user.controller.js"
import { isAuthenticated } from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/signup", registerUser)
router.post("/login", loginUser)
router.get("/all-usernames", getAllUsernames)
router.get("/profile", isAuthenticated, getProfile)
router.post("/logout", isAuthenticated, logout)
router.get("/get-chat-users", isAuthenticated, getChatUsers)

export default router