import express from "express"
import {config} from "dotenv"
import morgan from "morgan"
config()
const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.get("/", (req, res)=>res.send("hi")).post("/", (req, res)=>{
    console.log(req.body)
    return res.send("hi")
})
export default app