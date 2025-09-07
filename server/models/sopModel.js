const mongoose = require('mongoose');

const sopSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  consultancy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultancy',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // The 'review' field will store the structured JSON response from the AI
  review: {
    overallScore: Number,
    strengths: String,
    areasForImprovement: [String],
    toneAnalysis: String,
    grammarCorrections: [
      {
        original: String,
        corrected: String,
        explanation: String,
      }
    ]
  },
}, { timestamps: true });

module.exports = mongoose.model('Sop', sopSchema);