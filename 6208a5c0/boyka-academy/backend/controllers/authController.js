const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password, fullName, phone } = req.body;
  try {
    const userExist = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'البريد الإلكتروني مستخدم بالفعل' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, role',
      [email, passwordHash, 'player']
    );

    const userId = newUser.rows[0].id;

    await db.query(
      'INSERT INTO profiles (user_id, full_name, phone) VALUES ($1, $2, $3)',
      [userId, fullName, phone]
    );

    const token = jwt.sign({ userId, role: 'player' }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(201).json({
      success: true,
      token,
      user: { id: userId, email, fullName, role: 'player' }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'خطأ في خادم النظام' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query(
      `SELECT u.id, u.email, u.password_hash, u.role, p.full_name, p.avatar_url 
       FROM users u 
       JOIN profiles p ON u.id = p.user_id 
       WHERE u.email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        avatarUrl: user.avatar_url
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'خطأ في الخادم' });
  }
};
