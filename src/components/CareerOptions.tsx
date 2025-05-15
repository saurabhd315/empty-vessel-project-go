
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Code, Palette, Brain, Users, GraduationCap, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import "./CareerOptions.css";
type Career = {
  id: string;
  title: string;
  teaser: string;
  icon: JSX.Element;
  industry: string;
  color: string;
};
export const CareerOptions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const careers: Career[] = [{
    id: "software-developer",
    title: "Software Developer",
    teaser: "Design digital experiences",
    icon: <Code size={30} />,
    industry: "Technology",
    color: "#D3E4FD"
  }, {
    id: "fashion-designer",
    title: "Fashion Designer",
    teaser: "Create trends that inspire",
    icon: <Palette size={30} />,
    industry: "Design",
    color: "#FFDEE2"
  }, {
    id: "psychologist",
    title: "Psychologist",
    teaser: "Shape minds and futures",
    icon: <Brain size={30} />,
    industry: "Healthcare",
    color: "#E5DEFF"
  }, {
    id: "hr-manager",
    title: "HR Manager",
    teaser: "Build strong organizations",
    icon: <Users size={30} />,
    industry: "Business",
    color: "#FDE1D3"
  }, {
    id: "teacher",
    title: "Teacher",
    teaser: "Inspire the next generation",
    icon: <GraduationCap size={30} />,
    industry: "Education",
    color: "#F2FCE2"
  }, {
    id: "financial-analyst",
    title: "Financial Analyst",
    teaser: "Shape economic futures",
    icon: <Briefcase size={30} />,
    industry: "Finance",
    color: "#FEF7CD"
  }];
  const industries = Array.from(new Set(careers.map(career => career.industry)));
  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) || career.teaser.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = !industryFilter || career.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });
  return <section className="career-options-section section-spacing">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-6">
          Explore Career Options in India
        </h2>
        
        <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
          Discover diverse career paths tailored for the Indian job market and find guidance to achieve your professional goals.
        </p>
        
        <div className="search-filter-container">
          <div className="search-container">
            <input 
              type="text"
              className="search-input"
              placeholder="Search careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-container" ref={filterRef}>
            <button 
              className="filter-button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {industryFilter || "All Industries"}
              <ChevronDown size={18} />
            </button>
            
            {isFilterOpen && <div className="filter-dropdown">
                <div className={`filter-option ${!industryFilter ? 'selected' : ''}`} onClick={() => {
              setIndustryFilter("");
              setIsFilterOpen(false);
            }}>
                  All Industries
                </div>
                {industries.map(industry => <div key={industry} className={`filter-option ${industryFilter === industry ? 'selected' : ''}`} onClick={() => {
              setIndustryFilter(industry);
              setIsFilterOpen(false);
            }}>
                    {industry}
                  </div>)}
              </div>}
          </div>
        </div>
        
        <div className="career-grid">
          <AnimatePresence>
            {filteredCareers.map((career, index) => <motion.div key={career.id} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            scale: 0.95
          }} transition={{
            duration: 0.3,
            delay: index * 0.1
          }} className="career-card-container">
                <Link to={`/careers/${career.id}`} className="career-card" style={{
              backgroundColor: career.color
            }}>
                  <div className="career-icon" style={{
                color: "#0778b6"
              }}>
                    {career.icon}
                  </div>
                  <h3 className="career-title">{career.title}</h3>
                  <p className="career-teaser">{career.teaser}</p>
                  <span className="learn-more">Learn More</span>
                </Link>
              </motion.div>)}
          </AnimatePresence>
        </div>
      </div>
    </section>;
};
