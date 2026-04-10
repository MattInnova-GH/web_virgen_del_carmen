const db = require('../models');

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
