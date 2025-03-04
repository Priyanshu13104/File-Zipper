
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero: React.FC = () => {
  const scrollToCompression = () => {
    const element = document.getElementById('compression');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-background/80 to-muted/30">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
          Zip Files <span className="text-primary">Efficiently</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-10 animate-fade-in">
          Zip files using advanced compression algorithms<br />Huffman and Run-Length Encoding
        </p>
        <Button 
          size="lg" 
          className="gap-2 animate-fade-in"
          onClick={scrollToCompression}
        >
          Start Zipping
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
