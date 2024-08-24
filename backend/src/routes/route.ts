import { Router } from "express"
import userRouter from "./user_route.js"
import chatRouter from "./chat_route.js"

const appRouter = Router()
appRouter.use('/user', userRouter)
appRouter.use('/chats', chatRouter)
appRouter.route('/').get((req, res)=>{
    res.send("hi")
}).post((req, res)=>{
    console.log(req.body)
    res.send("hi")
})
export default appRouter