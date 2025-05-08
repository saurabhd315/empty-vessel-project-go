
import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
  const sectionRefs = useRef<HTMLElement[]>([]);

  const addSectionRef = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const checkVisibility = () => {
    sectionRefs.current.forEach(section => {
      const rect = section.getBoundingClientRect();
      const isInView = (
        rect.top <= (window.innerHeight * 0.75) && 
        rect.bottom >= 0
      );
      
      if (isInView) {
        section.classList.add('active');
      }
    });
  };

  useEffect(() => {
    // Initial check
    setTimeout(checkVisibility, 100);
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
    
    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);

  return { addSectionRef };
};
