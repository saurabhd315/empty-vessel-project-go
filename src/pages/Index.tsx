
import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CounsellorCarousel } from "@/components/CounsellorCarousel";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ParticleBackground } from "@/components/ParticleBackground";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./Index.css";
import "../styles/responsive.css";

const Index = () => {
  const { addSectionRef } = useScrollReveal();
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    howItWorks: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    counsellors: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null)
  };
  
  // Apply scroll reveal to all sections
  useEffect(() => {
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        ref.current.classList.add('scroll-reveal');
        addSectionRef(ref.current);
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      <Navbar />
      
      <div ref={sectionRefs.hero}>
        <Hero />
      </div>
      
      <div ref={sectionRefs.howItWorks}>
        <HowItWorks />
      </div>
      
      <div ref={sectionRefs.features}>
        <Features />
      </div>
      
      <div ref={sectionRefs.counsellors}>
        <CounsellorCarousel />
      </div>
      
      <div ref={sectionRefs.testimonials}>
        <Testimonials />
      </div>
      
      <div ref={sectionRefs.cta}>
        <CTA />
      </div>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
