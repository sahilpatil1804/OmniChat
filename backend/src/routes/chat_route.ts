import { Router } from "express"
import { generateChatCompletion, getAllChats } from "../controllers/chat_controller.js"
import { verifyToken } from "../utils/jwtauth.js"
const chatRouter = Router()
chatRouter.get("/", verifyToken,  getAllChats)
chatRouter.post("/new", verifyToken, generateChatCompletion)

export default chatRouter