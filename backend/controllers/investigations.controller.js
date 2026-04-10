const db = require('../models');
const buildInvestigationsQuery = require('../helpers/investigations.query');

exports.createInvestigation = async (req, res) => {
    try {
        const { title, investigation, img_url, description } = req.body;

        if (!title || !investigation || !img_url) {
            return res.status(400).json({
                error: 'El título, la investion o la imgagen url es obligatorio.'
            });
        }

        const newInvestigation = await db.Investigations.create({
            title,
            investigation,
            img_url,
            description
        });

        return res.status(201).json(newInvestigation);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
};

exports.getInvestigations = async (req, res) => {
    try {
        const query = buildInvestigationsQuery(
            {},
            [['createdAt','ASC']]
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
        const {id} = req.params;
        const investigation = await db.Investigations.findOne({
            where: {id, status: true},
        });
        if (!investigation)
            return res.status(404).json({message: 'Investigación no encontrado.'});

        await investigation.update({status: false});
        return res.status(200).json({message: 'Investigación desactivada correctamente.'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}
