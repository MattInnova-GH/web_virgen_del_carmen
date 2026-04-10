const db = require('../models')
const buildCommentsQuery = require('../helpers/comments.query');

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

exports.getComments = async (req, res) => {
    try {
        const query = buildCommentsQuery(
            {},
            [['createdAt', 'ASC']]
        );
        const comments = await db.Comments.findAll(query);
        res.status(200).json(comments);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}

exports.deleteComment= async (req, res) => {
    try {
        const {id} = req.params;
        const comment = await db.Comments.findOne({
            where: {id, status: true},
        });
        if (!comment)
            return res.status(404).json({message: 'Comentario no encontrado.'});

        await comment.update({status: false});
        return res.status(200).json({message: 'Comentario desactivado correctamente.'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}
