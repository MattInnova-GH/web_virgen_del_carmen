const db = require('../models');

exports.createContact = async (req, res) => {
    try {
        const {
            icon_img_url,
            phone,
            email,
            location,
            facebook,
            instagram,
            tiktok,
            description
        } = req.body;

        if (!icon_img_url || !phone || !email || !location) {
            return res.status(400).json({
                error: 'Complete los campos obligatorios.'
            });
        }

        const newContact = await db.Contacts.create({
            icon_img_url,
            phone,
            email,
            location,
            facebook,
            instagram,
            tiktok,
            description
        });

        return res.status(201).json(newContact);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor.'
        });
    }
};
