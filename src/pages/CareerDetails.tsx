import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomCareer } from "@/pages/AdminCareers";
import { hardcodedCareers } from "@/components/CareerOptions";
import "./CareerDetails.css";

type CategoryResource = {
  title: string;
  url: string;
};

type CareerCategory = {
  id: string;
  name: string;
  opportunities: string[];
  resources: {
    "Educational Resources": CategoryResource[];
    "Online Courses": CategoryResource[];
    "Industry Blogs": CategoryResource[];
    "Professional Networks": CategoryResource[];
  };
  insights: string;
};

const CareerDetails = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const [careerData, setCareerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCareerData = () => {
      // Check if it's a hardcoded career
      if (careerId?.startsWith('hardcoded-')) {
        // Extract parent and subcategory from the career ID
        const idParts = careerId.replace('hardcoded-', '').split('-');
        
        // Handle different ID formats
        let parentCategory = '';
        let subCategory = '';
        
        if (idParts.includes('and')) {
          // Handle "arts-and-humanities" case
          const andIndex = idParts.indexOf('and');
          parentCategory = idParts.slice(0, andIndex + 2).join(' ');
          subCategory = idParts.slice(andIndex + 2).join(' ');
        } else if (idParts.includes('health') && idParts.includes('medicine')) {
          // Handle "health-and-medicine" case
          const healthIndex = idParts.indexOf('health');
          const medicineIndex = idParts.indexOf('medicine');
          parentCategory = idParts.slice(healthIndex, medicineIndex + 1).join(' ');
          subCategory = idParts.slice(medicineIndex + 1).join(' ');
        } else {
          // Handle other cases like "technology-software-development"
          parentCategory = idParts[0];
          subCategory = idParts.slice(1).join(' ');
        }
        
        // Convert to proper case
        parentCategory = parentCategory.replace(/\b\w/g, l => l.toUpperCase());
        subCategory = subCategory.replace(/\b\w/g, l => l.toUpperCase());
        
        // Find the career data
        const foundHardcodedCareer = hardcodedCareers[parentCategory as keyof typeof hardcodedCareers]?.[subCategory];
        
        if (foundHardcodedCareer) {
          setCareerData({
            title: subCategory,
            description: foundHardcodedCareer.Insights,
            opportunities: foundHardcodedCareer["Opportunities and Roles"],
            resources: foundHardcodedCareer.Resources,
            isHardcoded: true
          });
        }
      }
      // Check if it's a category career
      else if (careerId?.startsWith('category-')) {
        const storedCategories = localStorage.getItem("careerCategories");
        if (storedCategories) {
          const categories: CareerCategory[] = JSON.parse(storedCategories);
          const foundCategory = categories.find(category => category.id === careerId);
          if (foundCategory) {
            setCareerData({
              title: foundCategory.name,
              description: foundCategory.insights,
              opportunities: foundCategory.opportunities,
              resources: foundCategory.resources,
              isCategory: true
            });
          }
        }
      }
      // Check if it's a custom career
      else if (careerId?.startsWith('custom-')) {
        const storedCareers = localStorage.getItem("customCareers");
        if (storedCareers) {
          const customCareers: CustomCareer[] = JSON.parse(storedCareers);
          const foundCareer = customCareers.find(career => career.id === careerId);
          if (foundCareer) {
            setCareerData(foundCareer);
          }
        }
      } else {
        // For demo purposes, we're using hardcoded data for default careers
        // In a real app, this would come from an API
        const defaultCareers = {
          "software-developer": {
            title: "Software Developer",
            description: "Software developers design, build, and maintain computer programs. They may focus on creating consumer applications, such as desktop or mobile apps, or specialized software for businesses and organizations.",
            salary: "₹5-25 LPA",
            skills: ["Programming", "Problem Solving", "Logical Thinking", "Teamwork"],
            education: "B.Tech/BE in Computer Science or similar field",
            jobOutlook: "Excellent growth prospects as India continues to be a global IT hub"
          },
          "fashion-designer": {
            title: "Fashion Designer",
            description: "Fashion designers create clothing, accessories, and footwear. They sketch designs, select fabrics and patterns, and give instructions on how to make the products they designed.",
            salary: "₹3-15 LPA",
            skills: ["Creativity", "Drawing", "Textile Knowledge", "Trend Analysis"],
            education: "Degree in Fashion Design or related field",
            jobOutlook: "Growing industry with opportunities in retail, export, and online fashion"
          },
          "psychologist": {
            title: "Psychologist",
            description: "Psychologists study cognitive, emotional, and social processes and behavior by observing, interpreting, and recording how people relate to one another and to their environments.",
            salary: "₹4-12 LPA",
            skills: ["Empathy", "Communication", "Analysis", "Patience"],
            education: "Master's or Doctorate in Psychology",
            jobOutlook: "Growing awareness of mental health is creating more opportunities"
          },
          "hr-manager": {
            title: "HR Manager",
            description: "Human Resources Managers plan, direct, and coordinate the administrative functions of an organization. They oversee recruiting, interviewing, and hiring of new staff.",
            salary: "₹6-18 LPA",
            skills: ["Communication", "Organization", "Negotiation", "Empathy"],
            education: "Bachelor's degree in Human Resources or Business Administration",
            jobOutlook: "Steady demand across all industries and sectors"
          },
          "teacher": {
            title: "Teacher",
            description: "Teachers instruct students in a broad range of subjects, from basic skills like reading and mathematics to advanced topics in science, humanities, and technical fields.",
            salary: "₹3-12 LPA",
            skills: ["Communication", "Patience", "Organization", "Adaptability"],
            education: "Bachelor's degree with B.Ed or Master's in Education",
            jobOutlook: "Consistent demand with growth in private education sector"
          },
          "financial-analyst": {
            title: "Financial Analyst",
            description: "Financial analysts guide businesses and individuals in decisions about expending money to attain profit. They assess the performance of stocks, bonds, and other investments.",
            salary: "₹7-20 LPA",
            skills: ["Analytical Thinking", "Mathematics", "Communication", "Research"],
            education: "Bachelor's degree in Finance, Economics, or Accounting",
            jobOutlook: "Strong growth as businesses expand and need investment guidance"
          }
        };

        if (careerId && careerId in defaultCareers) {
          setCareerData(defaultCareers[careerId as keyof typeof defaultCareers]);
        }
      }
      setLoading(false);
    };

    fetchCareerData();
  }, [careerId]);

  if (loading) {
    return (
      <div className="career-details-container">
        <div className="loading">Loading career details...</div>
      </div>
    );
  }

  if (!careerData) {
    return (
      <div className="career-details-container">
        <div className="not-found">
          <h2>Career Not Found</h2>
          <p>The career you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="career-details-page">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="back-link">
          <Button variant="outline" className="back-button">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Button>
        </Link>
        
        <div className="career-header" style={{ backgroundColor: careerData.color || "#D3E4FD" }}>
          <h1 className="career-title">{careerData.title}</h1>
          {careerData.salary && <div className="career-salary">{careerData.salary}</div>}
        </div>
        
        <div className="career-content">
          <div className="career-description">
            <h2>About This Career</h2>
            <p>{careerData.description || "No description available yet."}</p>
          </div>
          
          {careerData.opportunities && (
            <div className="career-opportunities">
              <h2>Opportunities and Roles</h2>
              <ul>
                {careerData.opportunities.map((opportunity: string, index: number) => (
                  <li key={index}>{opportunity}</li>
                ))}
              </ul>
            </div>
          )}
          
          {careerData.resources && (
            <div className="career-resources">
              <h2>Resources</h2>
              {Object.entries(careerData.resources).map(([resourceType, resources]: [string, any]) => (
                <div key={resourceType} className="resource-section">
                  <h3>{resourceType}</h3>
                  <ul>
                    {resources.map((resource: CategoryResource, index: number) => (
                      <li key={index}>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          
          {careerData.skills && (
            <div className="career-skills">
              <h2>Key Skills Required</h2>
              <ul>
                {careerData.skills.map((skill: string) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
          
          {careerData.education && (
            <div className="career-education">
              <h2>Education Requirements</h2>
              <p>{careerData.education}</p>
            </div>
          )}
          
          {careerData.jobOutlook && (
            <div className="career-outlook">
              <h2>Job Outlook in India</h2>
              <p>{careerData.jobOutlook}</p>
            </div>
          )}
          
          <div className="career-cta">
            <h2>Ready to Explore This Career Path?</h2>
            <div className="cta-buttons">
              <Link to="/journey">
                <Button className="journey-button">Start Your Career Journey</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetails;
