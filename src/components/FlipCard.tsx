
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import "./FlipCard.css";

interface FlipCardProps {
  number: string;
  title: string;
  description: string;
}

export const FlipCard = ({ number, title, description }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useIsMobile();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`flip-card ${isFlipped ? "is-flipped" : ""}`} 
      onClick={isMobile ? handleFlip : undefined}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="step-number">{number}</div>
          <h3 className="card-title">{title}</h3>
        </div>
        
        <div className="flip-card-back">
          <p className="card-description">{description}</p>
        </div>
      </div>
    </div>
  );
}
