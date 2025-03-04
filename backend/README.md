
# File Compression Backend

This is the backend server for the file compression application. It provides APIs for compressing files using Huffman coding and Run-Length Encoding (RLE) algorithms.

## Setup

1. Install Python 3.8 or higher
2. Install required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Running the Server

Start the server with:
```
python app.py
```

The server will run on http://localhost:5000

## API Endpoints

### POST /api/compress
Uploads files and compresses them based on the selected algorithm.

**Parameters:**
- `files`: The files to compress (multipart/form-data)
- `algorithm`: Compression algorithm to use (huffman or rle)
- `level`: Compression level (1-9)

**Response:**
```json
{
  "status": "success",
  "message": "Files compressed successfully",
  "filename": "compressed_123456.zip"
}
```

### GET /api/download/:filename
Downloads a compressed file.

## Implementation Details

The current implementation is a basic version that:
1. Accepts file uploads
2. Creates a ZIP file of the uploaded files
3. Provides a download link for the ZIP file

The actual compression algorithms (Huffman and RLE) are simulated for educational purposes. In a production environment, these would be replaced with more efficient implementations.
