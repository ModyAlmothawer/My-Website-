const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الاسم مطلوب'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'البريد الإلكتروني مطلوب'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'صيغة البريد الإلكتروني غير صحيحة'],
  },
  password: {
    type: String,
    required: [true, 'كلمة المرور مطلوبة'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  memorials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Memorial',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// تشفير كلمة المرور قبل الحفظ
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// مقارنة كلمة المرور
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);