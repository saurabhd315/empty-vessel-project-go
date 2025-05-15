
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./CareerDetails.css";

export const CareerDetails = () => {
  const { careerId } = useParams();
  
  // This would normally come from a database or API
  const careerDetails = {
    "software-developer": {
      title: "Software Developer",
      description: "Software developers create applications and systems that run on computers and other devices. They apply engineering principles to build software solutions for specific problems.",
      responsibilities: [
        "Developing and maintaining software systems",
        "Writing and testing code",
        "Collaborating with cross-functional teams",
        "Debugging and troubleshooting issues",
        "Implementing new features and functionality"
      ],
      qualifications: [
        "Bachelor's degree in Computer Science or related field",
        "Proficiency in programming languages like Java, Python, or C++",
        "Problem-solving skills",
        "Knowledge of software development methodologies",
        "Experience with databases and cloud services"
      ],
      salary: "₹5,00,000 - ₹25,00,000 per year",
      growth: "High demand across industries with opportunities for specialization and advancement",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800"
    },
    "fashion-designer": {
      title: "Fashion Designer",
      description: "Fashion designers create clothing, accessories, and footwear. They sketch designs, select fabrics and patterns, and give instructions on how to make their products.",
      responsibilities: [
        "Researching current fashion trends",
        "Creating design concepts and sketches",
        "Selecting colors, fabrics, and patterns",
        "Developing prototypes of designs",
        "Presenting design ideas to clients or management"
      ],
      qualifications: [
        "Bachelor's degree in Fashion Design",
        "Creative and artistic ability",
        "Knowledge of textiles and fabrics",
        "Technical skills in pattern-making and sewing",
        "Portfolio showcasing design work"
      ],
      salary: "₹3,00,000 - ₹20,00,000 per year",
      growth: "Opportunities in retail, film, television, and starting your own label",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=800"
    },
    "psychologist": {
      title: "Psychologist",
      description: "Psychologists study cognitive, emotional, and social processes and behavior. They use their knowledge to help improve processes and behaviors for individuals and organizations.",
      responsibilities: [
        "Conducting psychological assessments",
        "Providing therapy and counseling",
        "Researching and analyzing behavior patterns",
        "Creating treatment plans",
        "Consulting with other healthcare professionals"
      ],
      qualifications: [
        "Master's or Doctoral degree in Psychology",
        "License to practice (requirements vary by state)",
        "Empathy and communication skills",
        "Analytical thinking",
        "Patience and problem-solving abilities"
      ],
      salary: "₹4,00,000 - ₹12,00,000 per year",
      growth: "Growing field with opportunities in healthcare, education, and corporate settings",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800"
    },
    "hr-manager": {
      title: "HR Manager",
      description: "Human Resources Managers oversee the administrative functions of an organization. They plan, direct, and coordinate recruitment, hiring, and employee relations.",
      responsibilities: [
        "Recruiting and staffing",
        "Compensation and benefits administration",
        "Training and development",
        "Employee relations",
        "Compliance with employment laws"
      ],
      qualifications: [
        "Bachelor's degree in Human Resources or Business",
        "Knowledge of labor laws and regulations",
        "Strong interpersonal skills",
        "Organization and multitasking abilities",
        "Problem-solving and conflict resolution skills"
      ],
      salary: "₹6,00,000 - ₹18,00,000 per year",
      growth: "Stable career with opportunities across all industries",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&q=80&w=800"
    },
    "teacher": {
      title: "Teacher",
      description: "Teachers educate students in various subjects and support their social and intellectual development. They create lesson plans, evaluate student progress, and maintain classroom discipline.",
      responsibilities: [
        "Creating and implementing lesson plans",
        "Assessing student progress",
        "Communicating with parents",
        "Adapting teaching methods to meet student needs",
        "Managing classroom activities and behavior"
      ],
      qualifications: [
        "Bachelor's degree in Education or subject area",
        "Teaching certification (requirements vary by state)",
        "Patience and adaptability",
        "Communication skills",
        "Organization and creativity"
      ],
      salary: "₹3,00,000 - ₹10,00,000 per year",
      growth: "Stable demand with opportunities in public, private, and international schools",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800"
    },
    "financial-analyst": {
      title: "Financial Analyst",
      description: "Financial analysts evaluate investment opportunities and provide guidance for businesses and individuals. They assess financial data, study economic trends, and make recommendations.",
      responsibilities: [
        "Analyzing financial data and market trends",
        "Creating financial models and forecasts",
        "Evaluating investment opportunities",
        "Preparing reports and presentations",
        "Making recommendations to management or clients"
      ],
      qualifications: [
        "Bachelor's degree in Finance, Economics, or Accounting",
        "Strong analytical and mathematical skills",
        "Knowledge of financial markets and regulations",
        "Proficiency in financial software and Excel",
        "Attention to detail and critical thinking"
      ],
      salary: "₹5,00,000 - ₹20,00,000 per year",
      growth: "Growing field with opportunities in banking, investment firms, and corporations",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
    }
  };
  
  const career = careerDetails[careerId as keyof typeof careerDetails];
  
  if (!career) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Career Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find details for the career you're looking for.</p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="career-hero-section" style={{ backgroundImage: `url(${career.image})` }}>
        <div className="overlay">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">{career.title}</h1>
          </div>
        </div>
      </div>
      
      <div className="career-content container mx-auto px-4 py-12">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to Careers</span>
        </Link>
        
        <div className="career-details mt-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-lg">{career.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="responsibilities">
              <h2 className="text-2xl font-bold mb-4">Key Responsibilities</h2>
              <ul className="list-disc pl-5">
                {career.responsibilities.map((item, index) => (
                  <li key={index} className="mb-2">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="qualifications">
              <h2 className="text-2xl font-bold mb-4">Qualifications</h2>
              <ul className="list-disc pl-5">
                {career.qualifications.map((item, index) => (
                  <li key={index} className="mb-2">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="career-outlook mb-8">
            <h2 className="text-2xl font-bold mb-4">Career Outlook</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="outlook-card">
                <h3 className="font-semibold text-lg mb-2">Salary Range</h3>
                <p className="text-xl font-bold text-[#0778b6]">{career.salary}</p>
              </div>
              <div className="outlook-card">
                <h3 className="font-semibold text-lg mb-2">Growth Opportunities</h3>
                <p>{career.growth}</p>
              </div>
            </div>
          </div>
          
          <div className="cta-section text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Ready to pursue this career?</h2>
            <p className="mb-6 max-w-2xl mx-auto">Our career counselors can help you navigate the path to becoming a successful {career.title.toLowerCase()}.</p>
            <Button size="lg">Schedule a Consultation</Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CareerDetails;
