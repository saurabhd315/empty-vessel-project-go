
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Github } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Easy to Customize</h3>
                <p className="text-muted-foreground">
                  Quickly modify this template to match your project needs.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Modern Design</h3>
                <p className="text-muted-foreground">
                  Clean aesthetics with attention to spacing and typography.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Fully Responsive</h3>
                <p className="text-muted-foreground">
                  Optimized for all devices from mobile to desktop.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mb-16">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
            <p className="text-muted-foreground max-w-2xl mb-8">
              This blank project gives you all the foundation you need to quickly develop
              your next amazing web application.
            </p>
            <Button>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
