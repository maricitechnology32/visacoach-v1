// server/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getMessages } = require('../controllers/messageController');

// Route to get the message history between the logged-in user and another user
router.get('/:otherUserId', protect, getMessages);

module.exports = router;