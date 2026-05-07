const express = require('express');
const router = express.Router();
const AcademicPapersControllers = require('../controllers/academic_papers.controller');
const upload = require('../middlewares/upload');

router.post('/academic_papers/create', upload.single('file'), AcademicPapersControllers.createAcademicPaper);
router.get('/academic_papers/list', AcademicPapersControllers.getAcademicPapers);
router.put('/academic_papers/update/:id', upload.single('file'), AcademicPapersControllers.updateAcademicPaper);
router.delete('/academic_papers/delete/:id/:del', AcademicPapersControllers.deleteAcademicPaper);

module.exports = router;