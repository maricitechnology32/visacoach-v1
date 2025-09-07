// server/routes/consultancyRoutes.js

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createConsultancy,
  getConsultancies,
  updateConsultancy,
  toggleConsultancyStatus
} = require('../controllers/consultancyController');

// Routes for the main collection URL: /api/consultancies
router.route('/')
  .post(protect, authorize('super-admin'), createConsultancy)
  .get(protect, authorize('super-admin'), getConsultancies);

// Route for updating a specific consultancy: /api/consultancies/:id
router.route('/:id')
  .put(protect, authorize('super-admin'), updateConsultancy);

// Separate route for toggling status: /api/consultancies/:id/status
router.patch('/:id/status', protect, authorize('super-admin'), toggleConsultancyStatus);

module.exports = router;