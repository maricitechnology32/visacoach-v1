const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadLessonResource } = require('../middleware/uploadMiddleware');
const { getLessonById, updateLesson, deleteLesson } = require('../controllers/lessonController');

router.route('/:lessonId')
  .get(protect, getLessonById) // Only 'protect' is needed; the controller handles the rest.
  .put(protect, authorize('counselor', 'admin'), uploadLessonResource, updateLesson)
  .delete(protect, authorize('counselor', 'admin'), deleteLesson);

module.exports = router;