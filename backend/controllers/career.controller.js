const db = require('../models');

exports.createCareer = async (req, res) => {
    try {
        const {
            history,
            mision,
            vision,
            values,
            description
        } = req.body;

        
        if (!history && !mision && !vision && !values) {
            return res.status(400).json({
                error: 'La Historia, la mision, la vision o los valores son obligatorios.'
            });
        }

        const newCareer = await db.Career.create({
            history,
            mision,
            vision,
            values,
            description
        });

        return res.status(201).json(newCareer);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
};
