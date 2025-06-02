
import { useRef, useState, useEffect } from "react";
import {
  Code,
  Palette,
  Brain,
  Users,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { CustomCareer } from "@/pages/AdminCareers";
import "./CareerOptions.css";

type Career = {
  id: string;
  title: string;
  teaser: string;
  icon: JSX.Element;
  industry: string;
  color: string;
  salary?: string;
  description?: string;
};

export const CareerOptions = () => {
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [customCareers, setCustomCareers] = useState<CustomCareer[]>([]);
  const carouselRef = useRef(null);

  // Default careers
  const defaultCareers: Career[] = [
    {
      id: "software-developer",
      title: "Software Developer",
      teaser: "Design digital experiences",
      icon: <Code size={30} />,
      industry: "Technology",
      color: "#D3E4FD",
      salary: "₹5-25 LPA"
    },
    {
      id: "fashion-designer",
      title: "Fashion Designer",
      teaser: "Create trends that inspire",
      icon: <Palette size={30} />,
      industry: "Design",
      color: "#FFDEE2",
      salary: "₹3-15 LPA"
    },
    {
      id: "psychologist",
      title: "Psychologist",
      teaser: "Shape minds and futures",
      icon: <Brain size={30} />,
      industry: "Healthcare",
      color: "#E5DEFF",
      salary: "₹4-12 LPA"
    },
    {
      id: "hr-manager",
      title: "HR Manager",
      teaser: "Build strong organizations",
      icon: <Users size={30} />,
      industry: "Business",
      color: "#FDE1D3",
      salary: "₹6-18 LPA"
    },
    {
      id: "teacher",
      title: "Teacher",
      teaser: "Inspire the next generation",
      icon: <GraduationCap size={30} />,
      industry: "Education",
      color: "#F2FCE2",
      salary: "₹3-12 LPA"
    },
    {
      id: "financial-analyst",
      title: "Financial Analyst",
      teaser: "Shape economic futures",
      icon: <Briefcase size={30} />,
      industry: "Finance",
      color: "#FEF7CD",
      salary: "₹7-20 LPA"
    }
  ];

  // Load custom careers from localStorage
  useEffect(() => {
    const storedCareers = localStorage.getItem("customCareers");
    if (storedCareers) {
      setCustomCareers(JSON.parse(storedCareers));
    }
  }, []);

  // Combine default and custom careers
  const allCareers = [
    ...defaultCareers,
    ...customCareers.map(career => ({
      ...career,
      icon: <Briefcase size={30} /> // Default icon for custom careers
    }))
  ];

  // Get unique industries for filters
  const industries = Array.from(new Set(allCareers.map(career => career.industry)));
  
  // Filter careers based on selected industry
  const filteredCareers = allCareers.filter(career => {
    return !activeFilter || career.industry === activeFilter;
  });

  // Determine if a career is custom
  const isCustomCareer = (careerId: string) => {
    return careerId.startsWith('custom-');
  };

  return (
    <section className="career-options-section section-spacing">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-6">
          Explore Career Options in India
        </h2>
        
        <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
          Discover diverse career paths tailored for the Indian job market and find guidance to achieve your professional goals.
        </p>
        
        <div className="filter-chips-container">
          <button 
            className={`filter-chip ${activeFilter === "" ? "active" : ""}`}
            onClick={() => setActiveFilter("")}
          >
            All
          </button>
          {industries.map(industry => (
            <button 
              key={industry}
              className={`filter-chip ${activeFilter === industry ? "active" : ""}`}
              onClick={() => setActiveFilter(industry)}
            >
              {industry}
            </button>
          ))}
        </div>
        
        <div className="carousel-container">
          <Carousel
            ref={carouselRef}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent>
              <AnimatePresence>
                {filteredCareers.map((career) => (
                  <CarouselItem key={career.id} className="md:basis-1/2 lg:basis-1/3">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="career-card-container"
                    >
                      <div 
                        className="career-card" 
                        style={{ backgroundColor: career.color }}
                      >
                        <div className="career-icon-container">
                          {career.icon}
                        </div>
                        <h3 className="career-title">{career.title}</h3>
                        <p className="career-teaser">{career.teaser}</p>
                        <div className="career-overlay">
                          <div className="career-salary">{career.salary}</div>
                          <Link to={isCustomCareer(career.id) ? `/careers/custom/${career.id}` : `/careers/${career.id}`}>
                            <Button variant="outline" className="view-details-btn">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </AnimatePresence>
            </CarouselContent>
            <CarouselPrevious className="career-nav-button prev" />
            <CarouselNext className="career-nav-button next" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
