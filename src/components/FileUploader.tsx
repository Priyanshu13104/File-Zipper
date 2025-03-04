
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileIcon, Upload, X, FileArchive, Download, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  selectedFiles: File[];
  compressing: boolean;
  onStartCompression: () => void;
  downloadReady?: boolean;
  onDownload?: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  selectedFiles,
  compressing,
  onStartCompression,
  downloadReady = false,
  onDownload,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > 0) {
        onFilesSelected(droppedFiles);
      }
    },
    [onFilesSelected]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFiles = Array.from(e.target.files);
        onFilesSelected(selectedFiles);
        // Reset the input value to allow selecting the same file again
        e.target.value = "";
      }
    },
    [onFilesSelected]
  );

  const handleRemoveFile = useCallback(
    (index: number) => {
      const updatedFiles = [...selectedFiles];
      updatedFiles.splice(index, 1);
      onFilesSelected(updatedFiles);
    },
    [selectedFiles, onFilesSelected]
  );

  const handleClearFiles = useCallback(() => {
    onFilesSelected([]);
  }, [onFilesSelected]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Calculate total size of selected files
  const totalSize = selectedFiles.reduce((total, file) => total + file.size, 0);

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/20 hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="rounded-full bg-primary/10 p-3">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Drag and drop files here</h3>
          <p className="text-sm text-muted-foreground">
            or click to browse from your device
          </p>
          <input
            type="file"
            className="hidden"
            id="file-input"
            onChange={handleFileChange}
            multiple
            disabled={compressing}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("file-input")?.click()}
            disabled={compressing}
          >
            <Upload className="mr-2 h-4 w-4" />
            Browse Files
          </Button>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium">Selected Files:</h4>
              <Badge variant="secondary">{formatFileSize(totalSize)}</Badge>
              <Badge variant="outline">{selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'}</Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearFiles}
              disabled={compressing}
              className="h-8 flex items-center text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto p-1">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-2 rounded-md bg-secondary/50"
              >
                <div className="flex items-center space-x-3">
                  <FileIcon className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium truncate max-w-[200px] md:max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleRemoveFile(index)}
                  disabled={compressing}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-3">
        {downloadReady && onDownload && (
          <Button onClick={onDownload} variant="outline" className="w-full md:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Download Compressed File
          </Button>
        )}
        <Button
          onClick={onStartCompression}
          disabled={selectedFiles.length === 0 || compressing}
          className="w-full md:w-auto"
        >
          <FileArchive className="mr-2 h-4 w-4" />
          {compressing ? "Compressing..." : "Compress Files"}
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;
