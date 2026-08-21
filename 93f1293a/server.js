require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');

const app = express();

// ===== الأمان =====
app.use(helmet());

// معدل الطلبات
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // حد أقصى 100 طلب لكل IP
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// CORS
app.use(cors());

// ===== قاعدة البيانات =====
connectDB();

// ===== إعدادات القوالب =====
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ===== Middleware =====
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== ملفات ثابتة =====
app.use(express.static(path.join(__dirname, 'public')));

// ===== مسارات API =====
app.use('/api/auth', require('./routes/auth'));
app.use('/api/memorial', require('./routes/memorial'));
app.use('/api/admin', require('./routes/admin'));

// ===== الصفحة الرئيسية =====
app.get('/', (req, res) => {
  res.render('home', { user: req.user || null });
});

// ===== صفحة إنشاء إهداء (عرض النموذج) =====
app.get('/create', (req, res) => {
  // إذا لم يكن مسجلاً، يوجه لتسجيل الدخول أو يمكن عرض النموذج مع خيار تسجيل
  res.render('create', { user: req.user || null });
});

// ===== معالجة الأخطاء =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'حدث خطأ في الخادم' });
});

// ===== تشغيل الخادم =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});