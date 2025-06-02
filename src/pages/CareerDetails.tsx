
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, ExternalLink, Users, BookOpen, Globe, Network, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import "./CareerDetails.css";

// Career data from JSON
const careerData = {
  "software-development": {
    title: "Software Development",
    data: {
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
    }
  },
  "data-science": {
    title: "Data Science",
    data: {
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
    }
  },
  "cybersecurity": {
    title: "Cybersecurity",
    data: {
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
    }
  },
  "artificial-intelligence": {
    title: "Artificial Intelligence",
    data: {
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
  }
};

const resourceIcons = {
  "Educational Resources": BookOpen,
  "Online Courses": Globe,
  "Industry Blogs": ExternalLink,
  "Professional Networks": Network
};

const CareerDetails = () => {
  const { careerId } = useParams();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const career = careerData[careerId as keyof typeof careerData];

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Career Not Found</h1>
          <Button asChild>
            <Link to="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="career-details-page">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="outline" asChild className="mb-6">
          <Link to="/#career-options">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Career Options
          </Link>
        </Button>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{career.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive guide to {career.title.toLowerCase()} career path
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Opportunities and Roles */}
          <Card className="career-section-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                Opportunities and Roles
              </CardTitle>
              <CardDescription>
                Explore the various career opportunities available in {career.title.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="roles-grid">
                {career.data["Opportunities and Roles"].map((role, index) => (
                  <span key={index} className="role-badge">
                    {role}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="career-section-card">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>
                Curated resources to help you start and advance your career
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(career.data.Resources).map(([category, resources]) => {
                  const ResourceIcon = resourceIcons[category as keyof typeof resourceIcons];
                  const isOpen = expandedSections.includes(category);
                  
                  return (
                    <div key={category} className="resource-category">
                      <Collapsible open={isOpen} onOpenChange={() => toggleSection(category)}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between resource-category-btn"
                          >
                            <div className="flex items-center">
                              <ResourceIcon className="w-4 h-4 mr-2 text-blue-600" />
                              <span className="font-medium">{category}</span>
                              <span className="ml-2 text-sm text-gray-500">({resources.length})</span>
                            </div>
                            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent className="mt-2 space-y-2 pl-6">
                          {resources.map((resource, index) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="resource-link"
                            >
                              <span>{resource.title}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="career-section-card">
            <CardHeader>
              <CardTitle>Industry Insights</CardTitle>
              <CardDescription>
                Key insights about the {career.title.toLowerCase()} industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="insights-card">
                <p className="text-gray-700 leading-relaxed">{career.data.Insights}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CareerDetails;
