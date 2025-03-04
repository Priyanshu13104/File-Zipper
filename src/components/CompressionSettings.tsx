
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CompressionSettingsProps {
  algorithm: "huffman" | "rle" | "tar" | "rar" | "tgz";
  setAlgorithm: (algorithm: "huffman" | "rle" | "tar" | "rar" | "tgz") => void;
  compressionLevel: number;
  setCompressionLevel: (level: number) => void;
}

const CompressionSettings: React.FC<CompressionSettingsProps> = ({
  algorithm,
  setAlgorithm,
  compressionLevel,
  setCompressionLevel,
}) => {
  // Function to get compression strength label
  const getCompressionStrength = (level: number) => {
    if (level <= 3) return { label: "Light", variant: "info" as const };
    if (level <= 6) return { label: "Medium", variant: "warning" as const };
    return { label: "Strong", variant: "success" as const };
  };

  // Get compression strength info
  const strengthInfo = getCompressionStrength(compressionLevel);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Zipping Algorithm</h3>
        
        {/* ZIP ARCHIVE ALGORITHMS */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3 text-primary">Zip Archive Algorithms</h4>
          <RadioGroup
            value={algorithm}
            onValueChange={(value) => setAlgorithm(value as "huffman" | "rle" | "tar" | "rar" | "tgz")}
            className="grid grid-cols-1 gap-4"
          >
            <Card className={`overflow-hidden cursor-pointer transition-all ${algorithm === "huffman" ? "border-primary" : "hover:border-primary"}`}>
              <Label
                htmlFor="huffman"
                className="flex items-start h-full p-4 cursor-pointer"
              >
                <RadioGroupItem
                  value="huffman"
                  id="huffman"
                  className="mt-1 mr-2"
                />
                <div>
                  <div className="font-medium mb-1">Huffman Encoding</div>
                  <p className="text-sm text-muted-foreground">
                    Best for text files and general purpose Zipping. Creates variable-length codes.
                  </p>
                </div>
              </Label>
            </Card>

            <Card className={`overflow-hidden cursor-pointer transition-all ${algorithm === "rle" ? "border-primary" : "hover:border-primary"}`}>
              <Label
                htmlFor="rle"
                className="flex items-start h-full p-4 cursor-pointer"
              >
                <RadioGroupItem value="rle" id="rle" className="mt-1 mr-2" />
                <div>
                  <div className="font-medium mb-1">Run-Length Encoding</div>
                  <p className="text-sm text-muted-foreground">
                    Best for images and files with repeated sequences. Simple and fast.
                  </p>
                </div>
              </Label>
            </Card>
          </RadioGroup>
        </div>
        
        <Separator className="my-6" />
        
        {/* ARCHIVE FORMATS */}
        <div>
          <h4 className="text-md font-medium mb-3 text-primary">Archive Formats</h4>
          <RadioGroup
            value={algorithm}
            onValueChange={(value) => setAlgorithm(value as "huffman" | "rle" | "tar" | "rar" | "tgz")}
            className="grid grid-cols-1 gap-4"
          >
            <Card className={`overflow-hidden cursor-pointer transition-all ${algorithm === "tar" ? "border-primary" : "hover:border-primary"}`}>
              <Label
                htmlFor="tar"
                className="flex items-start h-full p-4 cursor-pointer"
              >
                <RadioGroupItem value="tar" id="tar" className="mt-1 mr-2" />
                <div>
                  <div className="font-medium mb-1">TAR Archive</div>
                  <p className="text-sm text-muted-foreground">
                    Standard Unix archive format with GZIP compression. Good for preserving file permissions and structure.
                  </p>
                </div>
              </Label>
            </Card>

            <Card className={`overflow-hidden cursor-pointer transition-all ${algorithm === "rar" ? "border-primary" : "hover:border-primary"}`}>
              <Label
                htmlFor="rar"
                className="flex items-start h-full p-4 cursor-pointer"
              >
                <RadioGroupItem value="rar" id="rar" className="mt-1 mr-2" />
                <div>
                  <div className="font-medium mb-1">RAR Compression</div>
                  <p className="text-sm text-muted-foreground">
                    High compression ratio with solid archiving. Good for compressing multiple small files.
                  </p>
                </div>
              </Label>
            </Card>

            <Card className={`overflow-hidden cursor-pointer transition-all ${algorithm === "tgz" ? "border-primary" : "hover:border-primary"}`}>
              <Label
                htmlFor="tgz"
                className="flex items-start h-full p-4 cursor-pointer"
              >
                <RadioGroupItem value="tgz" id="tgz" className="mt-1 mr-2" />
                <div>
                  <div className="font-medium mb-1">TGZ (TAR+GZIP)</div>
                  <p className="text-sm text-muted-foreground">
                    Combined TAR and GZIP compression. Excellent for compressing large directories.
                  </p>
                </div>
              </Label>
            </Card>
          </RadioGroup>
        </div>
      </div>
        

      <div className="bg-secondary/50 rounded-lg p-4 text-sm">
        <h4 className="font-medium mb-2">Algorithm Details</h4>
        {algorithm === "huffman" && (
          <p>
            Huffman encoding assigns variable-length codes to input characters,
            with shorter codes for more frequent characters. With increased compression level,
            we apply additional optimization techniques to further reduce file size.
          </p>
        )}
        {algorithm === "rle" && (
          <p>
            Run-length encoding (RLE) replaces sequences of the same data values
            with a count and a single value. Higher compression levels apply additional
            optimizations for text files to achieve better compression ratios.
          </p>
        )}
        {algorithm === "tar" && (
          <p>
            TAR (Tape Archive) bundles multiple files and adds GZIP compression.
            Higher compression levels use more intensive GZIP algorithms to create
            smaller archives while preserving file permissions and structure.
          </p>
        )}
        {algorithm === "rar" && (
          <p>
            RAR uses a proprietary compression algorithm that typically achieves higher
            compression ratios than ZIP. At higher compression levels, dictionary size
            and analysis depth increases, resulting in smaller files but slower compression.
          </p>
        )}
        {algorithm === "tgz" && (
          <p>
            TGZ combines TAR archiving with GZIP compression. Files are bundled with
            TAR, then compressed with GZIP using the specified compression level.
            Higher levels produce smaller files but take longer to compress.
          </p>
        )}
      </div>
    </div>
  );
};

export default CompressionSettings;
