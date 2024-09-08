import axios from "axios";
export const registerUser = async(name:string, email:string, password:string)=>{
    const res = await axios.post("/user/signup", {name, email, password})
    if(res.status !== 200) throw new Error("Unable to register")
    const data = await res.data
    return data
}
export const loginUser = async(email: string, password:string)=>{
    const res = await axios.post("/user/login",{email, password})
    if(res.status != 200){
        throw new Error("Unable to login")
    }
    const data = await res.data
    return data
}
export const checkAuthStatus = async ()=>{
    const res = await axios.get("user/auth-status")
    if(res.status !== 200){
        throw new Error("Unable to authenticate")
    }
    const data = await res.data
    return data
}
export const sendChatRequest = async (message: string)=>{
    const res = await axios.post("/chats/new", {message})
    if(res.status !== 200) throw new Error("Unable to fetch from api")
    const data = res.data
    return data.chats
}
export const getChats = async()=>{
    const res = await axios.get("/chats/getchats")
    if(res.status !== 200) throw new Error("Unable to get chats")
    const data = await res.data
    return data.chats
}
export const clearChats = async()=>{
    const res = await axios.delete("/chats/clearchat")
    if(res.status !== 200){
        throw new Error("Unable to delete chats")
    }
    const data = await res.data
    return data
}
export const logoutUser = async()=>{
    const res = await axios.get('/user/logout')
    if(res.status !== 200) throw new Error("Unable to logout the user")
    const data = await res.data
    return data
}