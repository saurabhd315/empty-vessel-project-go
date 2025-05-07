
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      bio: "Experienced tech industry veteran helping professionals navigate the complex landscape of technology careers and skill development.",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=150&h=150",
      slug: "priya-patel"
    },
    {
      id: 4,
      name: "James Wilson",
      expertise: "Creative Industries",
      rating: 5,
      bio: "Award-winning creative director specializing in guiding careers in design, marketing, and creative leadership roles.",
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&q=80&w=150&h=150",
      slug: "james-wilson"
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
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">Our Expert Counsellors</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team of experienced professionals is dedicated to helping you achieve your career goals.
          </p>
        </div>

        <div className="counsellor-tabs-container">
          <Tabs defaultValue={counsellors[0].slug} orientation={isMobile ? "horizontal" : "vertical"}>
            <div className="counsellor-tabs-layout">
              <TabsList className={`counsellor-tabs-list ${isMobile ? 'counsellor-tabs-list-mobile' : ''}`}>
                {counsellors.map((counsellor) => (
                  <TabsTrigger 
                    key={counsellor.id} 
                    value={counsellor.slug}
                    className="counsellor-tab"
                  >
                    <div className="counsellor-tab-content">
                      <Avatar className="counsellor-tab-avatar">
                        <AvatarImage src={counsellor.image} alt={counsellor.name} />
                        <AvatarFallback>{counsellor.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className={`counsellor-tab-name ${!isMobile ? 'ml-3' : ''}`}>
                        {counsellor.name}
                      </span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="counsellor-profile-container">
                {counsellors.map((counsellor) => (
                  <TabsContent 
                    key={counsellor.id} 
                    value={counsellor.slug}
                    className="counsellor-profile animate-fade-in"
                  >
                    <div className="counsellor-profile-content">
                      <div className="counsellor-profile-left">
                        <div className="counsellor-avatar-container-large">
                          <Avatar className="counsellor-avatar-large">
                            <AvatarImage src={counsellor.image} alt={counsellor.name} />
                            <AvatarFallback>{counsellor.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                      <div className="counsellor-profile-right">
                        <h3 className="counsellor-name">{counsellor.name}</h3>
                        <p className="counsellor-expertise text-primary-badge">{counsellor.expertise}</p>
                        
                        <div className="rating-container justify-start mb-4 mt-2">
                          {renderStars(counsellor.rating)}
                        </div>
                        
                        <p className="counsellor-bio text-left">{counsellor.bio}</p>
                        
                        <Button className="book-session-button mt-4">
                          Book a Session
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
