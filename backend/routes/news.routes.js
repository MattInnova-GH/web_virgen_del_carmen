const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/news.controller');

router.post('/news/create', NewsController.createNew);
router.get('/news/list', NewsController.getNews);

module.exports = router;