
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, BookOpen, Globe, Newspaper, Users } from 'lucide-react';
import './ResourceList.css';

interface Resource {
  title: string;
  url: string;
}

interface ResourceListProps {
  title: string;
  resources: Resource[];
}

export const ResourceList: React.FC<ResourceListProps> = ({ title, resources }) => {
  const getIconForCategory = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('educational')) return BookOpen;
    if (name.includes('course')) return Globe;
    if (name.includes('blog')) return Newspaper;
    if (name.includes('network')) return Users;
    return BookOpen; // Default icon
  };

  const IconComponent = getIconForCategory(title);

  return (
    <Card className="resource-list-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
          <IconComponent className="h-4 w-4 mr-2 text-blue-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {resources.map((resource, index) => (
            <li key={index}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
              >
                <span className="resource-title">{resource.title}</span>
                <ExternalLink className="h-3 w-3 text-gray-400" />
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
