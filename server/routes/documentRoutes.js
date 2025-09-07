// server/routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// 1. (FIX) Destructure the specific uploader from the middleware file.
//    We rename it to 'uploadMiddleware' for clarity.
const { uploadDocument: uploadMiddleware } = require('../middleware/uploadMiddleware');

// 2. Import all controller functions.
//    We rename 'uploadDocument' to 'uploadDocumentController' to avoid confusion.
const {
  uploadDocument: uploadDocumentController,
  getMyDocuments,
  getStudentDocuments,
  deleteDocument,
  updateDocument
} = require('../controllers/documentController');


// Route for uploading a file
router.post('/upload', protect, authorize('student'), (req, res) => {
  // 3. (FIX) Use the correctly imported 'uploadMiddleware'.
  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    // If upload succeeds, pass control to the controller function.
    uploadDocumentController(req, res);
  });
});

// Routes for getting, updating, and deleting documents
router.get('/my-documents', protect, authorize('student'), getMyDocuments);
router.get('/student/:studentId', protect, authorize('counselor', 'admin'), getStudentDocuments);
router.put('/:id', protect, uploadMiddleware, updateDocument);
router.delete('/:id', protect, deleteDocument);

module.exports = router;