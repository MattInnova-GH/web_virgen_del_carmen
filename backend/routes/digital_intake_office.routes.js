const express = require('express');
const router = express.Router();
const DigitalIntakeOfficeControllers = require('../controllers/digital_intake_office.controller');
const uploadDigitalIntakeOffice = require('../middlewares/uploadIntakeOffice');

// Rutas existentes
router.post('/digital_intake_office/create', uploadDigitalIntakeOffice.single('attached_file'), DigitalIntakeOfficeControllers.createDigitalIntake);
router.get('/digital_intake_office/list', DigitalIntakeOfficeControllers.getDigitalIntake);

// === AGREGAMOS LAS RUTAS QUE CAUSABAN EL 404 ===
router.put('/digital_intake_office/update/:id', DigitalIntakeOfficeControllers.updateDigitalIntake);
router.delete('/digital_intake_office/delete/:id', DigitalIntakeOfficeControllers.deleteDigitalIntake);

module.exports = router;