
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploader from "@/components/FileUploader";
import CompressionSettings from "@/components/CompressionSettings";
import CompressionProgress from "@/components/CompressionProgress";
import Navbar from "@/components/Navbar";
import { compressFiles, downloadCompressedFile } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const ZipPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [algorithm, setAlgorithm] = useState<"huffman" | "rle" | "tar" | "rar" | "tgz">("huffman");
  const [compressionLevel, setCompressionLevel] = useState(5);
  const [downloadReady, setDownloadReady] = useState(false);
  const [downloadFilename, setDownloadFilename] = useState("");
  const { toast } = useToast();

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setDownloadReady(false);
  };

  const handleCompression = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to compress.",
        variant: "destructive",
      });
      return;
    }
    
    setCompressing(true);
    setProgress(0);
    setDownloadReady(false);
    
    try {
      // Call the API service to compress files
      const filename = await compressFiles(
        files,
        algorithm,
        compressionLevel,
        (currentProgress) => {
          setProgress(currentProgress);
        }
      );
      
      // Set download info when compression is complete
      setDownloadFilename(filename);
      setDownloadReady(true);
      
      toast({
        title: "Compression complete",
        description: "Your files have been compressed successfully. Ready to download!",
      });
    } catch (error) {
      toast({
        title: "Compression failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setCompressing(false);
    }
  };

  const handleDownload = () => {
    if (downloadReady && downloadFilename) {
      downloadCompressedFile(downloadFilename);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">File Compression</h1>
            <p className="text-muted-foreground">Compress your files using various algorithms</p>
          </div>
          
          <Card className="backdrop-blur-sm bg-card/90 border-muted/20 shadow-xl">
            <CardHeader>
              <CardTitle>Zip Files</CardTitle>
              <CardDescription>
                Drag and drop your files or select them from your device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="upload">Upload Files</TabsTrigger>
                  <TabsTrigger value="settings">Zip Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="upload">
                  <FileUploader 
                    onFilesSelected={handleFilesSelected} 
                    selectedFiles={files}
                    compressing={compressing}
                    onStartCompression={handleCompression}
                    downloadReady={downloadReady}
                    onDownload={handleDownload}
                  />
                </TabsContent>

                <TabsContent value="settings">
                  <CompressionSettings 
                    algorithm={algorithm}
                    setAlgorithm={setAlgorithm}
                    compressionLevel={compressionLevel}
                    setCompressionLevel={setCompressionLevel}
                  />
                </TabsContent>
              </Tabs>

              {compressing && (
                <div className="mt-6">
                  <CompressionProgress progress={progress} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ZipPage;
