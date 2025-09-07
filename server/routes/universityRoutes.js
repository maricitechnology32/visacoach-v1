
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getPartnerUniversities,
  getPartnerUniversity,
  addPartnerUniversity,
  updatePartnerUniversity,
  deletePartnerUniversity,
  addProgramToUniversity,
  updateProgramInUniversity,
  deleteProgramFromUniversity,
  getCountries,
  getProgramLevels,
  getUniversityRecommendations
} = require('../controllers/universityController');

// Routes for the main collection: /api/universities
router.route('/')
  .get(protect, authorize('student', 'counselor', 'admin'), getPartnerUniversities)
  .post(protect, authorize('counselor', 'admin'), addPartnerUniversity);

// MOVED UP: Static routes must be defined before dynamic routes like /:id
// Route to get countries for filters: /api/universities/filters/countries
router.route('/filters/countries')
  .get(protect, authorize('student', 'counselor', 'admin'), getCountries);

// MOVED UP: Route to get program levels for filters: /api/universities/filters/program-levels
router.route('/filters/program-levels')
  .get(protect, authorize('student', 'counselor', 'admin'), getProgramLevels);

// Routes for a specific university: /api/universities/:id
// This dynamic route now comes AFTER the more specific /filters routes.
router.route('/:id')
  .get(protect, authorize('student', 'counselor', 'admin'), getPartnerUniversity)
  .put(protect, authorize('counselor', 'admin'), updatePartnerUniversity)
  .delete(protect, authorize('counselor', 'admin'), deletePartnerUniversity);


router.post('/recommend', protect, authorize('student'), getUniversityRecommendations);


// Routes for university programs: /api/universities/:id/programs
router.route('/:id/programs')
  .post(protect, authorize('counselor', 'admin'), addProgramToUniversity);


// Routes for specific program: /api/universities/:id/programs/:programId
router.route('/:id/programs/:programId')
  .put(protect, authorize('counselor', 'admin'), updateProgramInUniversity)
  .delete(protect, authorize('counselor', 'admin'), deleteProgramFromUniversity);

module.exports = router;