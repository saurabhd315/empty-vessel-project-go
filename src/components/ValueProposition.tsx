
import { CheckCircle } from "lucide-react";
import "./ValueProposition.css";

export const ValueProposition = () => {
  const benefits = [
    {
      title: "Personalized Career Roadmaps",
      description: "Get a custom roadmap tailored to your goals and current skill level"
    },
    {
      title: "Expert-Led Training",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      title: "Job-Ready Skills",
      description: "Develop practical skills that employers are actively seeking"
    }
  ];

  return (
    <section className="value-prop-section">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-primary-badge font-semibold">Why Choose SkillJourney</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Accelerate Your Career Growth</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine personalized learning paths, industry expertise, and career coaching to help you achieve your professional goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
