// server/models/interviewSessionModel.js
const mongoose = require('mongoose');

const interviewSessionSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'error'],
    default: 'pending',
  },
  transcript: [
    {
      speaker: { type: String, enum: ['user', 'assistant'] },
      text: { type: String },
      timestamp: { type: Date, default: Date.now },
    }
  ],
  feedback: {
    type: String, // Can be simple text or a JSON string for structured feedback
  },
  score: {
    type: Number, // An overall readiness score
  },
}, { timestamps: true });

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);