import {Router} from "express"
import { getAllUsers, userSignup, userLogin } from "../controllers/user_controller.js"
import { validate, signUpValidator, loginValidator } from "../utils/validator.js"

const userRouter = Router()
userRouter.get('/', getAllUsers)
userRouter.post('/signup', validate(signUpValidator), userSignup)
userRouter.post('/login', validate(loginValidator),userLogin)

export default userRouter