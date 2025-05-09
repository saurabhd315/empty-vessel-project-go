import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./HowItWorks.css";
export const HowItWorks = () => {
  const steps = [{
    number: "01",
    title: "Create Your Profile",
    description: "Input your experience, skills, and career goals to start your personalized journey."
  }, {
    number: "02",
    title: "Get Your Roadmap",
    description: "Receive a tailored career development plan based on your unique profile and industry demands."
  }, {
    number: "03",
    title: "Develop Skills",
    description: "Access curated resources to build the specific skills needed for your career advancement."
  }, {
    number: "04",
    title: "Track Progress",
    description: "Monitor your growth and adjust your path as you achieve career milestones."
  }];
  return <section className="how-it-works-section">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center ">
          <span className="text-sm uppercase tracking-wider text-primary-badge font-semibold">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined process helps you navigate your career journey with clarity and purpose.
          </p>
        </div>

        

        <div className="text-center mt-10">
          <Button variant="outline" className="learn-more-button">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>;
};