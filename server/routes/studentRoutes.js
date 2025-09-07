// server/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  addStudent,
  getMyStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentProfile
} = require('../controllers/studentController');

// Routes for the main collection URL: /api/students
router.route('/')
  .get(protect, authorize('counselor', 'admin'), getMyStudents)
  .post(protect, authorize('counselor', 'admin'), addStudent);

// Routes for a specific student URL: /api/students/:id
router.route('/:id')
  .get(protect, authorize('counselor', 'admin'), getStudentById)
  .put(protect, authorize('counselor', 'admin'), updateStudent)
  .delete(protect, authorize('counselor', 'admin'), deleteStudent);


module.exports = router;