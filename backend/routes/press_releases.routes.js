const express = require('express');
const router = express.Router();
const PressReleasesControllers = require('../controllers/press_releases.controller');

router.post('/press_releases/create', PressReleasesControllers.createPressRelease);

module.exports = router;