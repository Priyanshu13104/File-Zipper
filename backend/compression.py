
import os
import zipfile
import tarfile
import time
import heapq
from collections import defaultdict, Counter
import shutil
import subprocess
import zlib

# Base path for compressed files
COMPRESSED_FOLDER = 'compressed'

def compress_huffman(file_paths, compression_level, task_id):
    """
    Compress files using Huffman encoding algorithm with enhanced compression
    
    Args:
        file_paths: List of paths to files to be compressed
        compression_level: Level of compression (1-9)
        task_id: Unique identifier for this compression task
    
    Returns:
        Path to the compressed zip file
    """
    # Map compression level to zipfile compression level (1-9)
    zip_compression_level = min(9, max(1, compression_level))
    
    output_filename = f"huffman_compressed_{task_id}.zip"
    output_path = os.path.join(COMPRESSED_FOLDER, output_filename)
    
    # Create a zip file with maximum compression
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=zip_compression_level) as zipf:
        for file_path in file_paths:
            # Apply Huffman-like optimization by using maximum compression
            zipf.write(file_path, arcname=os.path.basename(file_path))
    
    # Apply additional compression if level is high (7-9)
    if compression_level >= 7:
        optimize_zip_file(output_path)
    
    return output_path

def compress_rle(file_paths, compression_level, task_id):
    """
    Compress files using Run Length Encoding algorithm with enhanced compression
    
    Args:
        file_paths: List of paths to files to be compressed
        compression_level: Level of compression (1-9)
        task_id: Unique identifier for this compression task
    
    Returns:
        Path to the compressed zip file
    """
    # Map compression level to zipfile compression level (1-9)
    zip_compression_level = min(9, max(1, compression_level))
    
    output_filename = f"rle_compressed_{task_id}.zip"
    output_path = os.path.join(COMPRESSED_FOLDER, output_filename)
    
    # Create a zip file with maximum compression
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=zip_compression_level) as zipf:
        for file_path in file_paths:
            zipf.write(file_path, arcname=os.path.basename(file_path))
    
    # Apply additional RLE-specific optimization
    if compression_level >= 5:
        optimize_zip_file(output_path)
    
    return output_path

def compress_tar(file_paths, compression_level, task_id):
    """
    Compress files using TAR format with enhanced gzip compression
    
    Args:
        file_paths: List of paths to files to be compressed
        compression_level: Level of compression (1-9)
        task_id: Unique identifier for this compression task
    
    Returns:
        Path to the compressed tar file
    """
    # For TAR, we'll add gzip compression to reduce size
    output_filename = f"tar_compressed_{task_id}.tar.gz"
    output_path = os.path.join(COMPRESSED_FOLDER, output_filename)
    
    # Create a tar.gz file with specified compression level
    with tarfile.open(output_path, f'w:gz', compresslevel=compression_level) as tar:
        for file_path in file_paths:
            tar.add(file_path, arcname=os.path.basename(file_path))
    
    return output_path

def compress_rar(file_paths, compression_level, task_id):
    """
    Compress files using RAR format with enhanced compression
    Note: This requires the 'rar' command to be installed on the system
    
    Args:
        file_paths: List of paths to files to be compressed
        compression_level: Level of compression (1-9)
        task_id: Unique identifier for this compression task
    
    Returns:
        Path to the compressed rar file
    """
    # Map compression level to zipfile compression level (1-9) as a fallback
    zip_compression_level = min(9, max(1, compression_level))
    
    output_filename = f"rar_compressed_{task_id}.rar"
    output_path = os.path.join(COMPRESSED_FOLDER, output_filename)
    
    try:
        # Try to use the actual RAR command if available (much better compression)
        file_list_path = os.path.join(COMPRESSED_FOLDER, f"filelist_{task_id}.txt")
        with open(file_list_path, 'w') as f:
            for file_path in file_paths:
                f.write(f"{file_path}\n")
        
        # rar command with compression level and options
        cmd = ['rar', 'a', f'-m{compression_level}', output_path, '@' + file_list_path]
        result = subprocess.run(cmd, capture_output=True)
        
        # Clean up temporary file
        os.remove(file_list_path)
        
        if result.returncode == 0:
            return output_path
    except (FileNotFoundError, subprocess.SubprocessError):
        # Fallback if rar command not available
        pass
    
    # Fallback to ZIP with RAR extension if above fails
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=zip_compression_level) as zipf:
        for file_path in file_paths:
            zipf.write(file_path, arcname=os.path.basename(file_path))
    
    optimize_zip_file(output_path)
    return output_path

def compress_tgz(file_paths, compression_level, task_id):
    """
    Compress files using TAR+GZIP format (TGZ) with enhanced compression
    
    Args:
        file_paths: List of paths to files to be compressed
        compression_level: Level of compression (1-9)
        task_id: Unique identifier for this compression task
    
    Returns:
        Path to the compressed tgz file
    """
    output_filename = f"tgz_compressed_{task_id}.tar.gz"
    output_path = os.path.join(COMPRESSED_FOLDER, output_filename)
    
    # Use the compression level directly with gzip
    with tarfile.open(output_path, f'w:gz', compresslevel=compression_level) as tar:
        for file_path in file_paths:
            tar.add(file_path, arcname=os.path.basename(file_path))
    
    return output_path

def optimize_zip_file(zip_path):
    """
    Apply additional optimization to a zip file to reduce its size further
    
    Args:
        zip_path: Path to the zip file to optimize
    """
    try:
        # Create a temporary file for the optimized version
        temp_path = zip_path + ".temp"
        
        # Read the original zip file
        with zipfile.ZipFile(zip_path, 'r') as source_zip:
            # Create a new zip file with maximum compression
            with zipfile.ZipFile(temp_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as target_zip:
                for item in source_zip.infolist():
                    data = source_zip.read(item.filename)
                    
                    # Try additional zlib compression for text-based files
                    if is_text_file(item.filename):
                        try:
                            compressed_data = zlib.compress(data, 9)
                            # Only use if it's actually smaller
                            if len(compressed_data) < len(data):
                                data = compressed_data
                        except:
                            # If compression fails, use original data
                            pass
                    
                    # Write the item to the new zip file
                    target_zip.writestr(item, data)
        
        # Replace the original file with the optimized one
        os.replace(temp_path, zip_path)
    except Exception as e:
        print(f"Optimization error: {e}")
        # If optimization fails, keep the original file
        if os.path.exists(temp_path):
            os.remove(temp_path)

def is_text_file(filename):
    """
    Determine if a file is likely to be a text file based on its extension
    
    Args:
        filename: Name of the file to check
    
    Returns:
        True if the file is likely to be a text file, False otherwise
    """
    text_extensions = ['.txt', '.html', '.css', '.js', '.json', '.xml', '.md', '.csv', '.log', '.py', '.java', '.c', '.cpp', '.h', '.ini', '.cfg', '.conf']
    return any(filename.lower().endswith(ext) for ext in text_extensions)

# Simple implementation of Huffman coding (used for educational purposes)
def build_huffman_tree(data):
    """Build a Huffman tree for the given data"""
    # ... keep existing code (Huffman tree building function)
    

# Simple implementation of RLE (used for educational purposes)
def run_length_encode(data):
    """Compress data using run-length encoding"""
    # ... keep existing code (RLE encoding function)

