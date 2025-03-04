
import React from "react";
import { Progress } from "@/components/ui/progress";
import { FileArchive } from "lucide-react";

interface CompressionProgressProps {
  progress: number;
}

const CompressionProgress: React.FC<CompressionProgressProps> = ({ progress }) => {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FileArchive className="h-5 w-5 text-primary mr-2" />
          <h4 className="font-medium">Zipping Files</h4>
        </div>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <p className="text-xs text-center text-muted-foreground">
        {progress < 100 ? (
          "Please wait while your files are being compressed..."
        ) : (
          "Compression complete! Your download will begin shortly."
        )}
      </p>
    </div>
  );
};

export default CompressionProgress;
