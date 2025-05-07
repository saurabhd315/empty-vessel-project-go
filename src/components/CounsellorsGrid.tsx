
import React from "react";
import CounsellorCard from "./CounsellorCard";
import "./CounsellorsGrid.css";

// Sample counsellor data
const counsellorsData = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    domain: "Career Development",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 5,
    quote: "Your career should reflect your passion",
    bio: "With over 15 years of experience in career counselling, Dr. Johnson specializes in helping professionals navigate career transitions and reach their full potential.",
    slug: "sarah-johnson"
  },
  {
    id: "2",
    name: "Michael Chang",
    domain: "Education",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4,
    quote: "Learning is a lifelong journey",
    bio: "As a former university dean, Michael provides guidance on educational pathways, academic planning, and scholarship opportunities for students of all ages.",
    slug: "michael-chang"
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    domain: "Mental Wellness",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 5,
    quote: "Balance is the key to mental health",
    bio: "A licensed psychologist with expertise in stress management, anxiety, and work-life balance. Dr. Rodriguez utilizes evidence-based approaches to foster resilience.",
    slug: "emily-rodriguez"
  },
  {
    id: "4",
    name: "James Wilson",
    domain: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4,
    quote: "Technology should empower, not overwhelm",
    bio: "Former tech executive turned counsellor, James helps individuals and organizations navigate digital transformation and tech career pathways.",
    slug: "james-wilson"
  },
  {
    id: "5",
    name: "Dr. Priya Patel",
    domain: "Relationship",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 5,
    quote: "Healthy relationships require intention",
    bio: "With a doctorate in relationship psychology, Dr. Patel specializes in helping individuals and couples build stronger, more fulfilling relationships.",
    slug: "priya-patel"
  },
  {
    id: "6",
    name: "Robert Kim",
    domain: "Financial Wellness",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4,
    quote: "Financial freedom starts with a plan",
    bio: "A certified financial counsellor with expertise in personal finance, debt management, and retirement planning for professionals at all career stages.",
    slug: "robert-kim"
  }
];

export const CounsellorsGrid: React.FC = () => {
  return (
    <section className="counsellors-section">
      <div className="counsellors-container">
        <div className="counsellors-header">
          <h2 className="counsellors-title">Meet Our Expert Counsellors</h2>
          <p className="counsellors-subtitle">
            Our team of experienced professionals is here to guide you through life's challenges
          </p>
        </div>
        
        <div className="counsellors-grid">
          {counsellorsData.map((counsellor) => (
            <div key={counsellor.id} className="counsellor-grid-item">
              <CounsellorCard {...counsellor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounsellorsGrid;
