
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import "./Counsellors.css";

export const Counsellors = () => {
  const isMobile = useIsMobile();
  
  const counsellors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      expertise: "Career Development",
      rating: 5,
      bio: "With over 15 years of experience in career coaching, Dr. Johnson specializes in helping professionals navigate career transitions and find fulfilling paths.",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      id: 2,
      name: "Michael Chen, MBA",
      expertise: "Business Leadership",
      rating: 5,
      bio: "Former Fortune 500 executive with expertise in leadership development, strategic planning, and organizational growth.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      expertise: "Tech Career Advisor",
      rating: 5,
      bio: "Experienced tech industry veteran helping professionals navigate the complex landscape of technology careers and skill development.",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      id: 4,
      name: "James Wilson",
      expertise: "Creative Industries",
      rating: 5,
      bio: "Award-winning creative director specializing in guiding careers in design, marketing, and creative leadership roles.",
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  const renderStars = (rating: number) => {
    return Array(rating)
      .fill(0)
      .map((_, index) => (
        <Star key={index} className="fill-amber-400 text-amber-400 h-4 w-4" />
      ));
  };

  return (
    <section id="counsellors" className="counsellors-section">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-wider text-primary-badge font-semibold">Expert Guidance</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">Meet Our Expert Counsellors</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team of experienced professionals is dedicated to helping you achieve your career goals.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="counsellors-carousel"
        >
          <CarouselContent>
            {counsellors.map((counsellor) => (
              <CarouselItem key={counsellor.id} className={`${isMobile ? 'basis-full' : 'basis-1/3'}`}>
                <Card className="counsellor-card">
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="counsellor-avatar-container">
                      <Avatar className="counsellor-avatar">
                        <AvatarImage src={counsellor.image} alt={counsellor.name} />
                        <AvatarFallback>{counsellor.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <h3 className="font-bold text-xl mt-4 mb-1">{counsellor.name}</h3>
                    <p className="text-primary-badge font-medium mb-2">{counsellor.expertise}</p>
                    
                    <div className="flex mb-3">
                      {renderStars(counsellor.rating)}
                    </div>
                    
                    <p className="text-center text-gray-600 mb-4">{counsellor.bio}</p>
                    
                    <Button variant="outline" className="know-more-button">
                      Know More
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="carousel-arrow carousel-arrow-prev" />
          <CarouselNext className="carousel-arrow carousel-arrow-next" />
        </Carousel>
      </div>
    </section>
  );
};
