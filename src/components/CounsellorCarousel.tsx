
import { useState, useEffect } from "react";
import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
  quote?: string; // Make quote optional to avoid TypeScript errors
};

export const CounsellorCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [api, setApi] = useState<any>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const navigate = useNavigate();

  // Media queries for responsive design
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  
  const counsellors: Counsellor[] = [{
    id: 1,
    name: "Dr. Sarah Johnson",
    expertise: "Career Development",
    rating: 5,
    quote: "Your career should reflect your passion",
    bio: "With over 15 years of experience in career coaching, Dr. Johnson specializes in helping professionals navigate career transitions.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=800&h=500",
    slug: "sarah-johnson"
  }, {
    id: 2,
    name: "Michael Chang",
    expertise: "Educational Pathways",
    rating: 4,
    quote: "Learning is a lifelong journey",
    bio: "As a former university dean, Michael provides guidance on educational pathways, academic planning, and scholarship opportunities for students.",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800&h=500",
    slug: "michael-chang"
  }, {
    id: 3,
    name: "Dr. Emily Rodriguez",
    expertise: "Mental Health",
    rating: 5,
    quote: "Balance is the key to mental health",
    bio: "A licensed psychologist with expertise in stress management, anxiety, and work-life balance. Dr. Rodriguez utilizes evidence-based approaches.",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=800&h=500",
    slug: "emily-rodriguez"
  }, {
    id: 4,
    name: "James Wilson",
    expertise: "Creative Industries",
    rating: 5,
    quote: "Creativity is intelligence having fun",
    bio: "Award-winning creative director specializing in guiding careers in design, marketing, and creative leadership roles.",
    image: "https://images.unsplash.com/photo-1501286353178-1ec871214838?auto=format&fit=crop&q=80&w=800&h=500",
    slug: "james-wilson"
  }, {
    id: 5,
    name: "Emma Henderson",
    expertise: "Personal Development",
    rating: 5,
    quote: "Growth happens outside your comfort zone",
    bio: "Certified life coach with a passion for helping individuals achieve their personal and professional goals.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800&h=500",
    slug: "emma-henderson"
  }, {
    id: 6,
    name: "Dr. Alex Thompson",
    expertise: "Health & Wellness",
    rating: 5,
    quote: "Wellness is a state of body and mind",
    bio: "Health and wellness expert focused on helping professionals maintain work-life balance and prevent burnout.",
    image: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?auto=format&fit=crop&q=80&w=800&h=500",
    slug: "alex-thompson"
  }];
  
  const renderRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 transition-all duration-300 
          ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };
  
  const handleViewProfile = (slug: string) => {
    navigate(`/profile/${slug}`);
  };

  // Set up autoplay with pause on hover
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      if (hoveredCard === null) {
        api.scrollNext();
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [api, hoveredCard]);

  // When the API is available, set up an event listener for selection changes
  useEffect(() => {
    if (!api) return;
    
    api.on("select", () => {
      setCurrentPage(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="counsellors" className="counsellor-carousel-section">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
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
              loop: true
            }}
          >
            <CarouselContent>
              {counsellors.map((counsellor: Counsellor, index) => (
                <CarouselItem 
                  key={counsellor.id} 
                  className={`${isDesktop ? 'basis-1/3' : isTablet ? 'basis-1/2' : 'basis-full'} p-2`}
                >
                  <div 
                    className={`counsellor-card ${currentPage === counsellors.indexOf(counsellor) ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="counsellor-image">
                      <div className="counsellor-expertise-badge">
                        {counsellor.expertise}
                      </div>
                      <img src={counsellor.image} alt={counsellor.name} />
                    </div>
                    <div className="counsellor-content">
                      <h3 className="counsellor-name">{counsellor.name}</h3>
                      <div className={`counsellor-underline ${hoveredCard === index ? 'active' : ''}`}></div>
                      
                      <div className="counsellor-rating">
                        {renderRatingStars(counsellor.rating)}
                      </div>
                      
                      {counsellor.quote && (
                        <p className="counsellor-quote">"{counsellor.quote}"</p>
                      )}
                      
                      <p className="counsellor-bio">{counsellor.bio}</p>
                      
                      <Button 
                        onClick={() => handleViewProfile(counsellor.slug)} 
                        className={`view-profile-btn ${hoveredCard === index ? 'pulse' : ''}`}
                      >
                        View Profile <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="carousel-prev-btn">
              <ChevronLeft size={20} />
            </CarouselPrevious>
            <CarouselNext className="carousel-next-btn">
              <ChevronRight size={20} />
            </CarouselNext>
          </Carousel>
          
          <div className="pagination-dots">
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
