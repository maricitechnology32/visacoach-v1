const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { downloadPrivateFile } = require('../controllers/fileController');

// A single, dedicated POST route for secure downloads
router.post('/download', protect, downloadPrivateFile);

module.exports = router;