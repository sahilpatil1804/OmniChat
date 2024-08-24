import {Request, Response, NextFunction} from "express"

export const getAllChats = async (req:Request, res:Response)=>{
    console.log("the chats are not available")
    return res.status(200).send("chats not availble")
}