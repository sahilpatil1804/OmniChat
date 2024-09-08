import { Box, Button } from "@mui/material"
import { TypingAnim } from "../components/typer/TypingAnim"
import { useNavigate } from "react-router-dom"

const home = ()=>{
    const navigate = useNavigate()
    return <Box width={'100%'} height={'100%'} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
        <Box sx={{display:'flex', width:'100%', flexDirection:'column', mx:'auto', alignItems:'center', justifyContent:'center', mt:3}}></Box>
        <Box>
            <TypingAnim/>
        </Box>
        <Box sx={{width:'100%', display:'flex', flexDirection:{md:"row", sm:"column", xs:"column"}, gap:5, my:10}}>
            <img src="/home1.png" alt="robo" style={{width:'200px', margin:'auto'}} />
            <Box sx={{display:'flex', flexDirection:{md:"row", sm:"column", xs:"column"}, gap:1, alignItems:'center', margin:'auto'}}>
                <img src="/home2.png" alt='gemini' style={{width:'400px', margin:'auto'}} />
                <img className="rotate" src="/home3.png" alt="robo" style={{width:'130px', margin:'auto'}} />
            </Box>
        </Box>
        <Box sx={{display:'flex', width:'100%', mx:'auto', justifyContent:'center'}}>
        
        <Button
            sx={{
                width:"200px",
                mt: 5,
                backgroundColor: '#4e73cf',
                color: 'white',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 0 35px rgba(0, 123, 255, 1.9)',
                padding: '12px 24px',
                borderRadius: '10px',
                textTransform: 'none',
                fontSize: '18px',
                transition: 'all 0.3s ease',
                '&:hover': {
                    backgroundColor: '#0056b3',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 123, 255, 0.7)',
                }
            }}
            onClick={() => {
                navigate('/signup')
            }}
        >
            Get Started
        </Button>

        </Box>
    </Box>
}
export default home