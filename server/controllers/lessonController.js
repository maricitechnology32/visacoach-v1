


// module.exports = {  getLessonById, updateLesson, deleteLesson };
// server/controllers/lessonController.js
const Lesson = require('../models/lessonModel');
const Course = require('../models/courseModel');
const fs = require('fs');
const path = require('path');

// @desc    Get a single lesson by ID
// @route   GET /api/lessons/:lessonId
// @access  Student / Counselor / Admin (same consultancy only)
const getLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const parentCourse = await Course.findOne({ 'modules.lessons': lessonId });
    if (!parentCourse) {
      return res.status(404).json({ message: 'Could not find parent course for this lesson.' });
    }

    if (parentCourse.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this lesson.' });
    }

    res.status(200).json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a lesson
// @route   PUT /api/lessons/:lessonId
// @access  Counselor / Admin (same consultancy only)
const updateLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { title, content, videoUrl } = req.body;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const parentCourse = await Course.findOne({ 'modules.lessons': lessonId });
    if (!parentCourse || parentCourse.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this lesson.' });
    }

    // Update fields
    lesson.title = title?.trim() || lesson.title;
    lesson.content = content?.trim() || lesson.content;
    lesson.videoUrl = videoUrl || lesson.videoUrl;

    // Handle new resource upload
    if (req.file) {
      // Delete old file if exists
      if (lesson.resource?.filePath) {
        const oldPath = path.join(__dirname, `../..${lesson.resource.filePath}`);
        fs.unlink(oldPath, (err) => {
          if (err) console.error('Error deleting old resource file:', err);
        });
      }

      lesson.resource = {
        fileName: req.file.originalname,
        filePath: `/${req.file.path.replace(/\\/g, '/')}`,
      };
    }

    const updatedLesson = await lesson.save();
    res.json(updatedLesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a lesson
// @route   DELETE /api/lessons/:lessonId
// @access  Counselor / Admin (same consultancy only)
const deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const parentCourse = await Course.findOne({ 'modules.lessons': lessonId });
    if (!parentCourse || parentCourse.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this lesson.' });
    }

    // Delete lesson document
    await Lesson.findByIdAndDelete(lessonId);

    // Remove reference from parent course modules
    await Course.findByIdAndUpdate(parentCourse._id, {
      $pull: { 'modules.$[].lessons': lessonId },
    });

    // Delete attached file if exists
    if (lesson.resource?.filePath) {
      const filePath = path.join(__dirname, `../..${lesson.resource.filePath}`);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting resource file:', err);
      });
    }

    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getLessonById, updateLesson, deleteLesson };
