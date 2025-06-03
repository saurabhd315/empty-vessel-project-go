
import React, { useState } from "react";
import { JsonCard } from "./JsonCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const JsonCardDemo = () => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [jsonInput, setJsonInput] = useState("");

  // Sample JSON data for demonstration
  const sampleData = {
    name: "Software Engineer",
    salary: "₹8-15 LPA",
    experience: "2-5 years",
    skills: ["JavaScript", "React", "Node.js", "TypeScript"],
    remote: true,
    company: {
      name: "Tech Corp",
      location: "Bangalore",
      website: "https://techcorp.com"
    },
    description: "Build amazing web applications"
  };

  const handleLoadSample = () => {
    setJsonData(sampleData);
    setJsonInput(JSON.stringify(sampleData, null, 2));
  };

  const handleParseJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonData(parsed);
      toast.success("JSON parsed successfully!");
    } catch (error) {
      toast.error("Invalid JSON format");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">JSON Card Demo</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">JSON Input</h2>
          <Textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON data here..."
            className="min-h-64 mb-4"
          />
          <div className="flex gap-2">
            <Button onClick={handleParseJson}>Parse JSON</Button>
            <Button variant="outline" onClick={handleLoadSample}>
              Load Sample
            </Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Card Preview</h2>
          {jsonData ? (
            <JsonCard 
              data={jsonData} 
              title="Your Data Card"
            />
          ) : (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No data to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JsonCardDemo;
