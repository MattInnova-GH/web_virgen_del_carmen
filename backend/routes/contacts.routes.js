const express = require('express');
const router = express.Router();
const ContactsControllers = require('../controllers/contacts.controller');

router.post('/contacts/create', ContactsControllers.createContact);
router.get('/contacts/list', ContactsControllers.getContacts);

module.exports = router;