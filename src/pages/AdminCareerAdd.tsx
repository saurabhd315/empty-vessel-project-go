
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { CustomCareer } from "./AdminCareers";
import "./AdminCareerAdd.css";

const colorOptions = [
  { value: "#D3E4FD", label: "Blue" },
  { value: "#FFDEE2", label: "Pink" },
  { value: "#E5DEFF", label: "Purple" },
  { value: "#FDE1D3", label: "Peach" },
  { value: "#F2FCE2", label: "Green" },
  { value: "#FEF7CD", label: "Yellow" }
];

const AdminCareerAdd = () => {
  const [formData, setFormData] = useState<Omit<CustomCareer, "id">>({
    title: "",
    teaser: "",
    industry: "",
    color: "#D3E4FD",
    salary: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorSelect = (color: string) => {
    setFormData(prev => ({ ...prev, color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.title || !formData.teaser || !formData.industry) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Create new career with unique ID
    const newCareer: CustomCareer = {
      ...formData,
      id: `custom-${Date.now()}`
    };
    
    // Get existing careers from localStorage
    const existingCareersJSON = localStorage.getItem("customCareers");
    const existingCareers: CustomCareer[] = existingCareersJSON 
      ? JSON.parse(existingCareersJSON) 
      : [];
    
    // Add new career to the list
    const updatedCareers = [...existingCareers, newCareer];
    
    // Save to localStorage
    localStorage.setItem("customCareers", JSON.stringify(updatedCareers));
    
    toast.success("Career option added successfully");
    navigate("/admin/careers");
  };
  
  return (
    <div className="admin-career-add-container">
      <header className="admin-header">
        <Link to="/admin/careers" className="back-link">
          <Button variant="outline" className="back-button">
            <ArrowLeft size={16} />
            <span>Back to Careers</span>
          </Button>
        </Link>
        <h1 className="admin-title">Add New Career Option</h1>
      </header>
      
      <div className="career-form-container">
        <form onSubmit={handleSubmit} className="career-form">
          <div className="form-group">
            <Label htmlFor="title">Career Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Software Developer"
              required
            />
          </div>
          
          <div className="form-group">
            <Label htmlFor="teaser">Short Teaser</Label>
            <Input
              id="teaser"
              name="teaser"
              value={formData.teaser}
              onChange={handleChange}
              placeholder="e.g., Design digital experiences"
              required
              maxLength={30}
            />
            <small className="text-muted">Keep it short (30 chars max)</small>
          </div>
          
          <div className="form-group">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="e.g., Technology"
              required
            />
          </div>
          
          <div className="form-group">
            <Label htmlFor="salary">Salary Range</Label>
            <Input
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., ₹5-25 LPA"
            />
          </div>
          
          <div className="form-group">
            <Label>Card Background Color</Label>
            <div className="color-options">
              {colorOptions.map(color => (
                <button
                  key={color.value}
                  type="button"
                  className={`color-option ${formData.color === color.value ? 'selected' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorSelect(color.value)}
                  aria-label={`Select ${color.label} color`}
                />
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/careers")}>
              Cancel
            </Button>
            <Button type="submit" className="submit-button">
              Create Career Option
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCareerAdd;
