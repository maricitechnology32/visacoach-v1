const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { createReview, getApprovedReviews } = require('../controllers/reviewController');

// Route for a student to submit a review
router.post('/', protect, authorize('student'), createReview);

// Public route to get all approved reviews
router.get('/', getApprovedReviews);

module.exports = router;