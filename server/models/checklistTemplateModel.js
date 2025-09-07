// // server/models/checklistTemplateModel.js
// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   category: {
//     type: String,
//     required: true,
//     enum: ['Pre-Application', 'Application Filing', 'Interview Prep', 'Post-Approval']
//   },
// });

// const checklistTemplateSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   visaType: { type: String, required: true },
//   tasks: [taskSchema],
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

//   // ==> ADD THESE TWO NEW FIELDS <==
//   isBaseTemplate: {
//     type: Boolean,
//     default: false, // True only if created by Super Admin
//   },
//   consultancy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Consultancy', // Links a custom template to a specific consultancy
//     default: null,
//   },
// }, { timestamps: true });

// // To prevent a consultancy from having two templates with the same name
// checklistTemplateSchema.index({ name: 1, consultancy: 1 }, { unique: true });

// module.exports = mongoose.model('ChecklistTemplate', checklistTemplateSchema);

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Pre-Application', 'Application Filing', 'Interview Prep', 'Post-Approval']
  },
});

const checklistTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  visaType: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isBaseTemplate: {
    type: Boolean,
    default: false, // True only if created by Super Admin
  },
  consultancy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultancy', // Links a custom template to a specific consultancy
    default: null,
  },
}, { timestamps: true });

// To prevent a consultancy from having two templates with the same name
checklistTemplateSchema.index({ name: 1, consultancy: 1 }, { unique: true });

module.exports = mongoose.model('ChecklistTemplate', checklistTemplateSchema);