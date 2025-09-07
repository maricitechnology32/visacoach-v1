// server/routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// 1. Import the necessary upload middleware
const { uploadThumbnail, uploadLessonResource } = require('../middleware/uploadMiddleware');

const {
  createCourse,
  getAllCourses,
  getCourseById,
  getMyCourses,
  addLessonToModule,
  uploadCourseThumbnail,
} = require('../controllers/courseController');

router.route('/')
  .get(protect, getAllCourses)
  .post(protect, authorize('counselor', 'admin'), createCourse);

router.get('/my-courses', protect, authorize('counselor', 'admin'), getMyCourses);

// 2. (FIX) Add the 'uploadLessonResource' middleware to this route
router.post(
  '/:courseId/lessons',
  protect,
  authorize('counselor', 'admin'),
  uploadLessonResource,
  addLessonToModule
);

router.put('/:courseId/thumbnail', protect, authorize('counselor', 'admin'), uploadThumbnail, uploadCourseThumbnail);

router.get('/:id', protect, getCourseById);

module.exports = router;