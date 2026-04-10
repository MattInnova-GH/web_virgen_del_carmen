const express = require('express');
const router = express.Router();
const CareerControllers = require('../controllers/career.controller');

router.post('/career/create', CareerControllers.createCareer);

module.exports = router;