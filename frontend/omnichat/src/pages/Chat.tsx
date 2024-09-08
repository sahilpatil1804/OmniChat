import { Box,Avatar, Typography, Button, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { clearChats, getChats, sendChatRequest } from "../helper/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
type Messagestype = {
    role : "user" | "bot",
    content: string
}
const Chat = ()=>{
    const auth = useAuth()
    const navigate = useNavigate()
    const [messages, setMessages] = useState<Messagestype[]>([])
    
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
}, [messages]);

    useLayoutEffect(()=>{
        if(auth?.isLogged && auth.user){
            toast.loading("Loading Chats", {id:"loadchats"})
            getChats().then((data)=>{
                setMessages([...data])
                toast.success("Chats loaded successfully", {id:"loadchats"})
            }).catch(err=>{
                console.log(err.message)
                toast.error("Loading failed", {id:"loadchats"})
            })
        }
    }, [auth])
    useEffect(()=>{
        if(!auth?.user){
            return navigate('/')
        }
    }, [auth])
    const handleSubmit = async()=>{
        const content = inputRef.current?.value as string
        if(inputRef && inputRef.current){
            inputRef.current.value = ""
        }
        const newMessage : Messagestype = {role:"user", content}
        setMessages((prev: Messagestype[])=>[...prev, newMessage])
        const chatData = await sendChatRequest(content)
        setMessages([...chatData])
    }
    const handleKeyDown = async(event: React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === 'Enter'){
            event.preventDefault()
            await handleSubmit()
        }
    }
    const handleDeleteChat = async()=>{
        try {
            toast.loading("Clearing Conversation...", {id:"deletechats"})
            await clearChats()
            setMessages([])
            toast.success("Cleared chats Successfully", {id:"deletechats"})

        } catch (error) {
            console.log(error)
            toast.error("Deleting chats failed", {id:"deletechats"})
        }
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
            }} onClick={handleDeleteChat}>Clear Conversation</Button>
            </Box>
        </Box>
        <Box sx={{display:"flex", flex:{md:0.8, xs:1, sm: 1}, justifyContent:"center", flexDirection:"column"}}>
            <Typography sx={{textAlign:"center", fontSize:"40px", color:"white", mb:2}}> Model - <span style={{ display: "inline", fontFamily: "monospace", background:"gray" }}>
                Gemini 1.5 Flash
                {/* <p style={{ display: "inline", margin: 0, background:"gray" }}>Gemini 1.5 Flash</p> */}
            </span></Typography>
            <Box ref={chatContainerRef} sx={{width:"100%", height:"60vh", borderRadius:3, mx:"auto", display:"flex", flexDirection:"column", overflow:"scroll", overflowX:"hidden", scrollBehavior:"smooth", overflowY:"auto"}}>  
            {
            //@ts-ignore
            messages.map((chat, idx)=>(<ChatItem content={chat.content} role={chat.role} key={idx} />) )} </Box>
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
                        onKeyDown={handleKeyDown}
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