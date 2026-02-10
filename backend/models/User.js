const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['student', 'section-admin', 'super-admin'],
    required: true 
  },
  section: { 
    type: String, 
    enum: ['Examination', 'Scholarship', 'Academics', 'Events', 'Placement', null],
    default: null 
  },
  studentId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);