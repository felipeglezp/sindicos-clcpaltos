import pdfplumber
import os
import re
import csv

minutas_dir = os.path.join("public", "minutas")
output_csv = os.path.join("public", "planteamientos.csv")

def clean_text(text):
    if not text:
        return ""
    # Remover basura específica
    text = re.sub(r'Estatus Solventado', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Página \d+ de \d+', '', text, flags=re.IGNORECASE)
    text = re.sub(r'----------------Page.*Break----------------', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\[sic\]', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Respuesta SAT\s*[:\.]?', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Respuesta:\s*[:\.]?', '', text, flags=re.IGNORECASE)
    text = re.sub(r'^SAT\s*[:\.]?', '', text, flags=re.IGNORECASE)
    
    # Limpiar saltos de línea y espacios dobles
    text = re.sub(r'\r\n|\n|\r', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()

def extract_from_pdf(filepath, filename):
    extracted_data = []
    full_text = ""
    
    with pdfplumber.open(filepath) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text(x_tolerance=2, y_tolerance=3)
            if page_text:
                full_text += page_text + "\n"
    
    # Dividir el texto por "Planteamiento [número]"
    # Usamos lookahead o split para separar en bloques por planteamiento
    blocks = re.split(r'(?i)\n\s*(?:Planteamiento\s*\d+\.?|PETICION QUEJA\s*\d*\.?|Planteamiento\s*PETICION)', full_text)
    
    # El primer bloque es la introducción de la minuta, lo descartamos
    for block in blocks[1:]:
        # Dentro de cada bloque, separar la pregunta de la respuesta SAT
        # Buscamos dónde empieza la respuesta
        parts = re.split(r'(?i)(?:Respuesta SAT:|Respuesta:|Respuesta SAT\s*:|SAT:)', block, maxsplit=1)
        
        if len(parts) == 2:
            titulo_bruto = clean_text(parts[0])
            respuesta_bruta = clean_text(parts[1])
            
            # Quitar "Estatus Solventado" y otros si quedaron
            if len(titulo_bruto) > 10 and len(respuesta_bruta) > 10:
                extracted_data.append({
                    "Titulo": f"Planteamiento: {titulo_bruto}",
                    "RespuestaSAT": respuesta_bruta,
                    "MinutaOrigen": filename.replace('.pdf', '')
                })
        else:
            # Quizás no se encontró la palabra "Respuesta SAT", lo intentamos como todo un título si es necesario
            # pero usualmente todos tienen respuesta.
            pass
            
    return extracted_data

def run():
    print("Iniciando depuración profunda con Python...")
    all_planteamientos = []
    
    if not os.path.exists(minutas_dir):
        print(f"No se encontró el directorio: {minutas_dir}")
        return

    files = [f for f in os.listdir(minutas_dir) if f.endswith('.pdf')]
    
    for file in files:
        filepath = os.path.join(minutas_dir, file)
        try:
            data = extract_from_pdf(filepath, file)
            for d in data:
                d['Archivo'] = f"/minutas/{file}"
            all_planteamientos.extend(data)
            print(f"Procesado {file}: {len(data)} planteamientos.")
        except Exception as e:
            print(f"Error procesando {file}: {e}")
            
    print(f"\nTotal extraído tras limpieza: {len(all_planteamientos)}")
    
    # Escribir a CSV
    with open(output_csv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f, quoting=csv.QUOTE_ALL)
        writer.writerow(["ID", "Titulo", "Tema", "Fecha", "RespuestaSAT", "Archivo", "MinutaOrigen"])
        
        for idx, p in enumerate(all_planteamientos, 1):
            writer.writerow([
                idx,
                p["Titulo"],
                "Varios",  # Tema default
                "2024",    # Fecha default
                p["RespuestaSAT"],
                p["Archivo"],
                p["MinutaOrigen"]
            ])
            
    print("¡Base de datos regenerada perfectamente!")

if __name__ == "__main__":
    run()
