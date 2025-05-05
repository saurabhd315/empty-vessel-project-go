
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold">
            BlankProject
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Documentation
          </a>
          <Button variant="outline" size="sm" className="flex items-center">
            <Github className="mr-2 h-4 w-4" />
            GitHub
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
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Documentation
          </a>
          <Button variant="outline" size="sm" className="flex items-center justify-center w-full">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </nav>
      )}
    </header>
  );
};
