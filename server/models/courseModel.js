

// // server/models/courseModel.js
// const mongoose = require('mongoose');

// // Sub-schema for modules
// const moduleSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'Module title is required'],
//       trim: true,
//     },
//     lessons: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Lesson',
//       },
//     ],
//   },
//   { _id: false } // prevents automatic _id for each module
// );

// const courseSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'Course title is required'],
//       unique: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: [true, 'Course description is required'],
//     },
//     thumbnail: {
//       type: String,
//       default: '/images/default-thumbnail.jpg',
//     },
//     modules: [moduleSchema], // use sub-schema for better validation
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: [true, 'Course must have a creator'],
//     },
//     consultancy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Consultancy',
//       required: [true, 'Course must belong to a consultancy'],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Course = mongoose.model('Course', courseSchema);
// module.exports = Course;


const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Module title is required'],
    trim: true,
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  }],
}, { _id: false });

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
  },
  thumbnail: {
    type: String,
    default: '/images/default-thumbnail.jpg',
  },
  modules: [moduleSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Course must have a creator'],
  },
  consultancy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultancy',
    required: [true, 'Course must belong to a consultancy'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);