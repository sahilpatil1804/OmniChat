import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'


export const Logo = () => {
  return (
    <div style={{display:"flex", marginRight:"auto", alignItems:"center", gap:"9px", marginTop:"3px"}}>
        <Link to={"/"}>
            <img src="chatbot.png" alt="gemini" width={"41px"} height={"41px"} className='image-inverted' />
        </Link>
        <Typography sx={{display: {md:"block", sm:"block", xs:"none"}, mr:"auto", fontWeight:"800", textShadow:"2px 2px 20px #000"}}>
                <span style={{fontSize:"22px"}}>OmniChat</span>
            </Typography>
    </div>
  )
}

export default Logo