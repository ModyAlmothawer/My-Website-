const mongoose = require('mongoose');

const MemorialSchema = new mongoose.Schema({
  // بيانات الصفحة
  pageId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'اسم الميت مطلوب'],
    trim: true,
  },
  image: {
    type: String,
    default: '/images/default-avatar.png',
  },
  message: {
    type: String,
    required: [true, 'الرسالة مطلوبة'],
    maxlength: 500,
  },
  birthDate: {
    type: Date,
  },
  deathDate: {
    type: Date,
  },
  pageColor: {
    type: String,
    default: '#f5f0eb', // لون هادئ
  },
  customDua: {
    type: String,
    maxlength: 300,
  },
  // إعدادات العدادات
  counters: {
    type: Map,
    of: Number,
    default: new Map([
      ['سبحان الله', 0],
      ['الحمد لله', 0],
      ['الله أكبر', 0],
      ['لا إله إلا الله', 0],
      ['أستغفر الله', 0],
      ['سبحان الله وبحمده', 0],
      ['سبحان الله العظيم', 0],
      ['لا حول ولا قوة إلا بالله', 0],
      ['اللهم صل وسلم على نبينا محمد', 0],
    ]),
  },
  // ختم القرآن: كل جزء يحجزه مستخدم
  quranCompletion: {
    type: Map,
    of: String, // اسم المستخدم الذي حجز الجزء
    default: new Map(),
    // سنقوم بتهيئة الأجزاء 1-30 في الكود
  },
  // قسم الدعاء (تعليقات الزوار)
  prayers: [{
    visitorName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      maxlength: 300,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  // إحصائيات
  stats: {
    visitors: {
      type: Number,
      default: 0,
    },
    totalTasbih: {
      type: Number,
      default: 0,
    },
    totalPrayers: {
      type: Number,
      default: 0,
    },
    totalCompletions: {
      type: Number,
      default: 0,
    },
  },
  // حالة الصفحة
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// تهيئة الأجزاء 1-30 عند إنشاء الصفحة
MemorialSchema.pre('save', function (next) {
  if (this.isNew) {
    for (let i = 1; i <= 30; i++) {
      this.quranCompletion.set(i.toString(), null);
    }
  }
  next();
});

module.exports = mongoose.model('Memorial', MemorialSchema);