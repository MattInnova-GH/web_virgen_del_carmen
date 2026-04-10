const db = require('../models')

exports.createComment = async (req, res) => {
    try {
        const {new_id, nickname, comment, description} = req.body;

        if (!new_id || !comment)
            return res.status(400).json({error: 'Complete el campo de comentario.'});

        const newComment = await db.Comments.create({new_id, nickname, comment, description});

        return res.status(201).json(newComment);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }    
}
