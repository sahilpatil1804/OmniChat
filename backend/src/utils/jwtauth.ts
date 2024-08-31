import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { COOKIE_NAME } from "./constants.js"
import User from "../models/User.js"
import { compare } from "bcrypt"

export const  createToken = (id:string, email:string, expiresIn: string)=>{
    const payload = {id, email}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn
    })
    return token
}

export const verifyToken = async(req: Request, res: Response, next:NextFunction)=>{
    const token = req.signedCookies[`${COOKIE_NAME }`]
    if(!token || token.trim() === ""){
        return res.status(401).json({message:"Token not recieved"})
    }
    return new Promise<void>((resolve, reject)=>{
        return jwt.verify(token, process.env.JWT_SECRET, (err, success)=>{
            if(err){
                reject(err.message)
                return res.status(400).json({message:"Token expired"})  
            }else{
                resolve()
                res.locals.jwtData = success
                return next()
            }
        })
    })
}

export const verifyUser = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if(!user){
            return res.status(401).send("User not registered")
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match")
        }
        return res.status(200).json({message: "ok", name: user.name, email: user.email})
    } catch (error) {
        return res.status(401).json({message:"Error", cause:error.message})
    }
}