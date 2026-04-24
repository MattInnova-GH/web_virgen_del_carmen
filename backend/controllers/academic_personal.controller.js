const db = require('../models');
const buildAcademicPersonalQuery = require('../helpers/academic_personal.query');

exports.createAcademicPersonal = async (req, res) => {
    try {
        const {type, names, last_names, grade, img_url, year, description } = req.body;

        if (!type || !names || !last_names || !grade || !year) {
            return res.status(400).json({
                error: 'Complete todos los campos.'
            });
        }
        const newAcademicPersonal = await db.AcademicPersonal.create({
            type,
            names,
	        last_names,
            grade,
            img_url,
            year,
            description
        });
        return res.status(201).json(newAcademicPersonal);
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

exports.updateAcademicPersonal = async (req, res) => {
    const {id} = req.params;
    const {type, names, last_names, grade, description, img_url, year } = req.body;
    try {
        const academicPersonal =  await db.AcademicPersonal.findByPk(id);
        if(!academicPersonal)
            return res.status(404).json({message: 'Personal académico no encontrado.'});

        academicPersonal.type = type;
        academicPersonal.names = names;
        academicPersonal.last_names = last_names;
        academicPersonal.grade = grade;
        academicPersonal.img_url = img_url;
        academicPersonal.year = year;
        academicPersonal.description = description;

        await academicPersonal.save();
        res.status(200).json(academicPersonal);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}