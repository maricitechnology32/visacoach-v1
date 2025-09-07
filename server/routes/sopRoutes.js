const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { reviewSop, getSopHistory, generateSop } = require('../controllers/sopController');
const { uploadSop } = require('../middleware/uploadMiddleware');

// The 'uploadSop' middleware runs first to handle the file
router.post('/review', protect, authorize('student'), uploadSop, reviewSop);

// Route for a student to get their submission history
router.get('/history', protect, authorize('student'), getSopHistory);
router.post('/generate', protect, authorize('student'), generateSop);


module.exports = router;