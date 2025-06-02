
import React, { useState } from 'react';
import { CareerCategoryCard } from '@/components/CareerCategoryCard';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CareerExplorer.css';

// Sample career data - you can replace this with your actual JSON
const careerData = {
  "Career Development": {
    "Technology": {
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
    }
  }
};

const CareerExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Extract technology data from the nested structure
  const technologyData = careerData["Career Development"]["Technology"];
  
  // Filter technologies based on search term
  const filteredTechnologies = Object.entries(technologyData).filter(([techName]) =>
    techName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCardExpansion = (techName: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(techName)) {
        newSet.delete(techName);
      } else {
        newSet.add(techName);
      }
      return newSet;
    });
  };

  return (
    <div className="career-explorer-page">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Explore Career Options in India
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Discover opportunities, resources, and insights across different technology domains. 
            Find your path in the ever-evolving tech landscape.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search technologies..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Technology Cards Grid */}
        <div className="space-y-6 mb-8">
          {filteredTechnologies.map(([techName, techData]) => (
            <CareerCategoryCard
              key={techName}
              title={techName}
              data={techData}
              isExpanded={expandedCards.has(techName)}
              onToggleExpansion={() => toggleCardExpansion(techName)}
            />
          ))}
        </div>

        {/* No Results Message */}
        {filteredTechnologies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">
              No technologies found matching "{searchTerm}". Try a different search term.
            </p>
          </div>
        )}

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerExplorer;
