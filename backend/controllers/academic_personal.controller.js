const db = require('../models');
const buildAcademicPersonalQuery = require('../helpers/academic_personal.query');

exports.createAcademicPersonal = async (req, res) => {
    try {
        const {type, names, last_name, grade, description } = req.body;

        if (!type || !names || !last_name || !grade) {
            return res.status(400).json({
                error: 'Completo todos los campos.'
            });
        }

        const newAcademicPersonal = await db.AcademicPersonal.create({
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
        const query = buildAcademicPersonalQuery(
            {},
            [['createdAt','ASC']]
        );
        const academicPersonal = await db.AcademicPersonal.findAll(query)
        res.status(200).json(academicPersonal);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
};

exports.deleteAcademicPersonal = async (req, res) => {
    try {
        const {id} = req.params;
        const academicPersonal = await db.AcademicPersonal.findOne({
            where: {id, status: true},
        });
        if (!academicPersonal)
            return res.status(404).json({message: 'Personal académico no encontrado.'});

        await academicPersonal.update({status: false});
        return res.status(200).json({message: 'Datos de personal académico desactivados correctamente.'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}
