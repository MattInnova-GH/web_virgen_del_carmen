const express = require('express');
const router = express.Router();
const ContactsControllers = require('../controllers/contacts.controller');

router.post('/contacts/create', ContactsControllers.createContact);
router.get('/contacts/list', ContactsControllers.getContacts);
router.put('/contacts/update/:id', ContactsControllers.updateContacts);
router.delete('/contacts/delete/:id',ContactsControllers.deleteContacts);

module.exports = router;