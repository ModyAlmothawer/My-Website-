const db = require('../config/db');

// جلب جميع اللاعبين للكابتن
exports.getPlayersList = async (req, res) => {
  try {
    const query = `
      SELECT u.id, u.email, p.full_name, p.phone, p.current_level, p.streak_days, u.created_at
      FROM users u
      JOIN profiles p ON u.id = p.user_id
      WHERE u.role = 'player'
      ORDER BY u.created_at DESC
    `;
    const result = await db.query(query);
    res.json({ success: true, players: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'خطأ في جلب بيانات اللاعبين' });
  }
};

// إضافة ملاحظة تدريبية للاعب بواسطة الكابتن
exports.addCoachNote = async (req, res) => {
  const coachId = req.user.userId;
  const { playerId, note } = req.body;

  try {
    await db.query(
      'INSERT INTO coach_notes (player_id, coach_id, note) VALUES ($1, $2, $3)',
      [playerId, coachId, note]
    );
    res.json({ success: true, message: 'تمت إضافة الملاحظة التدريبية بنجاح' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'خطأ في إضافة الملاحظة' });
  }
};

// إنشاء برنامج جديد من قبل الكابتن
exports.createProgram = async (req, res) => {
  const { title, slug, description, category, level, durationWeeks, coverImage } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO programs (title, slug, description, category, level, duration_weeks, cover_image, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true) RETURNING *`,
      [title, slug, description, category, level, durationWeeks, coverImage]
    );

    res.status(201).json({ success: true, program: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'خطأ في إنشاء البرنامج' });
  }
};
