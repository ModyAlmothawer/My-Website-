const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // تفعيل قراءة الكوكيز للتوثيق
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', require('./routes/memorial'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

// 404 Handler - الصفحة غير موجودة
app.use((req, res, next) => {
    res.status(404).render('error', { 
        title: '404 - Not Found', 
        message: 'الصفحة التي تبحث عنها غير موجودة' 
    });
});

// Global Error Handler - معالج الأخطاء العام
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        title: '500 - Server Error', 
        message: 'حدث خطأ غير متوقع في الخادم' 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
