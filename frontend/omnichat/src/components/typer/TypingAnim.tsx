import React from 'react'
import { TypeAnimation } from 'react-type-animation'
export const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        'Chat with your AI',
        1000, 
        'Built with Gemini API',
        1500,
        'Your own Customized ChatBot !',
        2000
      ]}
      wrapper="span"
      speed={70}
      style={{ fontSize: '50px', display: 'inline-block', color:"white", textShadow:"1px 1px 20px #000" }}
      repeat={Infinity}
    />
  )
}
