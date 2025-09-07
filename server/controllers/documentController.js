// server/controllers/documentController.js
const Document = require('../models/documentModel');
const { createNotification } = require('../services/notificationService');
const User = require('../models/userModel')
const fs = require('fs');
 
// const uploadDocument = async (req, res) => {
//   // The `upload` middleware runs first. If successful, `req.file` will contain file info.
//   if (!req.file) {
//     return res.status(400).json({ message: 'Please upload a file.' });
//   }

//   const { documentType } = req.body;
//   if (!documentType) {
//     return res.status(400).json({ message: 'Please provide a document type.' });
//   }

//   try {
//     const newDocument = new Document({
//       fileName: req.file.originalname,
//       filePath: req.file.path, // Path where the file is stored locally
//       fileType: req.file.mimetype,
//       documentType: documentType,
//       student: req.user.id, // req.user comes from the 'protect' middleware
//       consultancy: req.user.consultancy,
//     });

//     const savedDocument = await newDocument.save();
//     res.status(201).json(savedDocument);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error while saving document data.' });
//   }
// };


const uploadDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file.' });
  }

  const { documentType } = req.body;
  if (!documentType) {
    return res.status(400).json({ message: 'Please provide a document type.' });
  }

  try {
    const newDocument = new Document({
      fileName: req.file.originalname,
      // ==> FIX: Format the path to be a URL <==
      filePath: `/${req.file.path.replace(/\\/g, "/")}`,
      fileType: req.file.mimetype,
      documentType: documentType,
      student: req.user.id,
      consultancy: req.user.consultancy,
    });

    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(500).json({ message: 'Server error while saving document data.' });
  }
};
 
const getMyDocuments = async (req, res) => {
  try {
    // Find all documents where the 'student' field matches the logged-in user's ID
    const documents = await Document.find({ student: req.user.id });
    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

 
const getStudentDocuments = async (req, res) => {
  try {
    // First, find the student to verify they belong to the counselor's consultancy
    const student = await User.findById(req.params.studentId);

    if (!student || student.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' });
    }

    // SECURITY CHECK: Prevent a counselor from viewing another consultancy's students
    if (student.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this student\'s documents' });
    }

    // If authorized, fetch the documents for that student
    const documents = await Document.find({ student: req.params.studentId });
    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

   
    const isOwner = document.student.toString() === req.user.id.toString();
    const isAuthorizedCounselor =
      ['counselor', 'admin'].includes(req.user.role) &&
      document.consultancy.toString() === req.user.consultancy.toString();

    if (!isOwner && !isAuthorizedCounselor) {
      return res.status(403).json({ message: 'User not authorized to delete this document' });
    }

    // Delete the physical file from the '/uploads' folder
    fs.unlink(document.filePath, (err) => {
      if (err) {
        // We'll log the error but still proceed to delete the database record
        // to maintain data integrity from the user's perspective.
        console.error(`Failed to delete file from filesystem: ${document.filePath}`, err);
      }
    });

    // Delete the document record from the database
    await Document.findByIdAndDelete(req.params.id);

    res.status(200).json({ id: req.params.id, message: 'Document removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const user = req.user;
    const { documentType, status } = req.body;

    // --- Authorization and Update Logic ---
    if (user.role === 'student') {
      if (document.student.toString() !== user.id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this document' });
      }
      if (documentType) {
        document.documentType = documentType;
      }
      if (status) {
        return res.status(403).json({ message: 'Students are not authorized to change document status.' });
      }
    } else if (['counselor', 'admin'].includes(user.role)) {
      if (document.consultancy.toString() !== user.consultancy.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this document' });
      }
      if (status) {
        if (!['uploaded', 'approved', 'rejected'].includes(status)) {
          return res.status(400).json({ message: 'Invalid status value.' });
        }
        document.status = status;

        // Send notification on status change
        const io = req.app.get('socketio');
        createNotification(io, document.student, {
          senderId: user.id,
          type: 'document_status',
          message: `Your document '${document.fileName}' was updated to '${status}'.`,
          link: `/documents`
        });
      }
      if (documentType) {
        return res.status(403).json({ message: 'Counselors are not authorized to change the document type.' });
      }
    } else {
      return res.status(403).json({ message: 'User role not authorized for this action' });
    }

    // --- File Replacement Logic ---
    if (req.file) {
      // Delete the old file if it exists
      if (document.filePath) {
        fs.unlink(document.filePath, (err) => {
          if (err) console.error("Error deleting old file:", err);
        });
      }
      // Update the document record with the new file's info
      document.fileName = req.file.originalname;
      document.filePath = `/${req.file.path.replace(/\\/g, "/")}`;
      document.fileType = req.file.mimetype;
    }

    const updatedDocument = await document.save();
    res.status(200).json(updatedDocument);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  uploadDocument,
  getMyDocuments,
  getStudentDocuments,
  deleteDocument,
  updateDocument
};