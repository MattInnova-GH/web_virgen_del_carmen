const multer = require('multer');
const path = require('path');

const slugify = (text) => {
    return text
        .toString()
        .normalize('NFD')                    // elimina tildes
        .replace(/[\u0300-\u036f]/g, '')     // diacríticos
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')         // espacios y símbolos → _
        .replace(/^_+|_+$/g, '')             // trim _
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/pdf');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();

        const baseName = file.originalname.replace(/\.[^/.]+$/, '');
        const safeName = slugify(baseName);

        const uniqueName = `${Date.now()}-${safeName}.${ext}`;

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Solo PDFs'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload;