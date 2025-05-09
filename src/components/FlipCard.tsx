
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
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
    <div className={`flip-card ${isFlipped ? "is-flipped" : ""}`}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="step-number">{number}</div>
          <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
          
          {isMobile && (
            <Button variant="outline" className="know-more-button mt-4" onClick={handleFlip}>
              Know More
            </Button>
          )}
        </div>
        
        <div className="flip-card-back">
          <p className="text-gray-600 mb-4">{description}</p>
          
          <Button 
            variant="outline" 
            className="back-button"
            onClick={handleFlip}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
