
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { CustomCareer } from "./AdminCareers";
import "./AdminCareerDescription.css";

const AdminCareerDescription = () => {
  const { id } = useParams<{ id: string }>();
  const [career, setCareer] = useState<CustomCareer | null>(null);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCareer = () => {
      const storedCareers = localStorage.getItem("customCareers");
      if (storedCareers) {
        const careers: CustomCareer[] = JSON.parse(storedCareers);
        const foundCareer = careers.find(c => c.id === id);
        if (foundCareer) {
          setCareer(foundCareer);
          setDescription(foundCareer.description || "");
        } else {
          toast.error("Career not found");
          navigate("/admin/careers");
        }
      } else {
        toast.error("No careers data found");
        navigate("/admin/careers");
      }
    };

    if (id) {
      loadCareer();
    }
  }, [id, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!career) return;
    
    // Get existing careers
    const storedCareers = localStorage.getItem("customCareers");
    if (storedCareers) {
      const careers: CustomCareer[] = JSON.parse(storedCareers);
      const updatedCareers = careers.map(c => {
        if (c.id === id) {
          return { ...c, description };
        }
        return c;
      });
      
      localStorage.setItem("customCareers", JSON.stringify(updatedCareers));
      toast.success("Description updated successfully");
      navigate("/admin/careers");
    }
  };
  
  if (!career) {
    return (
      <div className="admin-career-description-container">
        <div className="loading">Loading career data...</div>
      </div>
    );
  }

  return (
    <div className="admin-career-description-container">
      <header className="admin-header">
        <Link to="/admin/careers" className="back-link">
          <Button variant="outline" className="back-button">
            <ArrowLeft size={16} />
            <span>Back to Careers</span>
          </Button>
        </Link>
        <h1 className="admin-title">Add Description for {career.title}</h1>
      </header>
      
      <div className="description-form-container">
        <form onSubmit={handleSubmit} className="description-form">
          <div className="career-preview" style={{ backgroundColor: career.color }}>
            <h3 className="career-title">{career.title}</h3>
            <p className="career-industry">{career.industry}</p>
            <p className="career-teaser">{career.teaser}</p>
            {career.salary && <p className="career-salary">{career.salary}</p>}
          </div>
          
          <div className="form-group">
            <Label htmlFor="description">Career Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of this career option..."
              rows={10}
              className="description-textarea"
            />
          </div>
          
          <div className="form-actions">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/careers")}>
              Cancel
            </Button>
            <Button type="submit" className="submit-button">
              Save Description
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCareerDescription;
