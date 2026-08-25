const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', programController.getAllPrograms);
router.get('/:id', programController.getProgramById);
router.post('/complete-lesson', authenticateToken, programController.completeLesson);

module.exports = router;
