
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, ExternalLink } from "lucide-react";
import "./JsonCard.css";

interface JsonCardProps {
  data: any;
  title?: string;
  className?: string;
}

export const JsonCard: React.FC<JsonCardProps> = ({ 
  data, 
  title = "Data Card", 
  className = "" 
}) => {
  const renderValue = (value: any, key: string): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400">N/A</span>;
    }

    if (typeof value === "string") {
      // Check if it's a URL
      if (value.startsWith("http")) {
        return (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="json-card-link"
          >
            {value} <ExternalLink size={12} />
          </a>
        );
      }
      return <span className="json-card-text">{value}</span>;
    }

    if (typeof value === "number") {
      return <span className="json-card-number">{value}</span>;
    }

    if (typeof value === "boolean") {
      return (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "Yes" : "No"}
        </Badge>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div className="json-card-array">
          {value.map((item, index) => (
            <div key={index} className="json-card-array-item">
              {typeof item === "object" ? (
                <div className="json-card-nested">
                  {Object.entries(item).map(([nestedKey, nestedValue]) => (
                    <div key={nestedKey} className="json-card-nested-item">
                      <span className="json-card-nested-key">{nestedKey}:</span>
                      {renderValue(nestedValue, nestedKey)}
                    </div>
                  ))}
                </div>
              ) : (
                renderValue(item, `${key}-${index}`)
              )}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object") {
      return (
        <div className="json-card-object">
          {Object.entries(value).map(([nestedKey, nestedValue]) => (
            <div key={nestedKey} className="json-card-object-item">
              <span className="json-card-object-key">{nestedKey}:</span>
              {renderValue(nestedValue, nestedKey)}
            </div>
          ))}
        </div>
      );
    }

    return <span>{String(value)}</span>;
  };

  return (
    <Card className={`json-card ${className}`}>
      <CardHeader className="json-card-header">
        <div className="json-card-icon">
          <Briefcase size={24} />
        </div>
        <CardTitle className="json-card-title">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="json-card-content">
        {typeof data === "object" && data !== null ? (
          Object.entries(data).map(([key, value]) => (
            <div key={key} className="json-card-field">
              <label className="json-card-label">
                {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
              </label>
              <div className="json-card-value">
                {renderValue(value, key)}
              </div>
            </div>
          ))
        ) : (
          <div className="json-card-field">
            <div className="json-card-value">
              {renderValue(data, "value")}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JsonCard;
