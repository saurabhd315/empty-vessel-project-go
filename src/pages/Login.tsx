
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import "./Login.css";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    // Simple authentication check (replace with real authentication)
    if (data.email === "admin@career.com" && data.password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "admin");
      toast.success("Login successful!");
      navigate("/admin/careers");
    } else {
      toast.error("Invalid credentials. Use admin@career.com / admin123");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Career Dashboard Login</h1>
          <p className="login-subtitle">Sign in to manage career categories</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="login-form">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <div className="login-demo">
          <p className="demo-text">Demo Credentials:</p>
          <p className="demo-credentials">Email: admin@career.com</p>
          <p className="demo-credentials">Password: admin123</p>
        </div>

        <div className="login-footer">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="back-home-button"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
