import { CheckCircle } from "lucide-react";
import "./ValueProposition.css";
export const ValueProposition = () => {
  const benefits = [{
    title: "Personalized Career Roadmaps",
    description: "We create custom paths based on your unique goals and skills."
  }, {
    title: "Expert-Led Guidance",
    description: "Learn from industry professionals with real-world experience."
  }, {
    title: "Long-Term Career Growth",
    description: "Develop practical skills that employers are actively seeking."
  }, {
    title: "Continuous Support",
    description: "Get feedback and mentoring throughout your professional journey."
  }];
  return <section className="value-prop-section">
      <div className="container mx-auto md:py-20">
        <div className="text-center ">
          <span className="text-sm uppercase tracking-wider text-primary-badge font-semibold">Why Choose SkillJourney</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Your Path to Professional Success</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            SkillJourney offers personalized career plans tailored to your goals, expert insights from industry leaders, and 
            strategic guidance for sustainable long-term growth. We're your partner in building a fulfilling professional future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {benefits.map((benefit, index) => <div key={index} className="benefit-card">
              <div className="benefit-icon">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};