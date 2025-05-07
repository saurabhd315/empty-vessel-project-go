
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import "./CounsellorCarousel.css";

type Counsellor = {
  id: number;
  name: string;
  expertise: string;
  rating: number;
  bio: string;
  image: string;
  slug: string;
};

export const CounsellorCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [api, setApi] = useState<any>(null);
  const navigate = useNavigate();
  
  // Media queries for responsive design
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");

  const counsellors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      expertise: "Career Development",
      rating: 5,
      bio: "With over 15 years of experience in career coaching, Dr. Johnson specializes in helping professionals navigate career transitions.",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=800&h=500",
      slug: "sarah-johnson"
    },
    {
      id: 2,
      name: "Michael Chen, MBA",
      expertise: "Business Leadership",
      rating: 5,
      bio: "Former Fortune 500 executive with expertise in leadership development, strategic planning, and organizational growth.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800&h=500",
      slug: "michael-chen"
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      expertise: "Tech Career Advisor",
      rating: 5,
      bio: "Experienced tech industry veteran helping professionals navigate the complex landscape of technology careers.",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=800&h=500",
      slug: "priya-patel"
    },
    {
      id: 4,
      name: "James Wilson",
      expertise: "Creative Industries",
      rating: 5,
      bio: "Award-winning creative director specializing in guiding careers in design, marketing, and creative leadership roles.",
      image: "https://images.unsplash.com/photo-1501286353178-1ec871214838?auto=format&fit=crop&q=80&w=800&h=500",
      slug: "james-wilson"
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      expertise: "Personal Development",
      rating: 5,
      bio: "Certified life coach with a passion for helping individuals achieve their personal and professional goals.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800&h=500",
      slug: "emma-rodriguez"
    },
    {
      id: 6,
      name: "Dr. Alex Thompson",
      expertise: "Health & Wellness",
      rating: 5,
      bio: "Health and wellness expert focused on helping professionals maintain work-life balance and prevent burnout.",
      image: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?auto=format&fit=crop&q=80&w=800&h=500",
      slug: "alex-thompson"
    }
  ];

  const renderRatingStars = (rating: number) => {
    return Array(rating)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ));
  };

  const handleViewProfile = (slug: string) => {
    navigate(`/profile/${slug}`);
  };
  
  // Set up autoplay
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [api]);
  
  // When the API is available, we'll set up an event listener for selection changes
  useEffect(() => {
    if (!api) return;
    
    api.on("select", () => {
      setCurrentPage(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="counsellors" className="counsellor-carousel-section">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-sm uppercase tracking-wider carousel-badge">Expert Guidance</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">Meet Our Expert Counsellors</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team of experienced professionals is dedicated to helping you achieve your career goals.
          </p>
        </div>

        <div className="carousel-container">
          <Carousel 
            className="w-full"
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {counsellors.map((counsellor: Counsellor) => (
                <CarouselItem 
                  key={counsellor.id} 
                  className={`${
                    isDesktop ? 'basis-1/3' : isTablet ? 'basis-1/2' : 'basis-full'
                  } h-[400px] md:h-[500px]`}
                >
                  <div className="counsellor-slide" style={{ backgroundImage: `url(${counsellor.image})` }}>
                    <div className="counsellor-overlay">
                      <div className="slide-content">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{counsellor.name}</h3>
                        <p className="text-lg md:text-xl font-medium mb-3 text-primary-200">{counsellor.expertise}</p>
                        
                        <p className="bio-excerpt mb-4">{counsellor.bio.slice(0, 100)}...</p>
                        
                        <div className="flex items-center mb-4">
                          {renderRatingStars(counsellor.rating)}
                        </div>
                        
                        <Button 
                          className="view-profile-btn"
                          onClick={() => handleViewProfile(counsellor.slug)}
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="carousel-prev-btn" />
            <CarouselNext className="carousel-next-btn" />
          </Carousel>
          
          <div className="pagination-dots mt-6 flex justify-center">
            {counsellors.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                className={`pagination-dot ${currentPage === index ? 'active' : ''}`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
