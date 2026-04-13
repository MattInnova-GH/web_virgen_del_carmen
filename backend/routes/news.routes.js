const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/news.controller');

router.post('/news/create', NewsController.createNew);
router.get('/news/list', NewsController.getNews);
router.put('/news/update/:id', NewsController.updateNews);
router.delete('/news/delete/:id', NewsController.deleteNews);

module.exports = router;