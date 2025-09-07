const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
// ==> THIS LINE IS MISSING <==
const { verifyVapiWebhook } = require('../middleware/vapiWebhookAuth');
const { startInterviewSession, handleVapiWebhook } = require('../controllers/interviewController');

router.post('/start', protect, authorize('student'), startInterviewSession);

// This line requires 'verifyVapiWebhook' to be defined
router.post('/webhook', verifyVapiWebhook, handleVapiWebhook);

module.exports = router;