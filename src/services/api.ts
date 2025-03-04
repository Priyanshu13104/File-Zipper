
/**
 * API service for handling file uploads and compression
 */

// Base URL for the API
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Upload files and compress them using the selected algorithm and level
 */
export const compressFiles = async (
  files: File[],
  algorithm: 'huffman' | 'rle' | 'tar' | 'rar' | 'tgz',
  compressionLevel: number,
  onProgress: (progress: number) => void
): Promise<string> => {
  // Create a FormData object to send the files
  const formData = new FormData();
  
  // Add each file to the formData
  files.forEach((file) => {
    formData.append('files', file);
  });
  
  // Add compression parameters
  formData.append('algorithm', algorithm);
  formData.append('level', compressionLevel.toString());
  
  try {
    // Set up a simulated progress tracking since XHR doesn't support progress for JSON responses
    const progressTracker = simulateProgress(onProgress);
    
    // Make the API call
    const response = await fetch(`${API_BASE_URL}/compress`, {
      method: 'POST',
      body: formData,
    });
    
    // Clear the progress tracker
    clearInterval(progressTracker);
    
    // Set progress to 100% when done
    onProgress(100);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to compress files');
    }
    
    const data = await response.json();
    return data.filename;
  } catch (error) {
    console.error('Error compressing files:', error);
    throw new Error('Failed to compress files. Please try again.');
  }
};

/**
 * Helper function to simulate progress since fetch doesn't have progress events
 */
const simulateProgress = (onProgress: (progress: number) => void) => {
  let progress = 0;
  const interval = setInterval(() => {
    // Increment progress but cap at 90% until we get the actual response
    progress += (Math.random() * 3) + 0.5; // Slowed down to appear more realistic with compression
    progress = Math.min(progress, 90);
    onProgress(progress);
  }, 300);
  
  return interval;
};

/**
 * Download the compressed file
 */
export const downloadCompressedFile = (filename: string): void => {
  // Create a download link and trigger the download
  const downloadUrl = `${API_BASE_URL}/download/${filename}`;
  
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
