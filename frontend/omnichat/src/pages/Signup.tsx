import { Box, Typography, Button } from "@mui/material";
import "../App.css"
import CustomizedInput from "../components/shared/CustomizedInput";
import { CiLogin } from "react-icons/ci";
import React from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = ()=>{
    const auth = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        const name = formdata.get("username") as string
        const email = formdata.get("email") as string
        const password = formdata.get("password") as string
        try{
            toast.loading("Signing in!",{id:"signup"})
            await auth?.signup(name,email, password)
            toast.success("Registered successfully!", {id:"signup"})
            navigate("/")
        }catch(error){
            console.log(error);
            toast.error("Something went wrong!", {id:"signup"})
        }
    }
    return <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
        <Box padding={8} mt={8} display={{md:"flex", sm:"none", xs:"none"}}>
            <img src="robo.png" alt="Robot" style={{width:"350px"}} className="tilt-animation"/>
        </Box>
        <Box display={"flex"} flex={{xs: 1, md: 0.5}} justifyContent={"center"}
        alignItems={"center"}
        ml={"auto"}
        mr={"auto"}
        mt={16}
        >
            <form style={{margin:"auto", padding: "30px", boxShadow: "10px 10px 20px #000", borderRadius: "10px", border:"none"}} onSubmit={handleSubmit}>
                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>Register</Typography>
                    <CustomizedInput type="text" name="username" label="Name" />
                    <CustomizedInput type="email" name="email" label="Email" />
                    <CustomizedInput type="password" name="password" label="Password"/>
                    <Button type="submit" sx={{px:2, py:1, mt:2, width:"400px", borderRadius:2, bgcolor:"#51538f",color:"white", ":hover": {bgcolor:"white", color:"black"}}}endIcon={<CiLogin/>}>Login</Button>
                </Box>
            </form>
        </Box>
    </Box>
}
export default Signup
