const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  section: { 
    type: String, 
    required: true,
    enum: ['Examination', 'Scholarship', 'Academics', 'Events', 'Placement']
  },
  isImportant: { type: Boolean, default: false },
  postedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  attachment: {
    filename: String,
    fileUrl: String,
    fileType: String
  },
  postDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', noticeSchema);