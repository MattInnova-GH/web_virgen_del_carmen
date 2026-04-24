const db = require('../models')
const buildCommentsQuery = require('../helpers/comments.query');

exports.createComment = async (req, res) => {
    try {
        let {new_id, nickname, comment, description} = req.body;

        if (!new_id || !comment)
            return res.status(400).json({error: 'Complete el campo de comentario.'});

        nickname = nickname ?? 'Anónimo';

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
        const {new_id} = req.query;

        const whereCondition = {};
        if (new_id)
            whereCondition.new_id = new_id;

        const query = buildCommentsQuery(
            whereCondition,
            [['createdAt', 'DESC']]
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
        const comment = await db.Comments.findByPk(id);
        if (!comment)
            return res.status(404).json({message: 'Comentario no encontrado.'});

        await comment.destroy();
        return res.status(200).json({message: 'Comentario borrado definitivamente.'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}

exports.updateComment = async (req, res) => {
    const {id} = req.params;
    const {new_id, nickname, comment, description} = req.body;

    try {
        const comments = await db.Comments.findByPk(id);
        
        if(!comments)
            return res.status(404).json({message: 'Comentario no encontrado.'});

        comments.new_id = new_id;
        comments.nickname = nickname;
        comments.comment = comment;
        comments.description = description;

        await comments.save();
        res.status(200).json(comments);
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}