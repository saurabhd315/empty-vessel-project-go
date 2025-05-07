
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CounsellorsCarousel } from "@/components/CounsellorsCarousel";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import "./Index.css";
import "../styles/responsive.css";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <CounsellorsCarousel />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
