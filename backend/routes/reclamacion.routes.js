const express = require('express');
const router = express.Router();
const reclamacionController = require('../controllers/reclamacion.controller');

router.post('/reclamaciones/create', reclamacionController.createReclamacion);
router.get('/reclamaciones/list', reclamacionController.getReclamaciones);
router.put('/reclamaciones/respond/:id', reclamacionController.respondReclamacion);

module.exports = router;
