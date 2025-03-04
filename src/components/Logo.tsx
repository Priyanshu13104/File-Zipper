
import React from "react";
import { FileArchive } from "lucide-react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <FileArchive className="h-6 w-6 text-primary" />
      <span className="font-semibold text-lg">FileZipper</span>
    </div>
  );
};

export default Logo;
