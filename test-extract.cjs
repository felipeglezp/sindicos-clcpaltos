const fs = require('fs');
const pdf = require('pdf-parse');

async function extract() {
    try {
        const dataBuffer = fs.readFileSync('public/minutas/1 Minuta_Integrada_Primera_Reunion_Conjunta_2024.pdf');
        const data = await pdf(dataBuffer);
        fs.writeFileSync('test-output.txt', data.text);
        console.log('Extraction complete. Check test-output.txt');
    } catch (e) {
        console.error('Error:', e);
    }
}

extract();
