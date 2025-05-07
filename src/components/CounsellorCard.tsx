
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import "./CounsellorCard.css";

interface CounsellorCardProps {
  id: string;
  name: string;
  domain: string;
  imageUrl: string;
  rating: number;
  quote: string;
  bio: string;
  slug: string;
}

export const CounsellorCard: React.FC<CounsellorCardProps> = ({
  id,
  name,
  domain,
  imageUrl,
  rating,
  quote,
  bio,
  slug,
}) => {
  return (
    <Card className="counsellor-card" key={id}>
      <div className="counsellor-image-container">
        <img 
          src={imageUrl} 
          alt={`${name} - ${domain} Counsellor`}
          className="counsellor-image"
        />
      </div>
      
      <div className="counsellor-content">
        <div className="counsellor-name-wrapper">
          <h3 className="counsellor-name">{name}</h3>
          <div className="animated-underline"></div>
        </div>
        
        <Badge variant="outline" className="counsellor-domain-badge">
          {domain}
        </Badge>
        
        <div className="counsellor-rating">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`star ${i < rating ? "filled" : ""}`}
            >
              ★
            </span>
          ))}
        </div>
        
        <p className="counsellor-quote">"{quote}"</p>
        
        <p className="counsellor-bio">{bio}</p>
        
        <a 
          href={`/profile/${slug}`} 
          className="counsellor-view-profile-btn"
        >
          View Profile <ArrowRight size={16} />
        </a>
      </div>
    </Card>
  );
};

export default CounsellorCard;
