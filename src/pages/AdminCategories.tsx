
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
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
import "./AdminCategories.css";

export type CareerCategory = {
  id: string;
  name: string;
  label: string;
  description?: string;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<CareerCategory[]>([]);
  const [newCategory, setNewCategory] = useState({ name: "", label: "" });
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load categories from local storage
    const storedCategories = localStorage.getItem("careerCategories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.label) {
      toast.error("Please fill in all fields");
      return;
    }

    const category: CareerCategory = {
      id: Date.now().toString(),
      name: newCategory.name,
      label: newCategory.label
    };

    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    localStorage.setItem("careerCategories", JSON.stringify(updatedCategories));
    
    setNewCategory({ name: "", label: "" });
    setIsAdding(false);
    toast.success("Category added successfully");
  };

  const handleDelete = (id: string) => {
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem("careerCategories", JSON.stringify(updatedCategories));
    toast.success("Category deleted");
  };

  return (
    <div className="admin-categories-container">
      <header className="admin-header">
        <Link to="/admin/careers" className="back-link">
          <Button variant="outline" className="back-button">
            <ArrowLeft size={16} />
            <span>Back to Admin</span>
          </Button>
        </Link>
        <h1 className="admin-title">Career Categories Management</h1>
        <Button 
          onClick={() => setIsAdding(true)}
          className="add-category-button"
        >
          <Plus size={16} />
          <span>Add Category</span>
        </Button>
      </header>

      {isAdding && (
        <div className="add-category-form">
          <div className="form-row">
            <Input
              placeholder="Category name (e.g., Healthcare)"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
            />
            <Input
              placeholder="Display label (e.g., Healthcare & Medicine)"
              value={newCategory.label}
              onChange={(e) => setNewCategory({...newCategory, label: e.target.value})}
            />
            <Button onClick={handleAddCategory}>Add</Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="categories-table-container">
        {categories.length === 0 ? (
          <div className="empty-state">
            <Tags size={48} />
            <h2>No categories added yet</h2>
            <p>Create your first category to organize career options</p>
            <Button 
              onClick={() => setIsAdding(true)}
              className="mt-4"
            >
              <Plus size={16} />
              <span>Add Category</span>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Display Label</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.label}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(category.id)}
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

export default AdminCategories;
