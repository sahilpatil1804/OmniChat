import {Request, Response, NextFunction} from "express"
import User from "../models/User.js"
//import {model} from "../config/geminiconfig.js"
import { GoogleGenerativeAI } from "@google/generative-ai"

export const getAllChats = async (req:Request, res:Response)=>{
    console.log("the chats are not available")
    return res.status(200).send("chats not availble")
}
export const generateChatCompletion = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const {message} = req.body
        const user = await User.findById(res.locals.jwtData.id)
        if(!user) return res.status(401).json({message:"User not registered or token malfunctioned"})
        const chats = user.chats.map(({role, content})=>({role, content}))
        chats.push({content: message, role:"user"})
        user.chats.push({content: message, role:"user"})
        const genAI = new GoogleGenerativeAI(process.env.API_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const chatRes = await model.generateContent(message)
        user.chats.push({content: chatRes.response.text(), role:"bot"})
        await user.save()
        return res.status(200).json({chats: user.chats})
    } catch (error) {
        return res.status(404).json({message:"Something went wrong ", cause:error.message})
    }
}