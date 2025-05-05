
import { Button } from "@/components/ui/button";
import { useState } from "react";
import "./Navbar.css";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b navbar-container">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold skill-journey-logo">
            SkillJourney
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#" className="nav-link">
            Courses
          </a>
          <a href="#" className="nav-link">
            Resources
          </a>
          <a href="#" className="nav-link">
            About Us
          </a>
          <Button variant="outline" size="sm" className="primary-button-outline">
            Sign In
          </Button>
          <Button size="sm" className="primary-button">
            Get Started
          </Button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="h-6 w-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden px-4 py-4 border-t flex flex-col space-y-4">
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#" className="nav-link">
            Courses
          </a>
          <a href="#" className="nav-link">
            Resources
          </a>
          <a href="#" className="nav-link">
            About Us
          </a>
          <Button variant="outline" size="sm" className="primary-button-outline w-full">
            Sign In
          </Button>
          <Button size="sm" className="primary-button w-full">
            Get Started
          </Button>
        </nav>
      )}
    </header>
  );
};
