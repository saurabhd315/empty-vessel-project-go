
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import "./Index.css";

const Index = () => {
  const courses = [
    {
      title: "Web Development",
      description: "Master HTML, CSS, JavaScript and modern frameworks",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=500"
    },
    {
      title: "Data Science",
      description: "Learn Python, statistics, machine learning and AI",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500"
    },
    {
      title: "Digital Marketing",
      description: "Develop expertise in SEO, SEM, and social media marketing",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <main className="flex-1">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Courses</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Begin your journey with our most in-demand courses designed to help you master industry-relevant skills.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <Card key={index} className="course-card">
                  <div className="course-image-container">
                    <img src={course.image} alt={course.title} className="course-image" />
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <Button variant="outline" className="course-button">
                      View Course <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button size="lg" className="primary-button">
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="stats-container">
                <div className="grid grid-cols-2 gap-6">
                  <div className="stat-card">
                    <h3 className="stat-number">50+</h3>
                    <p className="stat-label">Expert Instructors</p>
                  </div>
                  <div className="stat-card">
                    <h3 className="stat-number">200+</h3>
                    <p className="stat-label">Courses Available</p>
                  </div>
                  <div className="stat-card">
                    <h3 className="stat-number">10k+</h3>
                    <p className="stat-label">Active Learners</p>
                  </div>
                  <div className="stat-card">
                    <h3 className="stat-number">95%</h3>
                    <p className="stat-label">Success Rate</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-4">Why Choose Skill Journey?</h2>
                <div className="space-y-4">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0778b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.5 9C9.5 8.17157 10.1716 7.5 11 7.5H13C13.8284 7.5 14.5 8.17157 14.5 9C14.5 9.82843 13.8284 10.5 13 10.5H11C10.1716 10.5 9.5 11.1716 9.5 12C9.5 12.8284 10.1716 13.5 11 13.5H13C13.8284 13.5 14.5 14.1716 14.5 15C14.5 15.8284 13.8284 16.5 13 16.5H11C10.1716 16.5 9.5 15.8284 9.5 15" stroke="#0778b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 7.5V6" stroke="#0778b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 18V16.5" stroke="#0778b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Affordable Pricing</h4>
                      <p className="text-gray-600">Quality education that fits your budget with flexible payment options</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16V12L14 10" stroke="#0778b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="10" stroke="#0778b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Learn at Your Pace</h4>
                      <p className="text-gray-600">Flexible learning schedule that adapts to your busy lifestyle</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7L9 18L4 13" stroke="#0778b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Industry-Recognized Certification</h4>
                      <p className="text-gray-600">Earn credentials that employers value and recognize</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-2">Ready to Start Your Learning Journey?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join thousands of learners who have transformed their careers with Skill Journey.
            </p>
            <Button size="lg" className="primary-button">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
