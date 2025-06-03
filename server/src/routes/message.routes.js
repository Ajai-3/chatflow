import express from "express"
import { getMessages, sendMessage } from "../controller/message.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/send/:receiverId", isAuthenticated, sendMessage)
router.get("/get-messages/:otherParticipantId", isAuthenticated, getMessages)


export default router;