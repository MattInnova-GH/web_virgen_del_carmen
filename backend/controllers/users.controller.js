const db = require('../models');

exports.createUsers = async (req, res) => {
    try {
        const {names, last_name, username, password, description} = req.body;
        if (!names || !last_name || !username || !password)
            return res.status(400).json({error: 'Complete el campos obligatorios.'});

        const newUser = await db.Users.create({names, last_name, username, password, description});

        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}