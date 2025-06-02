
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Stethoscope, PaintBrush } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CTA.css";

export const CTA = () => {
  const [showSampleJourneys, setShowSampleJourneys] = useState(false);
  const navigate = useNavigate();

  const sampleJourneys = [
    {
      id: "engineer",
      title: "Software Engineer",
      description: "From coding bootcamp to senior developer role at top tech companies",
      icon: <Code className="h-8 w-8" />,
      color: "from-blue-500 to-blue-600",
      skills: ["Programming", "Problem Solving", "System Design"],
      timeline: "2-4 years"
    },
    {
      id: "doctor",
      title: "Medical Doctor",
      description: "From pre-med studies to practicing physician specializing in your chosen field",
      icon: <Stethoscope className="h-8 w-8" />,
      color: "from-green-500 to-green-600",
      skills: ["Medical Knowledge", "Patient Care", "Diagnosis"],
      timeline: "8-12 years"
    },
    {
      id: "designer",
      title: "UX/UI Designer",
      description: "From creative passion to designing user experiences for leading brands",
      icon: <PaintBrush className="h-8 w-8" />,
      color: "from-purple-500 to-purple-600",
      skills: ["Design Thinking", "User Research", "Prototyping"],
      timeline: "1-3 years"
    }
  ];

  const handleJourneyClick = (journeyId: string) => {
    navigate(`/journey?demo=${journeyId}`);
  };

  return (
    <section className="cta-section">
      <div className="container mx-auto px-4 md:py-2">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white cta-heading">Your Journey Map</h2>
            <p className="text-lg text-white/90 mb-8 max-w-lg cta-text">
              Visualize your career progression with our personalized journey map. Track your skills, milestones, and future opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 cta-buttons mt-8">
              <Button size="lg" className="cta-button touch-target">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="cta-button-outline touch-target"
                onClick={() => setShowSampleJourneys(!showSampleJourneys)}
              >
                {showSampleJourneys ? "Hide Sample Journeys" : "View Sample Journeys"}
              </Button>
            </div>

            {showSampleJourneys && (
              <div className="sample-journeys-container">
                {sampleJourneys.map((journey) => (
                  <div 
                    key={journey.id}
                    className="sample-journey-card"
                    onClick={() => handleJourneyClick(journey.id)}
                  >
                    <div className={`journey-card-header bg-gradient-to-r ${journey.color}`}>
                      <div className="journey-icon">
                        {journey.icon}
                      </div>
                      <div className="journey-info">
                        <h3 className="journey-title">{journey.title}</h3>
                        <p className="journey-timeline">{journey.timeline}</p>
                      </div>
                    </div>
                    <div className="journey-card-body">
                      <p className="journey-description">{journey.description}</p>
                      <div className="journey-skills">
                        <span className="skills-label">Key Skills:</span>
                        <div className="skills-list">
                          {journey.skills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="hidden md:block cta-image-container">
            <img src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=500" alt="Career growth" className="cta-image" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};
