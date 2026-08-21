const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// تسجيل
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('الاسم مطلوب'),
    body('email').isEmail().withMessage('بريد إلكتروني صحيح'),
    body('password').isLength({ min: 6 }).withMessage('كلمة المرور 6 أحرف على الأقل'),
  ],
  register
);

// تسجيل الدخول
router.post('/login', login);

// جلب بيانات المستخدم (محمي)
router.get('/me', protect, getMe);

module.exports = router;