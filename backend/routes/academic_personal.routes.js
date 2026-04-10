const express = require('express');
const router = express.Router();
const AcademicPersonal = require('../controllers/academic_personal.controller');

router.post('/academic_personal', AcademicPersonal.createAcademicPersonal);

module.exports = router;