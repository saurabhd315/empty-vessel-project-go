
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Database, 
  Shield, 
  Brain,
  Briefcase,
  Heart,
  Building,
  Palette
} from "lucide-react";
import { Link } from "react-router-dom";
import "./CareerOptions.css";

// Career data from your JSON
const careerData = {
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
  }
};

// Icon mapping for different categories
const iconMap = {
  "Software Development": Code,
  "Data Science": Database,
  "Cybersecurity": Shield,
  "Artificial Intelligence": Brain,
  "Healthcare": Heart,
  "Business": Briefcase,
  "Finance": Building,
  "Design": Palette
};

// Color mapping for different categories
const colorMap = {
  "Software Development": "bg-blue-500",
  "Data Science": "bg-green-500", 
  "Cybersecurity": "bg-red-500",
  "Artificial Intelligence": "bg-purple-500",
  "Healthcare": "bg-pink-500",
  "Business": "bg-orange-500",
  "Finance": "bg-indigo-500",
  "Design": "bg-teal-500"
};

export const CareerOptions = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([
    { name: "All", label: "All Careers" },
    { name: "Technology", label: "Technology" }
  ]);

  // Load dynamic categories from localStorage and merge with existing Technology category
  useEffect(() => {
    const storedCategories = localStorage.getItem("careerCategories");
    if (storedCategories) {
      const parsedCategories = JSON.parse(storedCategories);
      setCategories([
        { name: "All", label: "All Careers" },
        { name: "Technology", label: "Technology" },
        ...parsedCategories
      ]);
    }
  }, []);

  // Create career metadata from the data
  const careerMetadata = Object.keys(careerData).map(careerTitle => ({
    id: careerTitle.toLowerCase().replace(/\s+/g, '-'),
    title: careerTitle,
    icon: iconMap[careerTitle as keyof typeof iconMap] || Briefcase,
    color: colorMap[careerTitle as keyof typeof colorMap] || "bg-gray-500",
    category: "Technology"
  }));

  const filteredCareers = careerMetadata.filter(career => 
    selectedCategory === "All" || career.category === selectedCategory
  );

  return (
    <section id="career-options" className="career-options-section">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Explore Career Options in India
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Discover detailed information about technology careers including roles, resources, and industry insights
          </p>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.name)}
                className="filter-chip"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredCareers.map((career) => {
            const IconComponent = career.icon;
            const data = careerData[career.title as keyof typeof careerData];
            
            return (
              <div key={career.id} className="career-card-container">
                <div className={`career-card ${career.color}`}>
                  <div className="career-icon-container">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="career-title text-white">{career.title}</h3>
                  <p className="career-teaser text-white/90">
                    {data["Opportunities and Roles"].slice(0, 2).join(", ")}
                    {data["Opportunities and Roles"].length > 2 && "..."}
                  </p>
                  
                  <div className="career-overlay">
                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-lg mb-2">{career.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        {data.Insights.substring(0, 100)}...
                      </p>
                    </div>
                    <Button asChild className="view-details-btn">
                      <Link to={`/career-details/${career.id}`}>
                        View More
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCareers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No career paths found in this category.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/sample-journeys">
              View Sample Career Journeys
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
