import { Router } from "express"
import { clearChats, generateChatCompletion, getAllChats, sendChats } from "../controllers/chat_controller.js"
import { verifyToken } from "../utils/jwtauth.js"
const chatRouter = Router()
chatRouter.get("/", verifyToken,  getAllChats)
chatRouter.post("/new", verifyToken, generateChatCompletion)
chatRouter.get("/getchats", verifyToken, sendChats)
chatRouter.delete("/clearchat", verifyToken, clearChats)
export default chatRouter