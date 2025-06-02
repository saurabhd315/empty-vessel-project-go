
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Stethoscope, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import "./SampleJourneys.css";

const SampleJourneys = () => {
  const journeys = [
    {
      id: "engineer",
      title: "Software Engineer",
      description: "From coding bootcamp to senior developer, explore the technical journey of building innovative software solutions.",
      icon: Code,
      color: "bg-blue-500",
      route: "/journey?demo=engineer"
    },
    {
      id: "doctor",
      title: "Medical Doctor",
      description: "Navigate the path from medical school to specialized practice, making a difference in patients' lives.",
      icon: Stethoscope,
      color: "bg-green-500",
      route: "/journey?demo=doctor"
    },
    {
      id: "ca",
      title: "Chartered Accountant",
      description: "Master financial expertise from entry-level to partnership, becoming a trusted business advisor.",
      icon: Calculator,
      color: "bg-purple-500",
      route: "/journey?demo=ca"
    }
  ];

  return (
    <div className="sample-journeys-page">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Sample Career Journeys
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore different career paths and see how professionals progress through their journeys. 
            Click on any card to view a detailed journey map.
          </p>
        </div>

        <div className="journeys-grid">
          {journeys.map((journey) => {
            const IconComponent = journey.icon;
            return (
              <Card key={journey.id} className="journey-card">
                <CardHeader className="text-center">
                  <div className={`journey-icon ${journey.color}`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {journey.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    {journey.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button asChild className="journey-button">
                    <Link to={journey.route}>
                      View Journey <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SampleJourneys;
