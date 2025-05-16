
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return <header className="border-b navbar-container">
      <div className="container mx-auto navbar-inner">
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold skill-journey-logo flex items-center">
              <img src="/lovable-uploads/57a7e9ce-01cc-4075-8145-56b269c7f4a7.png" alt="Skill Journey Logo" className="h-10" loading="lazy" />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#" className="nav-link active">
              Home
            </a>
            <a href="#" className="nav-link">
              Portfolio
            </a>
            <a href="#" className="nav-link">
              Resume Builder
            </a>
            <a href="#" className="nav-link">
              Trainings
            </a>
            <a href="#" className="nav-link">
              Counselling
            </a>
            <a href="#" className="nav-link">
              Blog
            </a>
            <a href="#" className="nav-link">
              About
            </a>
            {!isHomePage && (
              <a href="/admin/careers" className="nav-link">
                Manage Careers
              </a>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden mobile-menu-button" onClick={toggleMobileMenu} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && <nav className="md:hidden py-2 px-4 border-t flex flex-col space-y-0 mobile-menu">
            <a href="#" className="mobile-nav-link nav-link active">
              Home
            </a>
            <a href="#" className="mobile-nav-link nav-link">
              Portfolio
            </a>
            <a href="#" className="mobile-nav-link nav-link">
              Resume Builder
            </a>
            <a href="#" className="mobile-nav-link nav-link">
              Trainings
            </a>
            <a href="#" className="mobile-nav-link nav-link">
              Counselling
            </a>
            <a href="#" className="mobile-nav-link nav-link">
              Blog
            </a>
            <a href="#" className="mobile-nav-link nav-link">
              About
            </a>
            {!isHomePage && (
              <a href="/admin/careers" className="mobile-nav-link nav-link">
                Manage Careers
              </a>
            )}
          </nav>}
      </div>
    </header>;
};
