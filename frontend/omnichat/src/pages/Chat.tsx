import React from "react";
import { Box,Avatar, Typography, Button, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { useRef, useEffect } from "react";
import { IoMdSend } from "react-icons/io";

const Chat = ()=>{
    const auth = useAuth()
    const chats = [
    { role: "user", content: "Who are you?" },
    { role: "bot", content: "I am an AI assistant." },
    { role: "user", content: "What can you do?" },
    { role: "bot", content: "I can help you with a variety of tasks, like answering questions or providing information." },
    { role: "user", content: "Can you tell me a joke?" },
    { role: "bot", content: "Sure! Why don't scientists trust atoms? Because they make up everything!" },
    { role: "user", content: "That's funny! Do you know any interesting facts?" },
    { role: "bot", content: "Yes! Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible." },
    { role: "user", content: "Wow, that's amazing! How can I contact support?" },
    { role: "bot", content: "You can contact support by emailing support@example.com or visiting our support page at example.com/support." }
]
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
}, [chats]);
    const handleSubmit = async()=>{
        console.log(inputRef.current?.value)
    }

    return <Box sx={{display:"flex", flex:1, width:'100%', height:'100%', mt:3, gap:3}}>
        <Box sx={{display:{md:"flex", sm:"none", xs:"none"}, flex:0.2, flexDirection:"column"}}>
            <Box sx={{display:"flex", width:"100%", height:"60vh", bgcolor:"rgb(17, 29, 9)", borderRadius:5, flexDirection:"column", mx:3}}>
            <Avatar sx={{mx:"auto", my:2, bgcolor:"white", color:'black', fontWeight:700}}>
            {auth?.user?.name[0].toUpperCase()}{auth?.user?.name[1].toUpperCase()}
            </Avatar>
            <Typography sx={{mx:"auto", fontFamily:"work sans"}}> You are talking to chatbot</Typography>
            <Typography sx={{mx:"auto", fontFamily:"work sans", my:4, p:3}}>You can ask any question</Typography>
            <Button sx={{width:"200px", my:"auto", color:"white", fontWeight:"700", borderRadius:3, mx:"auto", bgcolor:red[300],
            ":hover":{
                bgcolor:red.A400
            }
            }}>Clear Conversation</Button>
            </Box>
        </Box>
        <Box sx={{display:"flex", flex:{md:0.8, xs:1, sm: 1}, justifyContent:"center", flexDirection:"column"}}>
            <Typography sx={{textAlign:"center", fontSize:"40px", color:"white", mb:2}}> Model - <span style={{ display: "inline", fontFamily: "monospace" }}>
                <pre style={{ display: "inline", margin: 0, background:"gray" }}>Gemini 1.5 Flash</pre>
            </span></Typography>
            <Box ref={chatContainerRef} sx={{width:"100%", height:"60vh", borderRadius:3, mx:"auto", display:"flex", flexDirection:"column", overflow:"scroll", overflowX:"hidden", scrollBehavior:"smooth", overflowY:"auto"}}> {chats.map((chat, idx)=>(<ChatItem content={chat.content} role={chat.role} key={idx} />) )} </Box>
            <Box sx={{
                    width: "93%", 
                    padding: "20px", 
                    borderRadius: 8, 
                    backgroundColor: "rgb(51, 51, 51)",
                    position: "sticky", 
                    bottom: 0, 
                    zIndex: 1,
                    display:"flex",
                    alignItem: "center",
                    justifyContent:"space-between"
                }}>
                    <input 
                        ref = {inputRef}
                        type="text" 
                        style={{
                            width: "100%", 
                            backgroundColor: "transparent", 
                            padding: "10px", 
                            border: "none", 
                            outline: "none", 
                            color: "white", 
                            fontSize: "20px"
                        }} 
                    />
                    <IconButton onClick={handleSubmit} sx={{color:"white"}}><IoMdSend/></IconButton>
                </Box>
        </Box>
    </Box>
}
export default Chat