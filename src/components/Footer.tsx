
import { Github, Twitter, Linkedin, Instagram, FacebookIcon } from "lucide-react";
import "./Footer.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 footer-grid">
          <div className="col-span-1 md:col-span-2 footer-brand">
            <h3 className="text-2xl font-bold text-blue-logo mb-4">SkillJourney</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Building the bridge between your potential and professional success through personalized career development.
            </p>
            <div className="flex space-x-4 social-links">
              <a href="#" className="social-icon-link" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="social-icon-link" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="social-icon-link" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="social-icon-link" aria-label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="social-icon-link" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="#" className="footer-link">About</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Career Guides</a></li>
              <li><a href="#" className="footer-link">Success Stories</a></li>
              <li><a href="#" className="footer-link">Skill Assessments</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">© {currentYear} SkillJourney. All rights reserved.</p>
            <div className="footer-policies">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Cookie Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
