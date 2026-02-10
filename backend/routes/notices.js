const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload'); // Make sure this line exists

// Get all active notices (public)
router.get('/', async (req, res) => {
  try {
    const { section, search } = req.query;
    let query = { 
      isActive: true,
      expiryDate: { $gte: new Date() }
    };
    
    if (section) query.section = section;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const notices = await Notice.find(query)
      .populate('postedBy', 'username role')
      .sort({ isImportant: -1, postDate: -1 });
      
    res.json({ success: true, notices });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create notice (admin only)
router.post('/', 
  protect, 
  authorize('section-admin', 'super-admin'),
  upload.single('attachment'), // This should now work
  async (req, res) => {
    try {
      const noticeData = {
        ...req.body,
        postedBy: req.user._id,
        attachment: req.file ? {
          filename: req.file.filename,
          fileUrl: req.file.path,
          fileType: req.file.mimetype
        } : undefined
      };
      
      const notice = await Notice.create(noticeData);
      res.status(201).json({ success: true, notice });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Update notice
router.put('/:id', 
  protect, 
  authorize('section-admin', 'super-admin'),
  upload.single('attachment'), // For updating with new attachment
  async (req, res) => {
    try {
      const notice = await Notice.findById(req.params.id);
      
      if (!notice) {
        return res.status(404).json({ message: 'Notice not found' });
      }
      
      // Check ownership
      if (notice.postedBy.toString() !== req.user._id.toString() 
          && req.user.role !== 'super-admin') {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      const updateData = { ...req.body };
      
      // Add new attachment if uploaded
      if (req.file) {
        updateData.attachment = {
          filename: req.file.filename,
          fileUrl: req.file.path,
          fileType: req.file.mimetype
        };
      }
      
      const updatedNotice = await Notice.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      
      res.json({ success: true, notice: updatedNotice });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete notice
router.delete('/:id', 
  protect, 
  authorize('section-admin', 'super-admin'),
  async (req, res) => {
    try {
      const notice = await Notice.findById(req.params.id);
      
      if (!notice) {
        return res.status(404).json({ message: 'Notice not found' });
      }
      
      // Check ownership
      if (notice.postedBy.toString() !== req.user._id.toString() 
          && req.user.role !== 'super-admin') {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      await Notice.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: 'Notice deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
module.exports = router;