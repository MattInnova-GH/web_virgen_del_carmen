const db = require('../models');
const buildInvestigationsQuery = require('../helpers/investigations.query');
const deleteFile = require('../middlewares/deleteFile');

exports.createInvestigation = async (req, res) => {
    try {
        const { title, author, content, publication_date, description } = req.body;

        if (!title || !content)
            return res.status(400).json({error: 'Complete los campos obligatorios.'});

        let pdf_url = null;

        if (req.file)
            pdf_url = `/pdf/${req.file.filename}`;

        const newInvestigation = await db.Investigations.create({
            title,
            author,
            content,
            pdf_url,
            publication_date,
            description
        });

        return res.status(201).json(newInvestigation);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'});
    }
};

exports.getInvestigations = async (req, res) => {
    try {
        const query = buildInvestigationsQuery(
            {},
            [['createdAt', 'ASC']]
        );
        const investigations = await db.Investigations.findAll(query);
        res.status(200).json(investigations);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}

exports.deleteInvestigations = async (req, res) => {
    try {
        const { id } = req.params;
        const investigation = await db.Investigations.findOne({
            where: { id, status: true },
        });
        if (!investigation)
            return res.status(404).json({ message: 'Investigación no encontrada.' });

        deleteFile(investigation.pdf_url);

        await investigation.update({ status: false });
        return res.status(200).json({ message: 'Investigación desactivada correctamente.' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}

exports.updateInvestigation = async (req, res) => {
    const { id } = req.params;
    const { title, author, content, pdf_url, publication_date, description } = req.body;
    try {
        const investigations = await db.Investigations.findByPk(id);

        if (!investigations)
            return res.status(404).json({ message: 'Investigación no encontrada.' });

        if (req.file){
            deleteFile(investigations.pdf_url);
            investigations.pdf_url = `/pdf/${req.file.filename}`;
        }

        investigations.title = title;
        investigations.content = content;
        investigations.author = author;
        investigations.publication_date = publication_date;
        investigations.description = description;

        await investigations.save();
        res.status(200).json(investigations);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}
