// server/routes/timelineRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { submitTimeline, getTimelineAnalytics } = require('../controllers/timelineController');

// Route for a student to submit or update their timeline
router.post('/', protect, authorize('student'), submitTimeline);

// Route for any logged-in user to view the analytics
router.get('/', protect, getTimelineAnalytics);

module.exports = router;