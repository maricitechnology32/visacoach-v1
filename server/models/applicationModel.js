 

// const mongoose = require('mongoose');

// const applicationSchema = new mongoose.Schema({
//   student: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   consultancy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Consultancy',
//     required: true
//   },

//   // ==> FIX: Changed from String to a direct reference <==
//   university: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'PartnerUniversity',
//     required: true,
//   },

//   // ==> FIX: Changed from String to a direct reference <==
//   program: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'PartnerUniversity.programs', // Refers to the sub-document
//     required: true,
//   },
//   country: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'PartnerUniversity.country', 
//     required: false,
//   },

//   visaStatus: {
//     type: String,
//     enum: ['Approved', 'Rejected', 'Pending', 'Withdrawn'],
//     required: true,
//   },
//   decisionDate: { type: Date },
// }, { timestamps: true });

// module.exports = mongoose.model('Application', applicationSchema);

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  consultancy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultancy',
    required: true
  },

  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PartnerUniversity',
    required: true,
  },

  // FIX: A program is a sub-document, so we store its _id but don't need a formal 'ref'
  program: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  visaStatus: {
    type: String,
    enum: ['Approved', 'Rejected', 'Pending', 'Withdrawn'],
    required: true,
  },
  decisionDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);