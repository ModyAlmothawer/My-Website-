const crypto = require('crypto');

// توليد معرف فريد للصفحة (مشابه لـ /p/abc123)
exports.generatePageId = () => {
  return crypto.randomBytes(6).toString('hex'); // 12 حرف عشوائي
};

// تنسيق التاريخ
exports.formatDate = (date) => {
  return new Date(date).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};