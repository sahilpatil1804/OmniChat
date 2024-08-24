import { Router } from "express"
import { getAllChats } from "../controllers/chat_controller.js"
const chatRouter = Router()
chatRouter.get("/", getAllChats)

export default chatRouter