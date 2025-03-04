
import os
import time
import uuid
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import compression

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload and download directories
UPLOAD_FOLDER = 'uploads'
COMPRESSED_FOLDER = 'compressed'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['COMPRESSED_FOLDER'] = COMPRESSED_FOLDER

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(COMPRESSED_FOLDER, exist_ok=True)

@app.route('/api/compress', methods=['POST'])
def compress_files():
    if 'files' not in request.files:
        return jsonify({'error': 'No files provided'}), 400
    
    files = request.files.getlist('files')
    algorithm = request.form.get('algorithm', 'huffman')
    compression_level = int(request.form.get('level', '5'))
    
    # Generate a unique ID for this compression task
    task_id = str(uuid.uuid4())
    task_dir = os.path.join(app.config['UPLOAD_FOLDER'], task_id)
    os.makedirs(task_dir, exist_ok=True)
    
    # Save uploaded files
    file_paths = []
    for file in files:
        if file.filename:
            filename = secure_filename(file.filename)
            file_path = os.path.join(task_dir, filename)
            file.save(file_path)
            file_paths.append(file_path)
    
    if not file_paths:
        return jsonify({'error': 'No valid files uploaded'}), 400
    
    # Process compression based on algorithm
    try:
        if algorithm == 'huffman':
            output_path = compression.compress_huffman(file_paths, compression_level, task_id)
        elif algorithm == 'rle':
            output_path = compression.compress_rle(file_paths, compression_level, task_id)
        elif algorithm == 'tar':
            output_path = compression.compress_tar(file_paths, compression_level, task_id)
        elif algorithm == 'rar':
            output_path = compression.compress_rar(file_paths, compression_level, task_id)
        elif algorithm == 'tgz':
            output_path = compression.compress_tgz(file_paths, compression_level, task_id)
        else:
            return jsonify({'error': 'Unsupported compression algorithm'}), 400
        
        # Get just the filename from the path
        output_filename = os.path.basename(output_path)
        
        return jsonify({
            'status': 'success',
            'message': 'Files compressed successfully',
            'filename': output_filename
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download/<filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(app.config['COMPRESSED_FOLDER'], filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
