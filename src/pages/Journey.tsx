
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import "./Journey.css";

const Journey = () => {
  const [activeStep, setActiveStep] = useState(2);
  
  const journeySteps = [
    {
      id: 0,
      title: "Skill Assessment",
      description: "Identify your current skills, strengths and areas for improvement",
      status: "completed",
      tasks: ["Self-assessment quiz", "Skill gap analysis", "Strengths identification"]
    },
    {
      id: 1,
      title: "Career Matching",
      description: "Discover career paths that align with your skills and interests",
      status: "completed",
      tasks: ["Industry exploration", "Role matching", "Salary potential research"]
    },
    {
      id: 2,
      title: "Training Plan",
      description: "Develop a customized learning path to achieve your career goals",
      status: "current",
      tasks: ["Course selection", "Training schedule", "Certification planning"]
    },
    {
      id: 3,
      title: "Job Placement",
      description: "Get support in finding and securing your ideal position",
      status: "upcoming",
      tasks: ["Resume preparation", "Interview coaching", "Job application strategy"]
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Button variant="ghost" className="mr-2" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Your Career Journey</h1>
          
          <div className="journey-timeline mb-8">
            {journeySteps.map((step) => (
              <div 
                key={step.id} 
                className={`journey-step ${step.status} ${activeStep === step.id ? 'active' : ''}`}
                onClick={() => setActiveStep(step.id)}
              >
                <div className="journey-step-marker">{step.id + 1}</div>
                <div className="journey-step-title">{step.title}</div>
              </div>
            ))}
          </div>
          
          <div className="journey-content">
            <Card className="journey-card">
              <CardHeader>
                <CardTitle>{journeySteps[activeStep].title}</CardTitle>
                <CardDescription>{journeySteps[activeStep].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="text-lg font-semibold mb-4">Key Tasks:</h4>
                <ul className="space-y-2">
                  {journeySteps[activeStep].tasks.map((task, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-blue-100 text-primary flex items-center justify-center text-xs mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      {task}
                    </li>
                  ))}
                </ul>
                
                {journeySteps[activeStep].status === "completed" && (
                  <div className="mt-6 p-3 bg-green-50 border border-green-100 rounded-lg">
                    <p className="text-green-700 text-sm">
                      You've completed this step! View your detailed report in your dashboard.
                    </p>
                  </div>
                )}
                
                {journeySteps[activeStep].status === "current" && (
                  <div className="mt-6">
                    <Button className="w-full">Continue Your Progress</Button>
                  </div>
                )}
                
                {journeySteps[activeStep].status === "upcoming" && (
                  <div className="mt-6 p-3 bg-gray-50 border border-gray-100 rounded-lg">
                    <p className="text-gray-600 text-sm">
                      This step will be unlocked once you complete your current step.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="journey-resources mt-8 grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Resources & Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      Skill Assessment Templates
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      Industry Trend Reports
                    </li>
                    <li className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                      Training Material Library
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${((activeStep + 1) / journeySteps.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.round(((activeStep + 1) / journeySteps.length) * 100)}% complete
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Journey;
