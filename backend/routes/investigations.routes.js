const express = require('express');
const router = express.Router();
const InvestigationsControllers = require('../controllers/investigations.controller');

router.post('/investigations/create', InvestigationsControllers.createInvestigation);
router.get('/investigations/list', InvestigationsControllers.getInvestigations);

module.exports = router;
