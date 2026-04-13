const express = require('express');
const router = express.Router();
const PressReleasesControllers = require('../controllers/press_releases.controller');

router.post('/press_releases/create', PressReleasesControllers.createPressRelease);
router.get('/press_releases/list', PressReleasesControllers.getPressRelease);
router.put('/press_releases/update/:id', PressReleasesControllers.updatePressRelease);
router.delete('/press_releases/delete/:id', PressReleasesControllers.deletePressReleases);

module.exports = router;