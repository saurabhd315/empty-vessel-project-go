
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

// Hardcoded career data
const hardcodedCareers = {
  "Software Development": {
    "Opportunities and Roles": [
      "Software Engineer",
      "Application Developer",
      "Full-Stack Developer"
    ],
    "Resources": {
      "Educational Resources": [
        {
          "title": "Coursera's Software Development Courses",
          "url": "https://www.coursera.org/browse/computer-science/software-development"
        },
        {
          "title": "edX's Software Engineering MicroMasters",
          "url": "https://www.edx.org/"
        }
      ],
      "Online Courses": [
        {
          "title": "Codecademy's Learn JavaScript",
          "url": "https://www.codecademy.com/"
        },
        {
          "title": "Udacity's Full-Stack Web Developer Nanodegree",
          "url": "https://www.udacity.com/"
        }
      ],
      "Industry Blogs": [
        {
          "title": "TechCrunch",
          "url": "https://techcrunch.com/"
        },
        {
          "title": "Hacker News",
          "url": "https://news.ycombinator.com/"
        }
      ],
      "Professional Networks": [
        {
          "title": "GitHub",
          "url": "https://github.com/"
        },
        {
          "title": "Stack Overflow",
          "url": "https://stackoverflow.com/"
        }
      ]
    },
    "Insights": "Software development continues to grow with increasing demand for innovative solutions across industries."
  },
  "Data Science": {
    "Opportunities and Roles": [
      "Data Scientist",
      "Data Analyst",
      "Machine Learning Engineer"
    ],
    "Resources": {
      "Educational Resources": [
        {
          "title": "DataCamp's Data Science Courses",
          "url": "https://www.datacamp.com/"
        },
        {
          "title": "Coursera's Data Science Specialization",
          "url": "https://www.coursera.org/specializations/jhu-data-science"
        }
      ],
      "Online Courses": [
        {
          "title": "Udemy's Data Science Bootcamp",
          "url": "https://www.udemy.com/"
        },
        {
          "title": "Kaggle's Data Science Courses",
          "url": "https://www.kaggle.com/learn"
        }
      ],
      "Industry Blogs": [
        {
          "title": "Towards Data Science",
          "url": "https://towardsdatascience.com/"
        },
        {
          "title": "Data Science Central",
          "url": "https://www.datasciencecentral.com/"
        }
      ],
      "Professional Networks": [
        {
          "title": "Kaggle",
          "url": "https://www.kaggle.com/"
        },
        {
          "title": "LinkedIn Data Science Group",
          "url": "https://www.linkedin.com/groups/2445483/"
        }
      ]
    },
    "Insights": "Data science is a rapidly expanding field with applications in finance, healthcare, and technology."
  },
  "Cybersecurity": {
    "Opportunities and Roles": [
      "Cybersecurity Analyst",
      "Information Security Manager",
      "Ethical Hacker"
    ],
    "Resources": {
      "Educational Resources": [
        {
          "title": "Cybrary's Cybersecurity Courses",
          "url": "https://www.cybrary.it/"
        },
        {
          "title": "SANS Institute's Cybersecurity Training",
          "url": "https://www.sans.org/"
        }
      ],
      "Online Courses": [
        {
          "title": "Coursera's Cybersecurity Specialization",
          "url": "https://www.coursera.org/search?query=cyber%20security"
        },
        {
          "title": "Udemy's Complete Cyber Security Course",
          "url": "https://www.udemy.com/course/complete-cyber-security-course/"
        }
      ],
      "Industry Blogs": [
        {
          "title": "Krebs on Security",
          "url": "https://krebsonsecurity.com/"
        },
        {
          "title": "The Hacker News",
          "url": "https://thehackernews.com/"
        }
      ],
      "Professional Networks": [
        {
          "title": "ISACA",
          "url": "https://www.isaca.org/"
        },
        {
          "title": "(ISC)²",
          "url": "https://www.isc2.org/"
        }
      ]
    },
    "Insights": "With increasing cyber threats, the need for cybersecurity professionals is growing."
  },
  "Artificial Intelligence": {
    "Opportunities and Roles": [
      "AI Research Scientist",
      "Machine Learning Engineer",
      "AI Specialist"
    ],
    "Resources": {
      "Educational Resources": [
        {
          "title": "MIT's Artificial Intelligence Courses",
          "url": "https://betterworld.mit.edu/artificial-intelligence/"
        },
        {
          "title": "Stanford's AI Courses",
          "url": "https://ai.stanford.edu/"
        }
      ],
      "Online Courses": [
        {
          "title": "Coursera's AI for Everyone",
          "url": "https://www.coursera.org/learn/ai-for-everyone"
        },
        {
          "title": "Udacity's AI Programming with Python",
          "url": "https://www.udacity.com/course/ai-programming-with-python-nanodegree--nd089"
        }
      ],
      "Industry Blogs": [
        {
          "title": "AI Trends",
          "url": "https://www.ibm.com/think/insights/artificial-intelligence-trends"
        },
        {
          "title": "The AI Report",
          "url": "https://www.thereport.ai/"
        }
      ],
      "Professional Networks": [
        {
          "title": "AI Hub",
          "url": "https://aihub.org/"
        },
        {
          "title": "Machine Learning Mastery",
          "url": "https://machinelearningmastery.com/"
        }
      ]
    },
    "Insights": "AI and machine learning are transforming industries with innovations in automation, data analysis, and problem-solving."
  },
  "Marketing": {
    "Opportunities and Roles": [
      "Marketing Manager",
      "Digital Marketing Specialist",
      "Brand Strategist"
    ],
    "Resources": {
      "Educational Resources": [
        {
          "title": "HubSpot Academy's Marketing Courses",
          "url": "https://academy.hubspot.com/"
        },
        {
          "title": "Coursera's Digital Marketing Specialization",
          "url": "https://www.coursera.org/specializations/digital-marketing"
        }
      ],
      "Online Courses": [
        {
          "title": "Google's Digital Garage",
          "url": "https://learndigital.withgoogle.com/digitalgarage"
        },
        {
          "title": "Udemy's Complete Digital Marketing Course",
          "url": "https://www.udemy.com/course/digital-marketing-course/"
        }
      ],
      "Industry Blogs": [
        {
          "title": "Neil Patel",
          "url": "https://neilpatel.com/blog/"
        },
        {
          "title": "Marketing Land",
          "url": "https://marketingland.com/"
        }
      ],
      "Professional Networks": [
        {
          "title": "LinkedIn Marketing Solutions",
          "url": "https://business.linkedin.com/marketing-solutions"
        },
        {
          "title": "MarketingProfs",
          "url": "https://www.marketingprofs.com/"
        }
      ]
    },
    "Insights": "Marketing professionals are in demand due to the growing emphasis on digital strategies and brand management."
  },
  "Finance": {
    "Opportunities and Roles": [
      "Financial Analyst",
      "Investment Banker",
      "Financial Planner"
    ],
    "Resources": {
      "Educational Resources": [
        {
          "title": "CFA Institute's Financial Analyst Courses",
          "url": "https://www.cfainstitute.org/"
        },
        {
          "title": "Coursera's Financial Markets",
          "url": "https://www.coursera.org/learn/financial-markets"
        }
      ],
      "Online Courses": [
        {
          "title": "Udemy's Financial Analyst Course",
          "url": "https://www.udemy.com/"
        },
        {
          "title": "Khan Academy's Finance and Capital Markets",
          "url": "https://www.khanacademy.org/economics-finance-domain/core-finance"
        }
      ],
      "Industry Blogs": [
        {
          "title": "Bloomberg",
          "url": "https://www.bloomberg.com/"
        },
        {
          "title": "Financial Times",
          "url": "https://www.ft.com/"
        }
      ],
      "Professional Networks": [
        {
          "title": "CFA Society",
          "url": "https://www.cfainstitute.org/"
        },
        {
          "title": "Financial Planning Association",
          "url": "https://www.onefpa.org/"
        }
      ]
    },
    "Insights": "The finance sector offers lucrative career opportunities with roles in analysis, investment, and financial planning."
  }
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

  // Convert hardcoded careers to career format
  const hardcodedCareersList: Career[] = Object.entries(hardcodedCareers).map(([key, data]) => ({
    id: `hardcoded-${key.toLowerCase().replace(/\s+/g, '-')}`,
    title: key,
    teaser: data["Opportunities and Roles"][0] || "Explore opportunities",
    icon: <Code size={30} />,
    industry: ["Software Development", "Data Science", "Cybersecurity", "Artificial Intelligence"].includes(key) ? "Technology" : "Business",
    color: ["Software Development", "Data Science", "Cybersecurity", "Artificial Intelligence"].includes(key) ? "#D3E4FD" : "#FDE1D3",
    salary: "Competitive",
    description: data.Insights
  }));

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

    loadData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "careerCategories" || e.key === "customCareers") {
        loadData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    const handleCustomUpdate = () => {
      loadData();
    };
    
    window.addEventListener("categoriesUpdated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("categoriesUpdated", handleCustomUpdate);
    };
  }, []);

  const excludedCategories = ["xyz", "adf", "Arts and Humanities"];
  const categoriesWithoutParent = categories.filter(cat => 
    (!cat.parentCategory || cat.parentCategory.trim() === "") &&
    !excludedCategories.includes(cat.name)
  );

  const categoryToCareers = (categoryList: CareerCategory[]) => categoryList.map(category => ({
    id: category.id,
    title: category.name,
    teaser: (category.opportunities && category.opportunities.length > 0) 
      ? category.opportunities[0] 
      : "Explore opportunities",
    icon: <Briefcase size={30} />,
    industry: "Technology",
    color: "#D3E4FD",
    salary: "Competitive",
    categoryData: category
  }));

  const allCareers = [
    ...defaultCareers,
    ...customCareers.map(career => ({
      ...career,
      icon: <Briefcase size={30} />
    })),
    ...categoryToCareers(categoriesWithoutParent),
    ...hardcodedCareersList
  ];

  const industries = Array.from(new Set(allCareers.map(career => career.industry)));
  
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

  const isHardcodedCareer = (careerId: string) => {
    return careerId.startsWith('hardcoded-');
  };

  const getCareerLink = (career: any) => {
    if (isCustomCareer(career.id)) {
      return `/careers/custom/${career.id}`;
    } else if (isCategoryCareer(career.id)) {
      return `/careers/category/${career.id}`;
    } else if (isHardcodedCareer(career.id)) {
      return `/careers/hardcoded/${career.id}`;
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

export { hardcodedCareers };
