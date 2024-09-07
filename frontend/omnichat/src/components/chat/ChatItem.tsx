import { Box, Avatar, Typography } from "@mui/material"
import React from "react"
import { useAuth } from "../../context/AuthContext"
import geminiSvg from "../../assets/google-gemini-icon.svg"

const ChatItem = ({content, role}:{content: string, role: string})=>{
    const auth = useAuth()
    return role === "bot" ? (<Box sx={{display:"flex", p: 2, bgcolor:"#004d5612", my:2, gap:2}}>
        <Avatar sx={{ml:"0", bgcolor:"black"
        }}>
            <img src={geminiSvg} alt="AI" width={"30px"}/>
        </Avatar>
        <Box><Typography fontSize={"20px"}>{content}</Typography></Box>
    </Box> ) : (
        <Box sx={{display:"flex", p: 2, bgcolor:"#004d56", gap:2}}>
        <Avatar sx={{ml:"0", bgcolor:"black", color:"white"}}>
            {auth?.user?.name[0].toUpperCase()}{auth?.user?.name[1].toUpperCase()}
        </Avatar>
        <Box><Typography fontSize={"20px"}>{content}</Typography></Box>
    </Box>
    )

}

export default ChatItem