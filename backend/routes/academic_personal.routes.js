const express = require('express');
const router = express.Router();
const AcademicPersonal = require('../controllers/academic_personal.controller');
const auth = require('../middlewares/auth');

router.post('/academic_personal/create', auth, AcademicPersonal.createAcademicPersonal);
router.get('/academic_personal/list', AcademicPersonal.getAcademicPersonal);
router.put('/academic_personal/update/:id', auth, AcademicPersonal.updateAcademicPersonal);
router.delete('/academic_personal/delete/:id/:del', auth, AcademicPersonal.deleteAcademicPersonal);

module.exports = router;