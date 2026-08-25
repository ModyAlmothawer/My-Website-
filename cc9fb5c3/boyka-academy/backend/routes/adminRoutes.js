const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// حماية مسارات الكابتن
router.use(authenticateToken, authorizeRoles('coach', 'admin'));

router.get('/players', adminController.getPlayersList);
router.post('/coach-note', adminController.addCoachNote);
router.post('/programs', adminController.createProgram);

module.exports = router;
