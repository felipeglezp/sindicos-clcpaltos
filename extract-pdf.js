import fs from 'fs';
import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('../1 Minuta_Integrada_Primera_Reunion_Conjunta_2024.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('extracted-data.txt', data.text);
    console.log('PDF text extracted to extracted-data.txt');
}).catch(err => console.error('Error parsing PDF:', err));
