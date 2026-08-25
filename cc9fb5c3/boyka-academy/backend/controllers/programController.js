const db = require('../config/db');

// الحصول على جميع البرامج
exports.getAllPrograms = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM programs WHERE is_published = true ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'خطأ أثناء جلب البرامج' });
  }
};

// جلب تفاصيل برنامج مع الدروس
exports.getProgramById = async (req, res) => {
  const { id } = req.params;
  try {
    const program = await db.query('SELECT * FROM programs WHERE id = $1', [id]);
    if (program.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'البرنامج غير موجود' });
    }

    const lessons = await db.query(
      'SELECT * FROM lessons WHERE program_id = $1 ORDER BY order_index ASC',
      [id]
    );

    res.json({
      success: true,
      program: program.rows[0],
      lessons: lessons.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'خطأ بالخادم' });
  }
};

// تسجيل إكمال درس وتحديث التقدم
exports.completeLesson = async (req, res) => {
  const userId = req.user.userId;
  const { lessonId } = req.body;

  try {
    await db.query(
      'INSERT INTO lesson_progress (user_id, lesson_id, completed) VALUES ($1, $2, true) ON CONFLICT DO NOTHING',
      [userId, lessonId]
    );

    res.json({ success: true, message: 'تم إكمال الدرس وتحديث السجل' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'خطأ في حفظ التقدم' });
  }
};
