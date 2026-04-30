const multer = require('multer');
const fs = require('fs');
const path = require('path');

const deleteFile = (fileUrl) => {
    if (!fileUrl) return;

    const filePath = path.join(__dirname, '..', 'public', fileUrl);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

module.exports = deleteFile;