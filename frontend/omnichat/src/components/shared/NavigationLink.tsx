import { Link } from "react-router-dom"
import { useState } from "react"

type props = {
    to: string 
    bg: string 
    text: string
    textColor: string 
    onClick?: ()=> Promise<void> 
}
const NavigationLink = (prop : props)=>{
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const lightenColor = (color: string, percent: number) => {
        let [r, g, b] = color.match(/\w\w/g)!.map(x => parseInt(x, 16))
        r = Math.min(255, Math.floor(r + (r * percent)))
        g = Math.min(255, Math.floor(g + (g * percent)))
        b = Math.min(255, Math.floor(b + (b * percent)))
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
    }
    const baseStyle = {
        padding: '8px',
        borderRadius: '10px',
        letterSpacing: '1px',
        textTransform: 'uppercase' as React.CSSProperties['textTransform'],
        fontWeight: 600,
        marginRight: '10px',
        marginLeft: '10px',
        textDecoration: 'none',
        backgroundColor: prop.bg,
        color: prop.textColor,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    };

    const hoverStyle = {
        backgroundColor: isHovered ? lightenColor(prop.bg, 0.2) : prop.bg,
        color: isHovered ? lightenColor(prop.textColor, 0.2) : prop.textColor,
    };

    const activeStyle = {
        backgroundColor: isActive ? lightenColor(prop.bg, 0.4) : hoverStyle.backgroundColor,
        color: isActive ? lightenColor(prop.textColor, 0.4) : hoverStyle.color,
    };

    return <Link className="navlink" to={prop.to} style={{...baseStyle, ...hoverStyle, ...activeStyle}} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} onMouseDown={()=>setIsActive(true)} onMouseUp={()=>setIsActive(false)}>
        {prop.text}
    </Link>
}
export default NavigationLink
