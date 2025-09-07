// // server/models/studentJourneyModel.js
// const mongoose = require('mongoose');

// const studentTaskSchema = new mongoose.Schema({
//   // This references the original task from the template's subdocument array
//   originalTaskId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   category: { type: String, required: true },
//   status: {
//     type: String,
//     enum: ['pending', 'in-progress', 'completed', 'approved'],
//     default: 'pending',
//   },
//   notes: { type: String },
// });

// const studentJourneySchema = new mongoose.Schema({
//   student: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     unique: true, // Each student has only one journey
//   },
//   template: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'ChecklistTemplate',
//     required: true,
//   },
//   tasks: [studentTaskSchema],
// }, { timestamps: true });

// module.exports = mongoose.model('StudentJourney', studentJourneySchema);


const mongoose = require('mongoose');

const studentTaskSchema = new mongoose.Schema({
  originalTaskId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'approved'],
    default: 'pending',
  },
  notes: { type: String },
});

const studentJourneySchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Each student has only one journey
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChecklistTemplate',
    required: true,
  },
  tasks: [studentTaskSchema],
}, { timestamps: true });

module.exports = mongoose.model('StudentJourney', studentJourneySchema);