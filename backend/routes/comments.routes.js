const express = require('express');
const router = express.Router();
const CommentsControllers = require('../controllers/comments.controller');

router.post('/comments/create', CommentsControllers.createComment);
router.get('/comments/list', CommentsControllers.getComments);
router.put('/comments/update/:id', CommentsControllers.updateComment);
router.delete('/comments/delete/:id', CommentsControllers.deleteComment);

module.exports = router;