
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import "./Footer.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-section">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-logo mb-4">SkillJourney</h3>
            <p className="text-gray-600 mb-4 max-w-md">
              Building the bridge between your potential and professional success through personalized career development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="social-icon-link">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="social-icon-link">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="social-icon-link">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="social-icon-link">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Our Team</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">Guides</a></li>
              <li><a href="#" className="footer-link">Success Stories</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© {currentYear} SkillJourney. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
