
import { useState, useEffect } from "react";
import "./ParticleBackground.css";

export const ParticleBackground = () => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const createParticles = () => {
      const particleCount = window.innerWidth > 768 ? 30 : 15;
      const newParticles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 5 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animationDuration = (Math.random() * 20) + 10;
        const delay = Math.random() * 5;
        
        newParticles.push(
          <div 
            key={i}
            className="particle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${delay}s`
            }}
          />
        );
      }
      
      setParticles(newParticles);
    };
    
    createParticles();
    
    window.addEventListener("resize", createParticles);
    return () => {
      window.removeEventListener("resize", createParticles);
    };
  }, []);
  
  return <div className="particle-container">{particles}</div>;
};
