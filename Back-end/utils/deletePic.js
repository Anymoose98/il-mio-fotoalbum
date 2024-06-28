const path = require('path');
const fs = require('fs');

module.exports = (folderPath, filename) => {
    try {
        const filePath = path.join(__dirname, `../${folderPath}/${filename}`);
        fs.unlinkSync(filePath);
        console.log(`File ${filename} eliminato con successo.`);
    } catch (err) {
        console.error(`Errore durante l'eliminazione del file ${filename}:`, err);
    }
};
