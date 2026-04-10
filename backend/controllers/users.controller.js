const db = require('../models');
const builUsersQuery = require('../helpers/users.query');

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

exports.getUsers = async (req, res) => {
    try {
        const query = builUsersQuery (
            {},
            [['createdAt','ASC']]
        );
        const users = await db.Users.findAll(query);
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await db.Users.findOne({
            where: {id, status: true},
        });
        if (!user)
            return res.status(404).json({message: 'Usuario no encontrado.'});

        await user.update({status: false});
        return res.status(200).json({message: 'Usuario desactivado correctamente.'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}