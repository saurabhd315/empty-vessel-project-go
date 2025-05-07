
import { Star, Users, GraduationCap, Award } from "lucide-react";
import "./Features.css";

export const Features = () => {
  const features = [
    {
      icon: <GraduationCap />,
      title: "Skill Assessment",
      description: "Take our comprehensive skill assessment to identify your strengths and areas for improvement."
    },
    {
      icon: <Star />,
      title: "Custom Learning Paths",
      description: "Get a tailored learning path based on your career goals and current skill level."
    },
    {
      icon: <Users />,
      title: "Mentorship Network",
      description: "Connect with industry experts who provide guidance and advice throughout your journey."
    },
    {
      icon: <Award />,
      title: "Certification",
      description: "Earn industry-recognized certifications that validate your expertise to employers."
    }
  ];

  return (
    <section className="features-section">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm uppercase tracking-wider text-primary-badge font-semibold">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">Everything You Need to Succeed</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our platform provides all the tools, resources, and support you need to build your dream career.
            </p>
            
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="features-image-container">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800" 
              alt="SkillJourney platform interface" 
              className="rounded-lg shadow-xl features-image"
            />
            <div className="feature-stat-card feature-stat-card-1">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-blue-600">93%</h4>
                <p className="text-sm">Career advancement rate</p>
              </div>
            </div>
            <div className="feature-stat-card feature-stat-card-2">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-blue-600">4.8/5</h4>
                <p className="text-sm">User satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
