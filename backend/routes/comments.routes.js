const express = require('express');
const router = express.Router();
const CommentsControllers = require('../controllers/comments.controller');

router.post('/comments/create', CommentsControllers.getComments);
router.get('/comments/list', CommentsControllers.getComments);

module.exports = router;