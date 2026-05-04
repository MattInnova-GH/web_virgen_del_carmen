const db = require('../models');
const buildAcademicPapersQuery = require('../helpers/academic_papers.query');
const deleteFile = require('../middlewares/deleteFile');

const normalizeType = (text) => {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
};

exports.createAcademicPaper = async (req, res) => {
    try {
        const { title, type, year, description } = req.body;

        if (!title || !type || !year)
            return res.status(400).json({ error: 'Complete los campos obligatorios.' });

        let pdf_url = null;

        if (req.file) {
            const folder = normalizeType(type);
            pdf_url = `/pdf/documents/${folder}/${req.file.filename}`;
        }

        const newAcademicPaper = await db.AcademicPapers.create({
            title, type, pdf_url, year, description
        });

        return res.status(201).json(newAcademicPaper);
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: 'Error interno del servidor. Inténtelo de nuevo más tarde.' });
    }
}

exports.getAcademicPapers = async (req, res) => {
    try {
        const { type } = req.query;
        const whereCondition = {};

        if (type)
            whereCondition.type = type;

        const query = buildAcademicPapersQuery(
            whereCondition,
            [['createdAt', 'ASC']]
        );

        const academicPapers = await db.AcademicPapers.findAll(query);
        res.status(200).json(academicPapers);
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: 'Error interno del servidor. Inténtelo de nuevo más tarde.' });
    }
}

exports.updateAcademicPaper = async (req, res) => {
    const { id } = req.params;
    const { title, type, pdf_url, year, description } = req.body;

    try {
        const academicPaper = await db.AcademicPapers.findByPk(id);

        if (!academicPaper)
            return res.status(404).json({ message: 'Documento no encontrado.' });

        if (req.file) {
            deleteFile(academicPaper.pdf_url);
            const folder = normalizeType(type);
            academicPaper.pdf_url = `/pdf/documents/${folder}/${req.file.filename}`;
        }

        academicPaper.title = title;
        academicPaper.type = type;
        academicPaper.year = year;
        academicPaper.description = description;

        await academicPaper.save();
        res.status(200).json(academicPaper);
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: 'Error interno del servidor. Inténtelo de nuevo más tarde.' });
    }
}

exports.deleteAcademicPaper = async (req, res) => {
    try {
        const { id } = req.params;
        const academicPaper = await db.AcademicPapers.findOne({
            where: { id, status: true },
        });
        if (!academicPaper)
            return res.status(404).json({ message: 'Documento no encontrado.' });

        deleteFile(academicPaper.pdf_url);

        await academicPaper.update({ status: false });
        return res.status(200).json({ message: 'Documento desactivado correctamente.' });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: 'Error interno del servidor. Inténtelo de nuevo más tarde.' });
    }
}