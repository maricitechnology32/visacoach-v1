

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadDs160Photo } = require('../middleware/uploadMiddleware');

const {
  getMyDs160,
  updateMyDs160,
  submitDs160ForReview,
  getStudentDs160,
  reviewStudentDs160,
  getAllDs160,
  getDs160Stats,
  uploadDs160Photo: uploadDs160PhotoController // Rename for clarity
} = require('../controllers/ds160Controller');

// --- Student Routes ---
router.route('/me')
  .get(protect, authorize('student'), getMyDs160)
  .put(protect, authorize('student'), updateMyDs160);

router.post('/me/photo', protect, authorize('student'), uploadDs160Photo, uploadDs160PhotoController);
router.post('/me/submit', protect, authorize('student'), submitDs160ForReview);

// --- Counselor & Admin Routes ---
router.get('/', protect, authorize('admin', 'counselor'), getAllDs160);
router.get('/consultancy/stats', protect, authorize('counselor', 'admin'), getDs160Stats);
router.get('/student/:studentId', protect, authorize('counselor', 'admin'), getStudentDs160);
router.put('/student/:studentId/review', protect, authorize('counselor', 'admin'), reviewStudentDs160);

module.exports = router;