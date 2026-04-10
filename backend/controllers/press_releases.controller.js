const db = require('../models');

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
