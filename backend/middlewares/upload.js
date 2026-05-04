const multer = require('multer');
const fs = require('fs');
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

const normalizeType = (text) => {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const type = req.body.type || 'otros';
        const folder = normalizeType(type);

        const dir = path.join(__dirname, '..', 'public', 'pdf', 'documents', folder);

        // crear carpeta si no existe
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },

    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const baseName = file.originalname.replace(/\.[^/.]+$/, '');
        const safeName = slugify(baseName);

        cb(null, `${Date.now()}-${safeName}.${ext}`);
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