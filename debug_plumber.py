import pdfplumber
import sys

def debug_pdf(filepath):
    with pdfplumber.open(filepath) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text(x_tolerance=2, y_tolerance=3) + "\n\n---PAGE---\n\n"
            
    with open("debug_pdf_plumber.txt", "w", encoding="utf-8") as f:
        f.write(text)
        
debug_pdf("public/minutas/1 Minuta_Integrada_Primera_Reunion_Conjunta_2024.pdf")
