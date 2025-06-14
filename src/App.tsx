
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Journey from "./pages/Journey";
import SampleJourneys from "./pages/SampleJourneys";
import CareerDetails from "./pages/CareerDetails";
import NotFound from "./pages/NotFound";
import AdminCareers from "./pages/AdminCareers";
import AdminCareerAdd from "./pages/AdminCareerAdd";
import AdminCareerDescription from "./pages/AdminCareerDescription";
import Login from "./pages/Login";
import AdminCategories from "./pages/AdminCategories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/sample-journeys" element={<SampleJourneys />} />
          <Route path="/careers/:careerId" element={<CareerDetails />} />
          <Route path="/careers/custom/:careerId" element={<CareerDetails />} />
          <Route path="/careers/category/:careerId" element={<CareerDetails />} />
          <Route path="/careers/hardcoded/:careerId" element={<CareerDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/careers" element={<AdminCareers />} />
          <Route path="/admin/careers/add" element={<AdminCareerAdd />} />
          <Route path="/admin/careers/description/:id" element={<AdminCareerDescription />} />
          <Route path="/profile/:slug" element={<NotFound />} />
          <Route path="/counsellors/:slug" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
