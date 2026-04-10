const db = require('../models');
const buildNewsQuery = require('../helpers/news.query');

exports.createNew = async (req, res) => {
    try {
        const {title, content, img_url, description} = req.body;
        if (!title || !content || !img_url)
            return res.status(400).json({error: 'Complete el título, contenido o imagen.'});
        const newContent = await db.News.create({
            title, content, img_url, description
        });
        return res.status(201).json(newContent);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'});
    }
}

exports.getNews = async(req, res) => {
    try {
        const query = buildNewsQuery(
            {},
            [['createdAt', 'ASC']]
        )
        const allNews = await db.News.findAll(query);
        res.status(200).json(allNews);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'});
    }
}