// server/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// We will create this controller next
const { createCounselor, getConsultancyUsers, getPlatformStats, } = require('../controllers/adminController');

// Define the route. It is protected and authorized ONLY for the 'super-admin' role.
router.post('/create-counselor', protect, authorize('super-admin'), createCounselor);
router.get('/consultancies/:consultancyId/users', protect, authorize('super-admin'), getConsultancyUsers);
router.get('/stats', protect, authorize('super-admin'), getPlatformStats);
const { getPlatformApplicationStats } = require('../controllers/adminController');  

// Add this new route for Super Admin stats
router.get('/application-stats', protect, authorize('super-admin'), getPlatformApplicationStats);

module.exports = router;