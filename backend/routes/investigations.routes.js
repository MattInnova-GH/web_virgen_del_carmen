const express = require('express');
const router = express.Router();
const InvestigationsControllers = require('../controllers/investigations.controller');
const upload = require('../middlewares/upload');

router.post('/investigations/create', upload.single('file'), InvestigationsControllers.createInvestigation);
router.get('/investigations/list', InvestigationsControllers.getInvestigations);
router.get('/investigations/get/:id', InvestigationsControllers.getInvestigationById);
router.put('/investigations/update/:id', upload.single('file'), InvestigationsControllers.updateInvestigation);
router.delete('/investigations/delete/:id', InvestigationsControllers.deleteInvestigations);

module.exports = router;
