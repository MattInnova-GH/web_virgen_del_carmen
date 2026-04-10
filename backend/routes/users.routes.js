const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/users.controller');

router.post('/users/create', UsersControllers.createUsers);

module.exports = router;