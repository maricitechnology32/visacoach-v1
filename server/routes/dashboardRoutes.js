// server/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getCounselorDashboard } = require('../controllers/dashboardController');

// Route for a counselor to get their dashboard analytics
router.get('/counselor', protect, authorize('counselor', 'admin'), getCounselorDashboard);

module.exports = router;