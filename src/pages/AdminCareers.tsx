
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase,
  Plus,
  Edit,
  Trash,
  ArrowLeft,
  Tags
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "./AdminCareers.css";

export type CustomCareer = {
  id: string;
  title: string;
  teaser: string;
  industry: string;
  color: string;
  salary?: string;
  description?: string;
}

const AdminCareers = () => {
  const [careers, setCareers] = useState<CustomCareer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load careers from local storage
    const storedCareers = localStorage.getItem("customCareers");
    if (storedCareers) {
      setCareers(JSON.parse(storedCareers));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedCareers = careers.filter(career => career.id !== id);
    setCareers(updatedCareers);
    localStorage.setItem("customCareers", JSON.stringify(updatedCareers));
    toast.success("Career option deleted");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="admin-careers-container">
      <header className="admin-header">
        <Link to="/" className="back-link">
          <Button variant="outline" className="back-button">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Button>
        </Link>
        <h1 className="admin-title">Career Options Management</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => navigate("/admin/categories")}
            variant="outline"
            className="manage-categories-button"
          >
            <Tags size={16} />
            <span>Manage Categories</span>
          </Button>
          <Button 
            onClick={() => navigate("/admin/careers/add")}
            className="add-career-button"
          >
            <Plus size={16} />
            <span>Add New Career</span>
          </Button>
        </div>
      </header>

      <div className="careers-table-container">
        {careers.length === 0 ? (
          <div className="empty-state">
            <Briefcase size={48} />
            <h2>No custom careers added yet</h2>
            <p>Create your first career option to see it on the website</p>
            <Button 
              onClick={() => navigate("/admin/careers/add")}
              className="mt-4"
            >
              <Plus size={16} />
              <span>Add Career Option</span>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Career Title</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Teaser</TableHead>
                <TableHead>Salary Range</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {careers.map((career) => (
                <TableRow key={career.id}>
                  <TableCell className="font-medium">{career.title}</TableCell>
                  <TableCell>{career.industry}</TableCell>
                  <TableCell>{career.teaser}</TableCell>
                  <TableCell>{career.salary || "N/A"}</TableCell>
                  <TableCell>{career.description ? "Added" : "Not added"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/admin/careers/description/${career.id}`)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(career.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AdminCareers;
