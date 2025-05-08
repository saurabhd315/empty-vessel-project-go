
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import "./ScrollToTop.css";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div 
      className={`scroll-to-top ${isVisible ? "visible" : ""}`} 
      onClick={scrollToTop}
      role="button"
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6" />
    </div>
  );
};
