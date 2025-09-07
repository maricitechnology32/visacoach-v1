// server/routes/noticeRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { createNotice } = require('../controllers/noticeController');

router.post('/', protect, authorize('counselor', 'admin'), createNotice);

module.exports = router;