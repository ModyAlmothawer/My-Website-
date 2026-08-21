const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createMemorial,
  getMemorialPublic,
  updateCounter,
  resetCounter,
  reserveJuz,
  addPrayer,
  getMyMemorial,
  updateMemorial,
  uploadImage,
} = require('../controllers/memorialController');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// إعداد multer لرفع الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('يجب رفع صورة'), false);
  },
});

// إنشاء صفحة (محمي)
router.post(
  '/create',
  protect,
  [
    body('name').notEmpty().withMessage('الاسم مطلوب'),
    body('message').notEmpty().withMessage('الرسالة مطلوبة'),
  ],
  createMemorial
);

// عرض صفحة عامة (بدون حماية)
router.get('/p/:pageId', getMemorialPublic);

// تحديث عداد (عام)
router.post('/counter', updateCounter);

// إعادة تعيين عداد (عام)
router.post('/reset-counter', resetCounter);

// حجز جزء (عام)
router.post('/reserve-juz', reserveJuz);

// إضافة دعاء (عام)
router.post('/add-prayer', addPrayer);

// لوحة المستخدم (محمي)
router.get('/my-memorial', protect, getMyMemorial);

// تحديث بيانات الصفحة (محمي)
router.put('/update', protect, updateMemorial);

// رفع صورة (محمي)
router.post('/upload-image', protect, upload.single('image'), uploadImage);

module.exports = router;