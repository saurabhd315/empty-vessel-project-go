
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, ExternalLink, Users, BookOpen, Globe, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./CareerDetailCard.css";

interface Resource {
  title: string;
  url: string;
}

interface CareerData {
  "Opportunities and Roles": string[];
  Resources: {
    "Educational Resources": Resource[];
    "Online Courses": Resource[];
    "Industry Blogs": Resource[];
    "Professional Networks": Resource[];
  };
  Insights: string;
}

interface CareerDetailCardProps {
  title: string;
  data: CareerData;
  icon: React.ComponentType<any>;
  color: string;
}

const resourceIcons = {
  "Educational Resources": BookOpen,
  "Online Courses": Globe,
  "Industry Blogs": ExternalLink,
  "Professional Networks": Network
};

export const CareerDetailCard = ({ title, data, icon: IconComponent, color }: CareerDetailCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <Card className="career-detail-card">
      <CardHeader className="career-detail-header">
        <div className={`career-detail-icon ${color}`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
        <CardDescription className="text-gray-600">
          Explore opportunities, resources, and insights
        </CardDescription>
      </CardHeader>
      
      <CardContent className="career-detail-content">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full mb-4 career-expand-btn">
              {isExpanded ? "Hide Details" : "View Details"}
              {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-6">
            {/* Opportunities and Roles */}
            <div className="career-section">
              <div className="flex items-center mb-3">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Opportunities and Roles</h4>
              </div>
              <div className="roles-grid">
                {data["Opportunities and Roles"].map((role, index) => (
                  <span key={index} className="role-badge">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="career-section">
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <div className="space-y-4">
                {Object.entries(data.Resources).map(([category, resources]) => {
                  const ResourceIcon = resourceIcons[category as keyof typeof resourceIcons];
                  const isOpen = expandedSections.includes(category);
                  
                  return (
                    <div key={category} className="resource-category">
                      <Button
                        variant="ghost"
                        onClick={() => toggleSection(category)}
                        className="w-full justify-between resource-category-btn"
                      >
                        <div className="flex items-center">
                          <ResourceIcon className="w-4 h-4 mr-2 text-blue-600" />
                          <span className="font-medium">{category}</span>
                          <span className="ml-2 text-sm text-gray-500">({resources.length})</span>
                        </div>
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      
                      {isOpen && (
                        <div className="mt-2 space-y-2 pl-6">
                          {resources.map((resource, index) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="resource-link"
                            >
                              <span>{resource.title}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insights */}
            <div className="career-section">
              <h4 className="font-semibold text-gray-900 mb-3">Industry Insights</h4>
              <div className="insights-card">
                <p className="text-gray-700 leading-relaxed">{data.Insights}</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
