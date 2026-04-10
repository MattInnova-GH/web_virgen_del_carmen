const express = require('express');
const router = express.Router();
const InvestigationsControllers = require('../controllers/investigations.controller');

router.post('/investigations/create', InvestigationsControllers.createInvestigation);

module.exports = router;
