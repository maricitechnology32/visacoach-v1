// server/routes/financialRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getFinancialProfile, updateFinancialProfile, generateFinancialReport } = require('../controllers/financialController');

// A single route to get and update the student's financial profile
router.route('/')
  .get(protect, authorize('student'), getFinancialProfile)
  .put(protect, authorize('student'), updateFinancialProfile);
router.get('/report', protect, authorize('student'), generateFinancialReport);

module.exports = router;