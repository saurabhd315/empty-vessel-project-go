import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import "./AdminCategories.css";

type Resource = {
  title: string;
  url: string;
};

type CareerCategory = {
  id: string;
  name: string;
  parentCategory?: string;
  opportunities: string[];
  resources: {
    "Educational Resources": Resource[];
    "Online Courses": Resource[];
    "Industry Blogs": Resource[];
    "Professional Networks": Resource[];
  };
  insights: string;
};

const AdminCategories = () => {
  const [categories, setCategories] = useState<CareerCategory[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CareerCategory | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Load existing categories
    const storedCategories = localStorage.getItem("careerCategories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, [navigate]);

  const handleSaveCategory = (categoryData: CareerCategory) => {
    let updatedCategories;
    
    if (editingCategory) {
      updatedCategories = categories.map(cat => 
        cat.id === editingCategory.id ? categoryData : cat
      );
    } else {
      updatedCategories = [...categories, { ...categoryData, id: `category-${Date.now()}` }];
    }
    
    setCategories(updatedCategories);
    localStorage.setItem("careerCategories", JSON.stringify(updatedCategories));
    setIsEditing(false);
    setEditingCategory(null);
    toast.success(editingCategory ? "Category updated!" : "Category added!");
  };

  const handleDeleteCategory = (id: string) => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem("careerCategories", JSON.stringify(updatedCategories));
    toast.success("Category deleted!");
  };

  const handleEditCategory = (category: CareerCategory) => {
    setEditingCategory(category);
    setIsEditing(true);
  };

  // Get parent categories for grouping
  const parentCategories = Array.from(new Set(categories.map(cat => cat.parentCategory).filter(Boolean)));
  const categoriesWithoutParent = categories.filter(cat => !cat.parentCategory);

  return (
    <div className="admin-categories-container">
      <header className="admin-header">
        <Link to="/" className="back-link">
          <Button variant="outline" className="back-button">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Button>
        </Link>
        <h1 className="admin-title">Career Categories Management</h1>
        <Button 
          onClick={() => {
            setEditingCategory(null);
            setIsEditing(true);
          }}
          className="add-category-button"
        >
          <Plus size={16} />
          <span>Add New Category</span>
        </Button>
      </header>

      {isEditing ? (
        <CategoryForm 
          category={editingCategory}
          categories={categories}
          onSave={handleSaveCategory}
          onCancel={() => {
            setIsEditing(false);
            setEditingCategory(null);
          }}
        />
      ) : (
        <div className="categories-content">
          {categories.length === 0 ? (
            <div className="empty-state">
              <h2>No categories added yet</h2>
              <p>Create your first career category to see it on the website</p>
              <Button 
                onClick={() => setIsEditing(true)}
                className="mt-4"
              >
                <Plus size={16} />
                <span>Add Category</span>
              </Button>
            </div>
          ) : (
            <>
              {/* Categories without parent */}
              {categoriesWithoutParent.length > 0 && (
                <div className="category-section">
                  <h2 className="section-title">Independent Categories</h2>
                  <div className="categories-grid">
                    {categoriesWithoutParent.map((category) => (
                      <CategoryCard 
                        key={category.id} 
                        category={category} 
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Grouped by parent categories */}
              {parentCategories.map(parentName => (
                <div key={parentName} className="category-section">
                  <h2 className="section-title">{parentName}</h2>
                  <div className="categories-grid">
                    {categories
                      .filter(cat => cat.parentCategory === parentName)
                      .map((category) => (
                        <CategoryCard 
                          key={category.id} 
                          category={category} 
                          onEdit={handleEditCategory}
                          onDelete={handleDeleteCategory}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const CategoryCard = ({ 
  category, 
  onEdit, 
  onDelete 
}: { 
  category: CareerCategory;
  onEdit: (category: CareerCategory) => void;
  onDelete: (id: string) => void;
}) => (
  <Card className="category-card">
    <CardHeader>
      <CardTitle>{category.name}</CardTitle>
      {category.parentCategory && (
        <p className="text-sm text-gray-500">Parent: {category.parentCategory}</p>
      )}
    </CardHeader>
    <CardContent>
      <div className="category-info">
        <p><strong>Opportunities:</strong> {category.opportunities?.join(", ") || "None"}</p>
        <p><strong>Insights:</strong> {category.insights}</p>
      </div>
      <div className="category-actions">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEdit(category)}
        >
          <Edit size={16} />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onDelete(category.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash size={16} />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const CategoryForm = ({ 
  category, 
  categories,
  onSave, 
  onCancel 
}: { 
  category: CareerCategory | null;
  categories: CareerCategory[];
  onSave: (category: CareerCategory) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<CareerCategory>({
    id: category?.id || '',
    name: category?.name || '',
    parentCategory: category?.parentCategory || '',
    opportunities: category?.opportunities || [''],
    resources: category?.resources || {
      "Educational Resources": [{ title: '', url: '' }],
      "Online Courses": [{ title: '', url: '' }],
      "Industry Blogs": [{ title: '', url: '' }],
      "Professional Networks": [{ title: '', url: '' }]
    },
    insights: category?.insights || ''
  });

  // Get unique parent category options (excluding current category)
  const parentOptions = Array.from(new Set(
    categories
      .filter(cat => cat.id !== category?.id)
      .map(cat => cat.parentCategory)
      .filter(Boolean)
  ));

  const handleOpportunityChange = (index: number, value: string) => {
    const newOpportunities = [...formData.opportunities];
    newOpportunities[index] = value;
    setFormData({ ...formData, opportunities: newOpportunities });
  };

  const addOpportunity = () => {
    setFormData({ 
      ...formData, 
      opportunities: [...formData.opportunities, ''] 
    });
  };

  const removeOpportunity = (index: number) => {
    const newOpportunities = formData.opportunities.filter((_, i) => i !== index);
    setFormData({ ...formData, opportunities: newOpportunities });
  };

  const handleResourceChange = (
    resourceType: keyof typeof formData.resources, 
    index: number, 
    field: 'title' | 'url', 
    value: string
  ) => {
    const newResources = { ...formData.resources };
    newResources[resourceType][index][field] = value;
    setFormData({ ...formData, resources: newResources });
  };

  const addResource = (resourceType: keyof typeof formData.resources) => {
    const newResources = { ...formData.resources };
    newResources[resourceType].push({ title: '', url: '' });
    setFormData({ ...formData, resources: newResources });
  };

  const removeResource = (resourceType: keyof typeof formData.resources, index: number) => {
    const newResources = { ...formData.resources };
    newResources[resourceType] = newResources[resourceType].filter((_, i) => i !== index);
    setFormData({ ...formData, resources: newResources });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    // Filter out empty opportunities
    const validOpportunities = formData.opportunities.filter(opp => opp.trim());
    
    if (validOpportunities.length === 0) {
      toast.error("At least one opportunity is required");
      return;
    }

    onSave({
      ...formData,
      opportunities: validOpportunities
    });
  };

  return (
    <Card className="category-form-card">
      <CardHeader>
        <CardTitle>{category ? 'Edit Category' : 'Add New Category'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label>Category Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Software Development"
              required
            />
          </div>

          <div className="form-group">
            <label>Parent Category (Optional)</label>
            <div className="parent-category-input">
              <Select
                value={formData.parentCategory}
                onValueChange={(value) => setFormData({ ...formData, parentCategory: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select or create parent category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No Parent Category</SelectItem>
                  {parentOptions.map(parent => (
                    <SelectItem key={parent} value={parent}>{parent}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500">Or type a new parent category name:</span>
              <Input
                value={formData.parentCategory}
                onChange={(e) => setFormData({ ...formData, parentCategory: e.target.value })}
                placeholder="e.g., Technology, Healthcare, Business"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Opportunities and Roles</label>
            {formData.opportunities.map((opportunity, index) => (
              <div key={index} className="opportunity-input">
                <Input
                  value={opportunity}
                  onChange={(e) => handleOpportunityChange(index, e.target.value)}
                  placeholder="e.g., Software Engineer"
                />
                {formData.opportunities.length > 1 && (
                  <Button 
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeOpportunity(index)}
                  >
                    <Trash size={16} />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addOpportunity}>
              <Plus size={16} /> Add Opportunity
            </Button>
          </div>

          {Object.entries(formData.resources).map(([resourceType, resources]) => (
            <div key={resourceType} className="form-group">
              <label>{resourceType}</label>
              {resources.map((resource, index) => (
                <div key={index} className="resource-input">
                  <Input
                    value={resource.title}
                    onChange={(e) => handleResourceChange(
                      resourceType as keyof typeof formData.resources, 
                      index, 
                      'title', 
                      e.target.value
                    )}
                    placeholder="Resource title"
                  />
                  <Input
                    value={resource.url}
                    onChange={(e) => handleResourceChange(
                      resourceType as keyof typeof formData.resources, 
                      index, 
                      'url', 
                      e.target.value
                    )}
                    placeholder="Resource URL"
                  />
                  {resources.length > 1 && (
                    <Button 
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeResource(
                        resourceType as keyof typeof formData.resources, 
                        index
                      )}
                    >
                      <Trash size={16} />
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => addResource(resourceType as keyof typeof formData.resources)}
              >
                <Plus size={16} /> Add {resourceType.slice(0, -1)}
              </Button>
            </div>
          ))}

          <div className="form-group">
            <label>Insights</label>
            <Textarea
              value={formData.insights}
              onChange={(e) => setFormData({ ...formData, insights: e.target.value })}
              placeholder="Industry insights and trends..."
              rows={3}
            />
          </div>

          <div className="form-actions">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              <Save size={16} />
              {category ? 'Update Category' : 'Save Category'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminCategories;
