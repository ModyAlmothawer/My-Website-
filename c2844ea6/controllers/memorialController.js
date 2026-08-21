const Memorial = require('../models/Memorial');
const User = require('../models/User');
const { generatePageId } = require('../utils/helpers');
const { validationResult } = require('express-validator');

// ========== إنشاء صفحة إهداء ==========
exports.createMemorial = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, message, birthDate, deathDate, pageColor, customDua } = req.body;

    // إنشاء معرف فريد
    let pageId = generatePageId();
    // التأكد من عدم التكرار
    let existing = await Memorial.findOne({ pageId });
    while (existing) {
      pageId = generatePageId();
      existing = await Memorial.findOne({ pageId });
    }

    // إنشاء الصفحة
    const memorial = new Memorial({
      pageId,
      owner: req.user.id,
      name,
      message,
      birthDate: birthDate || null,
      deathDate: deathDate || null,
      pageColor: pageColor || '#f5f0eb',
      customDua: customDua || '',
      // سيتم تهيئة الخرائط تلقائياً
    });

    await memorial.save();

    // ربط الصفحة بالمستخدم
    await User.findByIdAndUpdate(req.user.id, { $push: { memorials: memorial._id } });

    res.status(201).json({
      message: 'تم إنشاء الصفحة بنجاح',
      pageId: memorial.pageId,
      url: `/p/${memorial.pageId}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

// ========== جلب صفحة عامة (للزوار) ==========
exports.getMemorialPublic = async (req, res) => {
  try {
    const { pageId } = req.params;
    const memorial = await Memorial.findOne({ pageId, isActive: true });
    if (!memorial) {
      return res.status(404).render('error', { message: 'الصفحة غير موجودة أو معطلة' });
    }

    // زيادة عدد الزوار
    memorial.stats.visitors += 1;
    await memorial.save();

    // تحويل الخرائط إلى كائنات JavaScript لتسهيل العرض
    const counters = Object.fromEntries(memorial.counters);
    const quranCompletion = Object.fromEntries(memorial.quranCompletion);

    res.render('memorial', {
      memorial,
      counters,
      quranCompletion,
      user: req.user || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'حدث خطأ' });
  }
};

// ========== تحديث عداد ذكر ==========
exports.updateCounter = async (req, res) => {
  try {
    const { pageId, dhikr } = req.body;
    const memorial = await Memorial.findOne({ pageId, isActive: true });
    if (!memorial) {
      return res.status(404).json({ message: 'الصفحة غير موجودة' });
    }

    // التحقق من وجود الذكر
    if (!memorial.counters.has(dhikr)) {
      return res.status(400).json({ message: 'ذكر غير معروف' });
    }

    // زيادة العداد
    const current = memorial.counters.get(dhikr) || 0;
    memorial.counters.set(dhikr, current + 1);
    memorial.stats.totalTasbih += 1;
    await memorial.save();

    res.json({ success: true, newCount: current + 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

// ========== إعادة تعيين عداد ==========
exports.resetCounter = async (req, res) => {
  try {
    const { pageId, dhikr } = req.body;
    const memorial = await Memorial.findOne({ pageId, isActive: true });
    if (!memorial) {
      return res.status(404).json({ message: 'الصفحة غير موجودة' });
    }

    if (!memorial.counters.has(dhikr)) {
      return res.status(400).json({ message: 'ذكر غير معروف' });
    }

    const old = memorial.counters.get(dhikr) || 0;
    memorial.counters.set(dhikr, 0);
    memorial.stats.totalTasbih -= old;
    await memorial.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

// ========== حجز جزء من ختم القرآن ==========
exports.reserveJuz = async (req, res) => {
  try {
    const { pageId, juzNumber, visitorName } = req.body;
    const memorial = await Memorial.findOne({ pageId, isActive: true });
    if (!memorial) {
      return res.status(404).json({ message: 'الصفحة غير موجودة' });
    }

    const juzKey = juzNumber.toString();
    if (!memorial.quranCompletion.has(juzKey)) {
      return res.status(400).json({ message: 'رقم جزء غير صحيح' });
    }

    if (memorial.quranCompletion.get(juzKey) !== null) {
      return res.status(400).json({ message: 'هذا الجزء محجوز بالفعل' });
    }

    // حجز الجزء
    memorial.quranCompletion.set(juzKey, visitorName || 'زائر');
    memorial.stats.totalCompletions += 1;
    await memorial.save();

    res.json({ success: true, message: 'تم حجز الجزء بنجاح' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

// ========== إضافة دعاء ==========
exports.addPrayer = async (req, res) => {
  try {
    const { pageId, visitorName, text } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: 'نص الدعاء مطلوب' });
    }

    const memorial = await Memorial.findOne({ pageId, isActive: true });
    if (!memorial) {
      return res.status(404).json({ message: 'الصفحة غير موجودة' });
    }

    memorial.prayers.push({
      visitorName: visitorName || 'زائر',
      text: text.trim(),
    });
    memorial.stats.totalPrayers += 1;
    await memorial.save();

    res.json({ success: true, message: 'تم إضافة الدعاء' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

// ========== جلب بيانات الصفحة للمالك (لوحة المستخدم) ==========
exports.getMyMemorial = async (req, res) => {
  try {
    const memorial = await Memorial.findOne({ owner: req.user.id });
    if (!memorial) {
      return res.status(404).json({ message: 'لم تقم بإنشاء صفحة بعد' });
    }
    const counters = Object.fromEntries(memorial.counters);
    const quranCompletion = Object.fromEntries(memorial.quranCompletion);
    res.render('admin', { memorial, counters, quranCompletion, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

// ========== تحديث بيانات الصفحة (للمالك) ==========
exports.updateMemorial = async (req, res) => {
  try {
    const { name, message, birthDate, deathDate, pageColor, customDua } = req.body;
    const memorial = await Memorial.findOne({ owner: req.user.id });
    if (!memorial) {
      return res.status(404).json({ message: 'الصفحة غير موجودة' });
    }

    memorial.name = name || memorial.name;
    memorial.message = message || memorial.message;
    memorial.birthDate = birthDate || memorial.birthDate;
    memorial.deathDate = deathDate || memorial.deathDate;
    memorial.pageColor = pageColor || memorial.pageColor;
    memorial.customDua = customDua || memorial.customDua;

    await memorial.save();
    res.json({ success: true, message: 'تم تحديث الصفحة' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

// ========== رفع صورة (للمالك) ==========
exports.uploadImage = async (req, res) => {
  try {
    // نفترض أن multer تم إعدادها وتخزين الملف في req.file
    if (!req.file) {
      return res.status(400).json({ message: 'لم يتم رفع أي صورة' });
    }
    const memorial = await Memorial.findOne({ owner: req.user.id });
    if (!memorial) {
      return res.status(404).json({ message: 'الصفحة غير موجودة' });
    }

    // مسار الصورة (سيتم تخزينها في public/images)
    const imagePath = `/images/${req.file.filename}`;
    memorial.image = imagePath;
    await memorial.save();

    res.json({ success: true, imageUrl: imagePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

// ========== (للمشرف) جلب كل الصفحات ==========
exports.getAllMemorials = async (req, res) => {
  try {
    const memorials = await Memorial.find().populate('owner', 'name email');
    res.json(memorials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

// ========== (للمشرف) حذف صفحة ==========
exports.deleteMemorial = async (req, res) => {
  try {
    const { id } = req.params;
    await Memorial.findByIdAndDelete(id);
    res.json({ success: true, message: 'تم حذف الصفحة' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

// ========== (للمشرف) تعطيل/تفعيل صفحة ==========
exports.toggleMemorial = async (req, res) => {
  try {
    const { id } = req.params;
    const memorial = await Memorial.findById(id);
    if (!memorial) return res.status(404).json({ message: 'غير موجود' });
    memorial.isActive = !memorial.isActive;
    await memorial.save();
    res.json({ success: true, isActive: memorial.isActive });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};