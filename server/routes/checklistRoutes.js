// // // server/routes/checklistRoutes.js
// // const express = require('express');
// // const router = express.Router();
// // const { protect, authorize } = require('../middleware/authMiddleware');
// // const {
// //   createChecklistTemplate,
// //   addTaskToTemplate,
// //   getChecklistTemplates
// // } = require('../controllers/checklistController');

// // // ==> FIX: Chain both GET and POST to the '/' path <==
// // router.route('/')
// //   .post(protect, authorize('admin', 'super-admin'), createChecklistTemplate)
// //   .get(protect, authorize('admin', 'super-admin'), getChecklistTemplates);

// // router.post('/:templateId/tasks', protect, authorize('admin', 'super-admin'), addTaskToTemplate);

// // module.exports = router;

// // server/routes/checklistRoutes.js
// const express = require('express');
// const router = express.Router();
// const { protect, authorize } = require('../middleware/authMiddleware');
// const {
//   createChecklistTemplate,
//   addTaskToTemplate,
//   getChecklistTemplates
// } = require('../controllers/checklistController');

// // ==> FIX: Add 'counselor' to the list of authorized roles <==
// router.route('/')
//   .post(protect, authorize('admin', 'super-admin'), createChecklistTemplate)
//   .get(protect, authorize('counselor', 'admin', 'super-admin'), getChecklistTemplates);

// router.post('/:templateId/tasks', protect, authorize('admin', 'super-admin'), addTaskToTemplate);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createChecklistTemplate,
  getChecklistTemplates,
  addTaskToTemplate
} = require('../controllers/checklistController');

// Routes for the template collection
router.route('/')
  .post(protect, authorize('admin', 'super-admin'), createChecklistTemplate)
  .get(protect, authorize('counselor', 'admin', 'super-admin'), getChecklistTemplates);

// Route for adding tasks to a specific template
router.post('/:templateId/tasks', protect, authorize('admin', 'super-admin'), addTaskToTemplate);

module.exports = router;