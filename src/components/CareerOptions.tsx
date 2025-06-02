import { useRef, useState, useEffect } from "react";
import {
  Code,
  Palette,
  Brain,
  Users,
  GraduationCap,
  Briefcase,
  ChevronDown,
  ChevronUp
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
  parentCategory: string;
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
  const [expandedParentCategory, setExpandedParentCategory] = useState<string | null>(null);
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

  // Load custom careers and categories from localStorage
  useEffect(() => {
    const storedCareers = localStorage.getItem("customCareers");
    if (storedCareers) {
      setCustomCareers(JSON.parse(storedCareers));
    }

    const storedCategories = localStorage.getItem("careerCategories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  // Get unique parent categories
  const parentCategories = Array.from(new Set(categories.map(cat => cat.parentCategory).filter(Boolean)));

  // Convert subcategories to career format for display
  const getSubcategoriesForParent = (parentCategory: string) => {
    return categories
      .filter(category => category.parentCategory === parentCategory)
      .map(category => ({
        id: category.id,
        title: category.name,
        teaser: (category.opportunities && category.opportunities.length > 0) 
          ? category.opportunities[0] 
          : "Explore opportunities",
        icon: <Briefcase size={30} />,
        industry: parentCategory,
        color: "#D3E4FD",
        salary: "Competitive",
        categoryData: category
      }));
  };

  // Combine default careers and custom careers
  const defaultAndCustomCareers = [
    ...defaultCareers,
    ...customCareers.map(career => ({
      ...career,
      icon: <Briefcase size={30} />
    }))
  ];

  // Get industries for filtering (excluding parent categories)
  const industries = Array.from(new Set(defaultAndCustomCareers.map(career => career.industry)));
  
  // Filter careers based on selected industry
  const filteredCareers = defaultAndCustomCareers.filter(career => {
    return !activeFilter || career.industry === activeFilter;
  });

  // Determine career link
  const getCareerLink = (career: any) => {
    if (career.id?.startsWith('custom-')) {
      return `/careers/custom/${career.id}`;
    } else if (career.id?.startsWith('category-')) {
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

        {/* Parent Categories Section */}
        {parentCategories.length > 0 && (
          <div className="parent-categories-section mb-10">
            <h3 className="text-2xl font-bold text-center mb-6">Career Categories</h3>
            <div className="parent-categories-grid">
              {parentCategories.map((parentCategory) => (
                <div key={parentCategory} className="parent-category-card">
                  <div 
                    className="parent-category-header"
                    onClick={() => setExpandedParentCategory(
                      expandedParentCategory === parentCategory ? null : parentCategory
                    )}
                  >
                    <h4 className="parent-category-name">{parentCategory}</h4>
                    {expandedParentCategory === parentCategory ? 
                      <ChevronUp size={20} /> : <ChevronDown size={20} />
                    }
                  </div>
                  
                  <AnimatePresence>
                    {expandedParentCategory === parentCategory && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="subcategories-container"
                      >
                        <div className="subcategories-carousel">
                          <Carousel
                            className="w-full"
                            opts={{
                              align: "start",
                              loop: false,
                            }}
                          >
                            <CarouselContent>
                              {getSubcategoriesForParent(parentCategory).map((subcategory) => (
                                <CarouselItem key={subcategory.id} className="md:basis-1/2 lg:basis-1/3">
                                  <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="career-card-container"
                                  >
                                    <div 
                                      className="career-card subcategory-card" 
                                      style={{ backgroundColor: subcategory.color }}
                                    >
                                      <div className="career-icon-container">
                                        {subcategory.icon}
                                      </div>
                                      <h3 className="career-title">{subcategory.title}</h3>
                                      <p className="career-teaser">{subcategory.teaser}</p>
                                      <div className="career-overlay">
                                        <div className="career-salary">{subcategory.salary}</div>
                                        <Link to={getCareerLink(subcategory)}>
                                          <Button variant="outline" className="view-details-btn">
                                            View Details
                                          </Button>
                                        </Link>
                                      </div>
                                    </div>
                                  </motion.div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="career-nav-button prev" />
                            <CarouselNext className="career-nav-button next" />
                          </Carousel>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Default Career Options */}
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
    </section>
  );
};
