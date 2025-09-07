// // server/routes/journeyRoutes.js
// const express = require('express');
// const router = express.Router();
// const { protect, authorize } = require('../middleware/authMiddleware');
// const { getMyJourney, updateTaskStatus, getStudentJourney } = require('../controllers/journeyController');

// // Route for a logged-in student to get their own journey
// router.get('/me', protect, getMyJourney); router.put('/tasks/:taskId', protect, updateTaskStatus);
// router.get('/student/:studentId', protect, authorize('counselor', 'admin'), getStudentJourney);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getMyJourney,
  updateTaskStatus,
  getStudentJourney // Import the new function
} = require('../controllers/journeyController');

// Route for a student to get their own journey
router.get('/me', protect, authorize('student'), getMyJourney);

// Route for a student or counselor to update a task
router.put('/tasks/:taskId', protect, updateTaskStatus);

// Route for a counselor to get a specific student's journey
router.get('/student/:studentId', protect, authorize('counselor', 'admin'), getStudentJourney);

module.exports = router;

