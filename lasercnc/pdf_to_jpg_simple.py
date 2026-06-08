import os
import sys
import fitz  # PyMuPDF
from PIL import Image

def pdf_to_jpg(pdf_path, output_folder=None, zoom=2.0):
    """
    Convierte un archivo PDF a imágenes JPG usando PyMuPDF.
    
    Args:
        pdf_path (str): Ruta al archivo PDF.
        output_folder (str, opcional): Carpeta de salida. Si es None, se usa la misma carpeta del PDF.
        zoom (float): Factor de zoom para mejorar la calidad de la imagen.
    """
    if not os.path.exists(pdf_path):
        print(f"Error: El archivo {pdf_path} no existe.")
        return
    
    # Obtener la carpeta de salida
    if output_folder is None:
        output_folder = os.path.dirname(pdf_path) or '.'
    
    # Crear la carpeta de salida si no existe
    os.makedirs(output_folder, exist_ok=True)
    
    # Obtener el nombre base del archivo sin extensión
    base_name = os.path.splitext(os.path.basename(pdf_path))[0]
    
    try:
        # Abrir el PDF
        doc = fitz.open(pdf_path)
        total_pages = len(doc)
        
        print(f"Convirtiendo {pdf_path}...")
        
        # Procesar cada página
        for page_num in range(total_pages):
            # Obtener la página
            page = doc.load_page(page_num)
            
            # Calcular la matriz de transformación para mejor calidad
            mat = fitz.Matrix(zoom, zoom)
            
            # Renderizar la página como imagen (pixmap)
            pix = page.get_pixmap(matrix=mat)
            
            # Crear el nombre del archivo de salida
            output_filename = f"{base_name}_page_{page_num + 1}.jpg"
            output_path = os.path.join(output_folder, output_filename)
            
            # Guardar como JPG
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            img.save(output_path, "JPEG", quality=95)
            
            print(f"Página {page_num + 1}/{total_pages} guardada como {output_path}")
        
        print(f"\n¡Conversión completada! Se generaron {total_pages} imágenes.")
        
    except Exception as e:
        print(f"Error al procesar el archivo: {str(e)}")
    finally:
        if 'doc' in locals():
            doc.close()

def main():
    if len(sys.argv) < 2:
        print("Uso: python pdf_to_jpg_simple.py <ruta_al_archivo.pdf> [carpeta_salida]")
        print("Ejemplo: python pdf_to_jpg_simple.py documento.pdf imagenes")
        return
    
    pdf_path = sys.argv[1]
    output_folder = sys.argv[2] if len(sys.argv) > 2 else None
    
    pdf_to_jpg(pdf_path, output_folder)

if __name__ == "__main__":
    main()
