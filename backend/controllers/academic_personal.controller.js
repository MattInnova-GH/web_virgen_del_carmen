const db = require('../models');
const buildAcadmeicPersonalQuery = require('../helpers/academic_personal.query');

exports.createAcademicPersonal = async (req, res) => {
    try {
        const {type, names, last_name, grade, description } = req.body;

        if (!type || !names || !last_name || !grade) {
            return res.status(400).json({
                error: 'Completo todos los campos.'
            });
        }

        const newInvestigation = await db.Investigations.create({
            type,
            names,
	        last_name,
            grade,
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
    
exports.getAcademicPersonal = async (req, res) => {
    try {
        const query = buildAcadmeicPersonalQuery(

        )
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
};