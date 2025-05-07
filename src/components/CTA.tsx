
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import "./CTA.css";

export const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Start Your Career Journey?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-lg">
              Join thousands of professionals who have accelerated their careers with SkillJourney's personalized approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="cta-button">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="cta-button-outline">
                Schedule Demo
              </Button>
            </div>
          </div>
          <div className="hidden md:block cta-image-container">
            <img 
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=500" 
              alt="Career growth" 
              className="cta-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
