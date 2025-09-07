// server/models/documentModel.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileType: { type: String, required: true },
  documentType: {
    type: String,
    required: [true, 'Please categorize the document (e.g., Passport, I-20)'],
  },
  status: {
    type: String,
    enum: ['uploaded', 'approved', 'rejected'],
    default: 'uploaded',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  consultancy: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'Consultancy',
  },
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);