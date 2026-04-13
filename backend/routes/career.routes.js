const express = require('express');
const router = express.Router();
const CareerControllers = require('../controllers/career.controller');

router.post('/career/create', CareerControllers.createCareer);
router.get('/career/list', CareerControllers.getCareer);
router.put('/career/update/:id', CareerControllers.updateCareer);
router.delete('/career/delete/:id', CareerControllers.deleteCareer);

module.exports = router;