
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
          <h3 className="text-lg font-semibold mt-2 mb-1">{title}</h3>
          
          {isMobile && (
            <Button variant="outline" className="know-more-button mt-auto text-sm py-1" onClick={handleFlip}>
              Know More
            </Button>
          )}
        </div>
        
        <div className="flip-card-back">
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          
          <Button 
            variant="outline" 
            className="back-button text-sm py-1"
            onClick={handleFlip}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
