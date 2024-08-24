import express from "express"
import {config} from "dotenv"
import morgan from "morgan"
import appRouter from "./routes/route.js"
import cookieParser from "cookie-parser"

config()

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use("/api/v1/", appRouter)
app.use(cookieParser(process.env.COOKIE_SECRET))

export default app