
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Users, Lightbulb } from 'lucide-react';
import { ResourceList } from './ResourceList';
import './CareerCategoryCard.css';

interface CareerCategoryCardProps {
  title: string;
  data: {
    "Opportunities and Roles": string[];
    "Resources": {
      [key: string]: Array<{
        title: string;
        url: string;
      }>;
    };
    "Insights": string;
  };
  isExpanded: boolean;
  onToggleExpansion: () => void;
}

export const CareerCategoryCard: React.FC<CareerCategoryCardProps> = ({
  title,
  data,
  isExpanded,
  onToggleExpansion
}) => {
  return (
    <Card className="career-category-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Explore opportunities, resources, and insights in {title.toLowerCase()}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpansion}
            className="career-expand-button"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>

      <Collapsible open={isExpanded}>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Opportunities and Roles Section */}
            <div className="opportunities-section">
              <div className="flex items-center mb-3">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Opportunities and Roles
                </h3>
              </div>
              <div className="roles-grid">
                {data["Opportunities and Roles"].map((role, index) => (
                  <div key={index} className="role-tag">
                    {role}
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <div className="resources-section">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resources
              </h3>
              <div className="resources-grid">
                {Object.entries(data.Resources).map(([categoryName, resources]) => (
                  <ResourceList
                    key={categoryName}
                    title={categoryName}
                    resources={resources}
                  />
                ))}
              </div>
            </div>

            {/* Insights Section */}
            <div className="insights-section">
              <div className="flex items-start mb-3">
                <Lightbulb className="h-5 w-5 text-yellow-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Industry Insights
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {data.Insights}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
