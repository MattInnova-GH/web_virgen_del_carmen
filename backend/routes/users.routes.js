const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/users.controller');

router.post('/users/create', UsersControllers.createUsers);
router.get('/users/list', UsersControllers.getUsers);
router.put('/users/update/:id', UsersControllers.updateUser);
router.delete('/users/delete/:id', UsersControllers.deleteUser);

module.exports = router;