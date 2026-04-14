const express = require('express');
const router = express.Router();
const AcademicPersonal = require('../controllers/academic_personal.controller');

router.post('/academic_personal/create', AcademicPersonal.createAcademicPersonal);
router.get('/adacemic_personal/list', AcademicPersonal.getAcademicPersonal);
router.put('/adacemic_personal/update/:id', AcademicPersonal.updateAcademicPersonal);
router.delete('/academic_personal/delete/:id', AcademicPersonal.deleteAcademicPersonal);

module.exports = router;