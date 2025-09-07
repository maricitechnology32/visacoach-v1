


// // server/routes/profileRoutes.js
// const express = require('express');
// const router = express.Router();
// const { protect, authorize } = require('../middleware/authMiddleware');
// const {
//   getMyProfile,
//   updateMyProfile,
//   updateProfileSection,
//   addToProfileArray,
//   removeFromProfileArray,
//   uploadProfilePicture,
//   getStudentProfile,
//   getProfileCompletion,
//   getProfilesByVisaType
// } = require('../controllers/profileController');
// const { uploadProfilePic } = require('../middleware/uploadMiddleware');

// // All routes are protected with authentication
// router.use(protect);

// // Routes for the logged-in user to manage their own profile
// router.route('/me')
//   .get(authorize('student', 'counselor', 'admin'), getMyProfile)
//   .put(authorize('student', 'counselor', 'admin'), updateMyProfile);

// // Update specific profile section
// router.route('/me/section/:section')
//   .patch(authorize('student', 'counselor', 'admin'), updateProfileSection);

// // Add item to array fields (education, employment, test scores, etc.)
// router.route('/me/array/:arrayField')
//   .post(authorize('student', 'counselor', 'admin'), addToProfileArray);

// // Remove item from array fields
// router.route('/me/array/:arrayField/:itemId')
//   .delete(authorize('student', 'counselor', 'admin'), removeFromProfileArray);

// // Upload profile picture
// router.post('/me/photo', authorize('student', 'counselor', 'admin'), uploadProfilePic, uploadProfilePicture);

// // Get profile completion status
// router.get('/me/completion', authorize('student', 'counselor', 'admin'), getProfileCompletion);

// // Get student profile (for counselors and admins)
// router.get('/student/:studentId', authorize('counselor', 'admin'), getStudentProfile);

// // Get profiles by visa type (admin only)
// router.get('/visa-type/:visaType', authorize('admin'), getProfilesByVisaType);

// module.exports = router;




// // server/routes/profileRoutes.js
// const express = require('express');
// const router = express.Router();
// const { protect, authorize } = require('../middleware/authMiddleware');
// const {
//   getMyProfile,
//   updateProfileSection,
//   addToProfileArray,
//   updateProfileArrayItem,
//   removeFromProfileArray,
//   uploadProfilePicture,
//   getStudentProfile,
//   getProfileCompletion,
//   getProfilesByVisaType,
//   getFinancialOverview
// } = require('../controllers/profileController');
// const { uploadProfilePic } = require('../middleware/uploadMiddleware');

// // All routes are protected with authentication
// router.use(protect);

// // Routes for the logged-in user to manage their own profile
// router.route('/me')
//   .get(authorize('student', 'counselor', 'admin'), getMyProfile);

// // Update specific profile section using dot notation
// router.route('/me/section/:section')
//   .patch(authorize('student', 'counselor', 'admin'), updateProfileSection);

// // Add item to array fields (education, employment, test scores, bank statements, etc.)
// router.route('/me/array/:arrayField')
//   .post(authorize('student', 'counselor', 'admin'), addToProfileArray);

// // Update specific item in array fields
// router.route('/me/array/:arrayField/:itemId')
//   .put(authorize('student', 'counselor', 'admin'), updateProfileArrayItem)
//   .delete(authorize('student', 'counselor', 'admin'), removeFromProfileArray);

// // Upload profile picture
// router.post('/me/picture', authorize('student', 'counselor', 'admin'), uploadProfilePic, uploadProfilePicture);

// // Get profile completion status
// router.get('/me/completion', authorize('student', 'counselor', 'admin'), getProfileCompletion);

// // Get financial overview with calculated totals
// router.get('/me/financial-overview', authorize('student', 'counselor', 'admin'), getFinancialOverview);

// // Get student profile (for counselors and admins)
// router.get('/student/:studentId', authorize('counselor', 'admin'), getStudentProfile);

// // Get profiles by visa type (admin only)
// router.get('/visa-type/:visaType', authorize('admin'), getProfilesByVisaType);

// module.exports = router;


// server/routes/profileRoutes.js
const express = require('express');
const router = express.Router();

// Middleware
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadProfilePic } = require('../middleware/uploadMiddleware');

// Controllers
const {
  getMyProfile,
  updateProfileSection,
  addToProfileArray,
  updateProfileArrayItem,
  removeFromProfileArray,
  uploadProfilePicture,
  getStudentProfile,
  getProfileCompletion,
  getProfilesByVisaType,
  getFinancialOverview
} = require('../controllers/profileController');

// ================================
// 🔐 Authentication Middleware
// All routes below require a valid JWT
// ================================
router.use(protect);

/**
 * @route   GET /api/profiles/me
 * @desc    Get logged-in user's profile
 * @access  Student, Counselor, Admin
 */
router.get(
  '/me',
  authorize('student', 'counselor', 'admin'),
  getMyProfile
);

/**
 * @route   PATCH /api/profiles/me/section/:section
 * @desc    Update specific profile section (dot notation)
 * @access  Student, Counselor, Admin
 */
router.patch(
  '/me/section/:section',
  authorize('student', 'counselor', 'admin'),
  updateProfileSection
);

/**
 * @route   POST /api/profiles/me/array/:arrayField
 * @desc    Add item to array fields (education, employment, test scores, etc.)
 * @access  Student, Counselor, Admin
 */
router.post(
  '/me/array/:arrayField',
  authorize('student', 'counselor', 'admin'),
  addToProfileArray
);

/**
 * @route   PUT /api/profiles/me/array/:arrayField/:itemId
 * @desc    Update specific item in array fields
 * @access  Student, Counselor, Admin
 */
router.put(
  '/me/array/:arrayField/:itemId',
  authorize('student', 'counselor', 'admin'),
  updateProfileArrayItem
);

/**
 * @route   DELETE /api/profiles/me/array/:arrayField/:itemId
 * @desc    Remove item from array fields
 * @access  Student, Counselor, Admin
 */
router.delete(
  '/me/array/:arrayField/:itemId',
  authorize('student', 'counselor', 'admin'),
  removeFromProfileArray
);

/**
 * @route   POST /api/profiles/me/picture
 * @desc    Upload profile picture
 * @access  Student, Counselor, Admin
 */
router.post(
  '/me/picture',
  authorize('student', 'counselor', 'admin'),
  uploadProfilePic,
  uploadProfilePicture
);

/**
 * @route   GET /api/profiles/me/completion
 * @desc    Get profile completion percentage
 * @access  Student, Counselor, Admin
 */
router.get(
  '/me/completion',
  authorize('student', 'counselor', 'admin'),
  getProfileCompletion
);

/**
 * @route   GET /api/profiles/me/financial-overview
 * @desc    Get financial overview with totals
 * @access  Student, Counselor, Admin
 */
router.get(
  '/me/financial-overview',
  authorize('student', 'counselor', 'admin'),
  getFinancialOverview
);

/**
 * @route   GET /api/profiles/student/:studentId
 * @desc    Get specific student profile (for counselors/admins)
 * @access  Counselor, Admin
 */
router.get(
  '/student/:studentId',
  authorize('counselor', 'admin'),
  getStudentProfile
);

/**
 * @route   GET /api/profiles/visa-type/:visaType
 * @desc    Get all profiles by visa type
 * @access  Admin
 */
router.get(
  '/visa-type/:visaType',
  authorize('admin'),
  getProfilesByVisaType
);

module.exports = router;
