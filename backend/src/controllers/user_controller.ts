import { NextFunction, Request, Response } from "express"
import User from "../models/User.js"
import {hash, compare} from "bcrypt"
import { createToken } from "../utils/jwtauth.js"
import { COOKIE_NAME } from "../utils/constants.js"

export const getAllUsers = async (req:Request, res:Response)=>{
    try{
        const users = await User.find()
        return res.status(200).json({message: "Success", users})
    }catch(error){
        return res.status(400).json({message:"Error", cause: error.message})
    }
}
export const userSignup = async(req:Request, res:Response)=>{
    try{
        const {name, email, password} = req.body
        const hashedPass = await hash(password, 10)
        const user = new User({name, email, password:hashedPass})
        await user.save()
        res.clearCookie(COOKIE_NAME, {
        httpOnly:true, signed:true, path:"/"})
        const tkn = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, tkn, {path:"/", expires, httpOnly:true, signed:true})
        return res.status(200).json({message:"Ok", id: user._id.toString()})
    }catch(error){
        return res.status(200).json({message:"Error", cause: error.message})
    }
}
export const userLogin = async(req:Request, res:Response)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) throw new Error("user not found")
        const match = await compare(password, user.password)
        if(!match) throw new Error("wrong password")
        res.clearCookie(COOKIE_NAME, {
        httpOnly:true, path:"/", signed:true})
        const tkn = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, tkn, {path:"/", expires, httpOnly:true, signed: true})
        return res.status(200).json("successfully logged in")
    }catch(error){
        return res.status(401).json({
            message:"Error",
            cause:error.message
        })
    }
}