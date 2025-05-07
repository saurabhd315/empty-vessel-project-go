
import React from "react";
import { CounsellorFlipCard } from "./CounsellorFlipCard";
import "./CounsellorsFlipGrid.css";

export const CounsellorsFlipGrid = () => {
  const counsellors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      expertise: "Career Development",
      rating: 5,
      bio: "With over 15 years of experience in career coaching, Dr. Johnson specializes in helping professionals navigate career transitions.",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=150&h=150",
      slug: "sarah-johnson"
    },
    {
      id: 2,
      name: "Michael Chen, MBA",
      expertise: "Business Leadership",
      rating: 5,
      bio: "Former Fortune 500 executive with expertise in leadership development, strategic planning, and organizational growth.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=150&h=150",
      slug: "michael-chen"
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      expertise: "Tech Career Advisor",
      rating: 5,
      bio: "Experienced tech industry veteran helping professionals navigate the complex landscape of technology careers.",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=150&h=150",
      slug: "priya-patel"
    },
    {
      id: 4,
      name: "James Wilson",
      expertise: "Creative Industries",
      rating: 5,
      bio: "Award-winning creative director specializing in guiding careers in design, marketing, and creative leadership roles.",
      image: "https://images.unsplash.com/photo-1501286353178-1ec871214838?auto=format&fit=crop&q=80&w=150&h=150",
      slug: "james-wilson"
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      expertise: "Personal Development",
      rating: 5,
      bio: "Certified life coach with a passion for helping individuals achieve their personal and professional goals.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
      slug: "emma-rodriguez"
    },
    {
      id: 6,
      name: "Dr. Alex Thompson",
      expertise: "Health & Wellness",
      rating: 5,
      bio: "Health and wellness expert focused on helping professionals maintain work-life balance and prevent burnout.",
      image: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?auto=format&fit=crop&q=80&w=150&h=150",
      slug: "alex-thompson"
    }
  ];

  return (
    <section id="counsellors" className="counsellors-flip-section">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-wider text-primary-badge">Expert Guidance</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">Meet Our Expert Counsellors</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team of experienced professionals is dedicated to helping you achieve your career goals.
          </p>
        </div>
        
        <div className="counsellors-grid">
          {counsellors.map((counsellor) => (
            <CounsellorFlipCard
              key={counsellor.id}
              {...counsellor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
