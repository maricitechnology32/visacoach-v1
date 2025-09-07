const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

const {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
  getApplicationStats,
} = require('../controllers/applicationController');

// Routes for listing and creating applications
router.route('/')
  .get(protect, authorize('counselor', 'admin'), getApplications)
  .post(protect, authorize('counselor', 'admin'), createApplication);

// Route for getting analytics data
router.get('/stats', protect, authorize('counselor', 'admin'), getApplicationStats);

// Routes for updating and deleting a specific application
router.route('/:id')
  .put(protect, authorize('counselor', 'admin'), updateApplication)
  .delete(protect, authorize('counselor', 'admin'), deleteApplication);

module.exports = router;