
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./CTA.css";

export const CTA = () => {
  return <section className="cta-section">
      <div className="container mx-auto px-4 md:py-2">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white cta-heading">Your Journey Map</h2>
            <p className="text-lg text-white/90 mb-8 max-w-lg cta-text">
              Visualize your career progression with our personalized journey map. Track your skills, milestones, and future opportunities.
            </p>
            <div className="journey-preview">
              <div className="journey-step completed">
                <div className="step-marker">1</div>
                <div className="step-content">
                  <h4>Skill Assessment</h4>
                </div>
              </div>
              <div className="journey-step completed">
                <div className="step-marker">2</div>
                <div className="step-content">
                  <h4>Career Matching</h4>
                </div>
              </div>
              <div className="journey-step current">
                <div className="step-marker">3</div>
                <div className="step-content">
                  <h4>Training Plan</h4>
                </div>
              </div>
              <div className="journey-step">
                <div className="step-marker">4</div>
                <div className="step-content">
                  <h4>Job Placement</h4>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 cta-buttons mt-8">
              <Button size="lg" className="cta-button touch-target">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="cta-button-outline touch-target" asChild>
                <Link to="/journey">View Full Journey</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block cta-image-container">
            <img src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=500" alt="Career growth" className="cta-image" loading="lazy" />
          </div>
        </div>
      </div>
    </section>;
};
