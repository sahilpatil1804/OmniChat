import { Request, Response, NextFunction } from "express"
import { body, ValidationChain} from "express-validator"

export const validate = (params: ValidationChain[])=>{
    return async(req:Request, res:Response, next:NextFunction)=>{
        for(const validation of params){
            const result = await validation.run(req)
            if(!result.isEmpty()){
                return res.status(400).json({errors: result.array()})
            }
        }
        next()
    }
}
export const signUpValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required")
]
export const loginValidator = [
    body("email").notEmpty().isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required") 
]

