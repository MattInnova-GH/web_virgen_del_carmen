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
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'});
    }
}

exports.getNews = async(req, res) => {
    try {
        const query = buildNewsQuery(
            {status: true},
            [['createdAt', 'DESC']]
        )
        const allNews = await db.News.findAll(query);
        res.status(200).json(allNews);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'});
    }
}

exports.deleteNews = async (req, res) => {
    try {
        const {id} = req.params;
        const news = await db.News.findOne({
            where: {id, status: true},
        });
        if (!news)
            return res.status(404).json({message: 'Noticia no encontrada.'});

        await news.update({status: false});
        return res.status(200).json({message: 'Noticia desactivada correctamente.'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}

exports.updateNews = async (req, res) => {
    const {id} = req.params;
    const {title, content, img_url, description} = req.body;

    try {
        const news = await db.News.findByPk(id);

        if(!news)
            return res.status(404).json({message: 'Noticia no encontrada.'});
    
        news.title = title;
        news.content = content;
        news.img_url = img_url;
        news.description = description;

        await news.save();
        res.status(200).json(news);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error interno del servidor. Inténtelo de nuevo más tarde.'
        });
    }
}
