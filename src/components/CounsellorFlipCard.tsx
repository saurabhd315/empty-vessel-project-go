
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import "./CounsellorFlipCard.css";

interface CounsellorProps {
  id: number;
  name: string;
  expertise: string;
  rating: number;
  bio: string;
  image: string;
  slug: string;
}

export const CounsellorFlipCard: React.FC<CounsellorProps> = ({
  name,
  expertise,
  rating,
  bio,
  image,
  slug,
}) => {
  const renderStars = (rating: number) => {
    return Array(rating)
      .fill(0)
      .map((_, index) => (
        <Star key={index} className="fill-amber-400 text-amber-400 h-4 w-4" />
      ));
  };

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="avatar-wrapper">
            <Avatar className="counsellor-flip-avatar">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          <h3 className="counsellor-name">{name}</h3>
          <p className="counsellor-expertise">{expertise}</p>
        </div>
        <div className="flip-card-back">
          <h3 className="counsellor-name-back">{name}</h3>
          <div className="rating-container">
            {renderStars(rating)}
          </div>
          <p className="counsellor-bio">{bio}</p>
          <Link to={`/counsellors/${slug}`} className="learn-more-btn">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};
