
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  
  const goToZipPage = () => {
    navigate('/zip');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in">
              Compress Your Files <span className="text-primary">Efficiently</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
              FileZipper provides advanced compression solutions using multiple algorithms to efficiently reduce file sizes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            <div className="bg-card rounded-lg p-6 shadow-md border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 14 10 14 10 20"></polyline>
                  <polyline points="20 10 14 10 14 4"></polyline>
                  <line x1="14" y1="10" x2="21" y2="3"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-center">Multiple Algorithms</h3>
              <p className="text-muted-foreground text-center">
                Choose from ZIP, TAR, RAR, or TGZ compression formats to suit your needs
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-center">Easy to Use</h3>
              <p className="text-muted-foreground text-center">
                Simple drag-and-drop interface for selecting files and configuring compression settings
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-center">Secure</h3>
              <p className="text-muted-foreground text-center">
                Files are processed securely and temporarily stored on the server
              </p>
            </div>
          </div>
          
          <div className="pt-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2"
              onClick={goToZipPage}
            >
              Try It Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
