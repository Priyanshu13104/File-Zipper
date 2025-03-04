
import React from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-4 px-6 border-b flex items-center justify-between backdrop-blur-sm bg-background/90 sticky top-0 z-10">
      <Link to="/" className="flex items-center">
        <Logo />
      </Link>
      
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/zip" className="text-sm font-medium hover:text-primary transition-colors">Zip</Link>
        </div>
        
        <a 
          href="https://github.com/Priyanshu13104/File-Zipper" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Github className="h-5 w-5" />
          <span className="hidden md:inline text-sm font-medium">GitHub</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
