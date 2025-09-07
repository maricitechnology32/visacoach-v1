// server/models/visaTimelineModel.js
const mongoose = require('mongoose');

const visaTimelineSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Each student can only submit one timeline
  },
  consultancy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultancy',
    required: true,
  },
  visaType: {
    type: String,
    required: true,
  },
  consulateLocation: {
    type: String, // e.g., "Mumbai, India" or "Kathmandu, Nepal"
    required: true,
  },
  status: {
    type: String,
    enum: ['Approved', 'Rejected', 'Pending'],
    required: true,
  },
  dates: {
    applicationSubmitted: { type: Date },
    biometricsCompleted: { type: Date },
    interviewDate: { type: Date },
    decisionDate: { type: Date },
  },
}, { timestamps: true });

module.exports = mongoose.model('VisaTimeline', visaTimelineSchema);