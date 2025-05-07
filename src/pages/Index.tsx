
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CounsellorsFlipGrid } from "@/components/CounsellorsFlipGrid";
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
      <CounsellorsFlipGrid />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
