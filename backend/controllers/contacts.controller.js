const db = require('../models');
const buildContactsQuery = require('../helpers/contacts.query');

exports.createContact = async (req, res) => {
    try {
        const {
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

exports.getContacts = async (req, res) => {
    try {
        const query = buildContactsQuery(
            {},
            [['createdAt', 'ASC']]
        );
        const contacts = await db.Contacts.findAll(query);
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}

exports.deleteContacts = async (req, res) => {
    try {
        const {id} = req.params;
        const contacts = await db.Contacts.findOne({
            where: {id, status: true},
        });
        if (!contacts)
            return res.status(404).json({message: 'Contacto no encontrado.'});

        await contacts.update({status: false});
        return res.status(200).json({message: 'Contacto desactivado correctamente.'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}

exports.updateContacts = async (req, res) => {
    const {id} = req.params;
    const {
        phone,
        email,
        location,
        facebook,
        instagram,
        tiktok,
        description
    } = req.body;
    
    try {
        const contacts = await db.Contacts.findByPk(id);
        if(!contacts)
            return res.status(404).json({message: 'Contacto no encontrado.'});

        contacts.phone = phone;
        contacts.email = email;
        contacts.location = location;
        contacts.facebook = facebook;
        contacts.instagram = instagram;
        contacts.tiktok = tiktok;
        contacts.description = description;
        
        await contacts.save();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}