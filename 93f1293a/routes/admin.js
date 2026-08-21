const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getAllMemorials,
  deleteMemorial,
  toggleMemorial,
} = require('../controllers/memorialController');

// جلب كل الصفحات (للمشرف)
router.get('/memorials', protect, adminOnly, getAllMemorials);

// حذف صفحة
router.delete('/memorials/:id', protect, adminOnly, deleteMemorial);

// تعطيل/تفعيل صفحة
router.patch('/memorials/:id/toggle', protect, adminOnly, toggleMemorial);

module.exports = router;