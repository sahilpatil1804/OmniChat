import {Router} from "express"
import { getAllUsers, userSignup, userLogin, userLogout } from "../controllers/user_controller.js"
import { validate, signUpValidator, loginValidator } from "../utils/validator.js"
import { verifyToken, verifyUser } from "../utils/jwtauth.js"

const userRouter = Router()
userRouter.get('/', getAllUsers)
userRouter.post('/signup', validate(signUpValidator), userSignup)
userRouter.post('/login', validate(loginValidator),userLogin)
userRouter.get('/auth-status', verifyToken, verifyUser)
userRouter.get('/logout', verifyToken, userLogout)
export default userRouter