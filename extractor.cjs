const fs = require('fs');
const path = require('path');
const PDFParser = require("pdf2json");

const minutasDir = path.join(__dirname, 'public', 'minutas');
const outputCsv = path.join(__dirname, 'public', 'planteamientos.csv');

// Escribir cabecera del CSV
fs.writeFileSync(outputCsv, 'ID,Titulo,Tema,Fecha,RespuestaSAT,Archivo,MinutaOrigen\n');
let globalId = 1;

function cleanText(text) {
    if (!text) return "";
    return text.replace(/\r\n/g, ' ')
               .replace(/\n/g, ' ')
               .replace(/\s+/g, ' ')
               .replace(/"/g, '""') // Escapar comillas para CSV
               .trim();
}

async function extractFromPdf(filePath, fileName) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);
        
        pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
        pdfParser.on("pdfParser_dataReady", pdfData => {
            const rawText = pdfParser.getRawTextContent();
            
            // Intento básico de separar por la palabra "Planteamiento" y "Respuesta"
            // La regex busca "Planteamiento" seguido de números o texto, hasta que encuentre "Respuesta"
            // Esto es muy heurístico y dependerá del formato exacto
            const regex = /Planteamiento[\s\d\.\:\-]+(.*?)(?=Respuesta|SAT:)(?:Respuesta|SAT:)[\s\.\:\-]+(.*?)(?=Planteamiento|$)/gis;
            
            let match;
            let count = 0;
            
            // Origen de minuta sin la extensión
            const minutaOrigen = fileName.replace('.pdf', '');
            
            while ((match = regex.exec(rawText)) !== null) {
                const tituloBruto = match[1];
                const respuestaBruta = match[2];
                
                // Limpiar textos
                const titulo = "Planteamiento: " + cleanText(tituloBruto).substring(0, 150) + (tituloBruto.length > 150 ? '...' : '');
                const respuesta = cleanText(respuestaBruta);
                const tema = "Varios"; // Por defecto, el usuario lo ajustará
                const fecha = "2024"; // Se puede ajustar manual
                const archivoPath = `/minutas/${fileName}`;
                
                // Solo si encontramos algo sustancial
                if (titulo.length > 15 && respuesta.length > 15) {
                    const csvLine = `${globalId},"${titulo}","${tema}","${fecha}","${respuesta}","${archivoPath}","${minutaOrigen}"\n`;
                    fs.appendFileSync(outputCsv, csvLine);
                    globalId++;
                    count++;
                }
            }
            
            console.log(`Procesado ${fileName}: Encontrados ${count} planteamientos.`);
            resolve();
        });
        
        pdfParser.loadPDF(filePath);
    });
}

async function run() {
    console.log("Iniciando extracción de minutas...");
    const files = fs.readdirSync(minutasDir).filter(f => f.endsWith('.pdf'));
    
    for (const file of files) {
        const filePath = path.join(minutasDir, file);
        try {
            await extractFromPdf(filePath, file);
        } catch (e) {
            console.error(`Error procesando ${file}:`, e);
        }
    }
    
    console.log(`\n¡Proceso completado! Se extrajeron ${globalId - 1} planteamientos en total.`);
    console.log(`El archivo 'public/planteamientos.csv' ha sido actualizado.`);
}

run();
