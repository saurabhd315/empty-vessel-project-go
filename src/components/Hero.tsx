
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import "./Hero.css";
export const Hero = () => {
  return <section className="hero-section">
      <div className="hero-background"></div>
      <div className="container mx-auto px-4 md:py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-left mb-6 md:mb-0 md:pr-8">
            <span className="text-sm uppercase tracking-wider text-primary-badge font-semibold">Your Career Advancement Platform</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text skill-journey-gradient">
              Build Your Dream Career
            </h1>
            <p className="text-xl mb-6">
              Embark on a personalized journey to master in-demand skills, connect with industry experts, and unlock your professional potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="journey-button create-journey-button">
                Start Your Journey <ArrowRight className="ml-2 h-4 w-4 button-icon" />
              </Button>
              <div className="watch-link">
                <Play className="mr-2 h-4 w-4 watch-icon" /> Watch how it works
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="hero-image-container">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" alt="Students collaborating on career skills" className="rounded-lg shadow-xl" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="#0778b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold">10,000+</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Success stories</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-bold text-sm">Trusted by</p>
                    <p className="font-bold text-blue-600">500+ Companies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
