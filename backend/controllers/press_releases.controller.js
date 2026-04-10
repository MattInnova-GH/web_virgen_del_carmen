const db = require('../models');
const buildPressReleasesQuery = require('../helpers/press_releases.query');

exports.createPressRelease = async (req, res) => {
    try {
        const { title, press_release, description } = req.body;

        if (!title) {
            return res.status(400).json({
                error: 'El título es obligatorio.'
            });
        }

        const newPressRelease = await db.PressReleases.create({
            title,
            press_release,
            description
        });

        return res.status(201).json(newPressRelease);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor.'
        });
    }
};

exports.getPressRelease = async (req, res) => {
    try {
        const query = buildPressReleasesQuery(
            {},
            [['createdAt','ASC']]
        );
        const pressReleases = await db.PressReleases.findAll(query);
        res.status(200).json(pressReleases);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'});
    }
}

exports.deletePressReleases = async (req, res) => {
    try {
        const {id} = req.params;
        const pressReleases = await db.PressReleases.findOne({
            where: {id, status: true},
        });
        if (!pressReleases)
            return res.status(404).json({message: 'Comunicado no encontrado.'});

        await pressReleases.update({status: false});
        return res.status(200).json({message: 'Comunicado desactivado correctamente.'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}