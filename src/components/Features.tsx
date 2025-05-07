
import { User, Search, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./Features.css";

export const Features = () => {
  const features = [{
    icon: <User />,
    title: "Personalized Career Plans",
    description: "Receive a customized roadmap based on your unique skills, experiences, and career aspirations."
  }, {
    icon: <Search />,
    title: "Skill Gap Analysis",
    description: "Identify your strengths and improvement areas through comprehensive assessment tools."
  }, {
    icon: <Briefcase />,
    title: "Industry-Aligned Guidance",
    description: "Get advice that's relevant to current market demands and future industry trends."
  }];

  return <section className="features-section">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center ">
          <span className="text-sm uppercase tracking-wider text-primary-badge font-semibold">Key Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">Tools For Your Success</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Our platform provides everything you need to navigate your career journey with confidence and clarity.
          </p>
            
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => <div key={index} className="feature-card">
                <div className="feature-icon-container">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>)}
          </div>

          <div className="mt-10">
            <Button className="explore-features-button">
              Explore Features <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
          
        <div className="features-image-container mt-16">
          <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800" alt="SkillJourney platform interface" className="rounded-lg shadow-xl features-image" />
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
    </section>;
};
