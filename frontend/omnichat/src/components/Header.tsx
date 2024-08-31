import { AppBar, Toolbar } from "@mui/material"
import Logo from "./shared/Logo"
import { useAuth } from "../context/AuthContext"
import NavigationLink from "./shared/NavigationLink"
const Header = ()=>{
    const auth = useAuth()
    return <AppBar sx={{bgcolor:"transparent", position:"static", boxShadow:"none"}}>
        <Toolbar sx={{display:"flex"}}>
        <Logo/>
        <div>{auth?.isLogged ? (
            <>
            <NavigationLink bg="#51538f" to="/chat" text="Go to chat" textColor="white"></NavigationLink>
            <NavigationLink bg="#51538f" textColor="white" to="/" text="logout" onClick={auth.logout}></NavigationLink>
            </>
        ): (
            <>
            <NavigationLink bg="#51538f" to="/login" text="Login" textColor="white"></NavigationLink>
            <NavigationLink bg="#51538f" textColor="white" to="/signup" text="Signup"></NavigationLink>
            </>
        )}</div>
        </Toolbar>
    </AppBar>
}
export default Header