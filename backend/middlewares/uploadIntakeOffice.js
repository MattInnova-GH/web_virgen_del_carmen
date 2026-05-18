const multer = require('multer');
const fs = require('fs');
const path = require('path');

const slugify = (text) => {
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

        const dir = path.join(
            __dirname,
            '..',
            'public',
            'pdf',
            'documents',
            'digital_intake_office'
        );

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },

    filename: (req, file, cb) => {

        const ext = path.extname(file.originalname);

        const baseName = path.basename(
            file.originalname,
            ext
        );

        const safeName = slugify(baseName);

        cb(
            null,
            `${Date.now()}-${safeName}${ext}`
        );
    }
});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        'application/pdf',
        'image/png',
        'image/jpeg',
        'image/jpg'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                'Solo se permiten archivos PDF, JPG, JPEG y PNG'
            ),
            false
        );
    }
};

const uploadDigitalIntakeOffice = multer({
    storage,
    fileFilter,

    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

module.exports = uploadDigitalIntakeOffice;