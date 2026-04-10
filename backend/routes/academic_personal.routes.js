const express = require('express');
const router = express.Router();
const AcademicPersonal = require('../controllers/academic_personal.controller');

router.post('/academic_personal/create', AcademicPersonal.createAcademicPersonal);
router.get('/adacemic_personal/list', AcademicPersonal.getAcademicPersonal);

module.exports = router;