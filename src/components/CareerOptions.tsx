
import { useRef, useState, useEffect } from "react";
import {
  Code,
  Palette,
  Brain,
  Users,
  GraduationCap,
  Briefcase,
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

type CategoryResource = {
  title: string;
  url: string;
};

type CareerCategory = {
  id: string;
  name: string;
  parentCategory?: string;
  opportunities: string[];
  resources: {
    "Educational Resources": CategoryResource[];
    "Online Courses": CategoryResource[];
    "Industry Blogs": CategoryResource[];
    "Professional Networks": CategoryResource[];
  };
  insights: string;
};

export const CareerOptions = () => {
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [customCareers, setCustomCareers] = useState<CustomCareer[]>([]);
  const [categories, setCategories] = useState<CareerCategory[]>([]);
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

  // Load custom careers and categories from localStorage with real-time updates
  useEffect(() => {
    const loadData = () => {
      const storedCareers = localStorage.getItem("customCareers");
      if (storedCareers) {
        setCustomCareers(JSON.parse(storedCareers));
      }

      const storedCategories = localStorage.getItem("careerCategories");
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    };

    // Initial load
    loadData();

    // Listen for storage changes to update in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "careerCategories" || e.key === "customCareers") {
        loadData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also listen for custom events in case changes happen in the same window
    const handleCustomUpdate = () => {
      loadData();
    };
    
    window.addEventListener("categoriesUpdated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("categoriesUpdated", handleCustomUpdate);
    };
  }, []);

  // Filter out unwanted categories and get only categories without parent
  const excludedCategories = ["xyz", "adf", "Arts and Humanities"];
  const categoriesWithoutParent = categories.filter(cat => 
    (!cat.parentCategory || cat.parentCategory.trim() === "") &&
    !excludedCategories.includes(cat.name)
  );

  // Convert categories to career format for display
  const categoryToCareers = (categoryList: CareerCategory[]) => categoryList.map(category => ({
    id: category.id,
    title: category.name,
    teaser: (category.opportunities && category.opportunities.length > 0) 
      ? category.opportunities[0] 
      : "Explore opportunities",
    icon: <Briefcase size={30} />,
    industry: "Technology", // Default to Technology for now
    color: "#D3E4FD", // Default color
    salary: "Competitive", // Default salary text
    categoryData: category // Store full category data for detailed view
  }));

  // Combine all careers (default + custom + categories without parent)
  const allCareers = [
    ...defaultCareers,
    ...customCareers.map(career => ({
      ...career,
      icon: <Briefcase size={30} />
    })),
    ...categoryToCareers(categoriesWithoutParent)
  ];

  // Get unique industries for filters
  const industries = Array.from(new Set(allCareers.map(career => career.industry)));
  
  // Filter careers based on selected industry
  const filteredCareers = allCareers.filter(career => {
    return !activeFilter || career.industry === activeFilter;
  });

  // Determine if a career is custom or category
  const isCustomCareer = (careerId: string) => {
    return careerId.startsWith('custom-');
  };

  const isCategoryCareer = (careerId: string) => {
    return careerId.startsWith('category-');
  };

  const getCareerLink = (career: any) => {
    if (isCustomCareer(career.id)) {
      return `/careers/custom/${career.id}`;
    } else if (isCategoryCareer(career.id)) {
      return `/careers/category/${career.id}`;
    } else {
      return `/careers/${career.id}`;
    }
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

        {/* Career Options Section */}
        <div className="original-careers-section">
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
                            <Link to={getCareerLink(career)}>
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
      </div>
    </section>
  );
};
