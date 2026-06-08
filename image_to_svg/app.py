from flask import Flask, render_template, request, jsonify
import os
from PIL import Image
import io
import base64
import traceback

def image_to_svg(image_path, output_path=None):
    try:
        # Open the image
        img = Image.open(image_path)
        
        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
            
        width, height = img.size
        
        # Create SVG header
        svg = f'''<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="{width}" height="{height}" 
     viewBox="0 0 {width} {height}" 
     xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Converted Image</title>
    <desc>Converted from {os.path.basename(image_path)}</desc>
    <image width="{width}" height="{height}" xlink:href="data:image/png;base64,{image_to_base64(img)}" />
</svg>'''
        
        # Save to file if output path is provided
        if output_path:
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(svg)
                
        return svg
        
    except Exception as e:
        print(f"Error converting image to SVG: {e}")
        traceback.print_exc()
        return None

def image_to_base64(img):
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB max file size
app.config['UPLOAD_FOLDER'] = 'uploads'

# Create upload folder if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No se proporcionó ninguna imagen'}), 400
            
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No se seleccionó ningún archivo'}), 400
            
        # Save the uploaded file temporarily
        temp_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(temp_path)
        
        try:
            # Convert to SVG
            svg_data = image_to_svg(temp_path)
            
            if not svg_data:
                return jsonify({'error': 'Error al convertir la imagen a SVG'}), 500
                
            # Clean up the temporary file
            os.remove(temp_path)
            
            return svg_data, 200, {'Content-Type': 'image/svg+xml'}
            
        except Exception as e:
            if os.path.exists(temp_path):
                os.remove(temp_path)
            return jsonify({'error': f'Error al procesar la imagen: {str(e)}'}), 500
            
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)

