import express from "express"
import { getOtherUsers, getProfile, loginUser, logout, registerUser } from "../controller/user.controller.js"
import { isAuthenticated } from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/signup", registerUser)
router.post("/login", loginUser)
router.get("/profile", isAuthenticated, getProfile)
router.post("/logout", isAuthenticated, logout)
router.get("/get-other-users", isAuthenticated, getOtherUsers)

export default router