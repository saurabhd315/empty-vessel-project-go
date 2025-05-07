import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import "./Testimonials.css";
export const Testimonials = () => {
  const testimonials = [{
    quote: "SkillJourney helped me transition from a junior developer to a senior role in just 8 months. The personalized roadmap and mentor guidance made all the difference.",
    author: "Alex Johnson",
    title: "Senior Software Engineer",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  }, {
    quote: "I was stuck in my career for years. SkillJourney helped me identify the skills I needed to advance and provided a clear path to achieve my goals.",
    author: "Maya Patel",
    title: "Marketing Manager",
    company: "BrandGrowth",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  }];
  return <section className="testimonials-section">
      <div className="container mx-auto px-4  md:py-16">
        <div className="text-center">
          <span className="text-sm uppercase tracking-wider text-primary-badge font-semibold">Success Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from professionals who transformed their careers with SkillJourney.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {testimonials.map((testimonial, index) => <div key={index} className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author-container">
                <img src={testimonial.image} alt={testimonial.author} className="testimonial-author-image" />
                <div>
                  <h4 className="testimonial-author-name">{testimonial.author}</h4>
                  <p className="testimonial-author-title">{testimonial.title}, {testimonial.company}</p>
                </div>
              </div>
            </div>)}
        </div>
        
        <div className="text-center">
          <Button variant="outline" className="read-more-testimonials-button">
            Read More Testimonials <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>;
};