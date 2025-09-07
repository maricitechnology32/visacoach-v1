

// // server/models/lessonModel.js
// const mongoose = require('mongoose');

// const lessonSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'Lesson title is required'],
//       trim: true,
//     },
//     content: {
//       type: String, // Text content (rich text / HTML)
//       default: '',
//     },
//     videoUrl: {
//       type: String, // YouTube or Vimeo link
//       validate: {
//         validator: function (v) {
//           return !v || /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)/.test(v);
//         },
//         message: 'Please provide a valid YouTube or Vimeo link',
//       },
//     },
//     resource: {
//       fileName: { type: String },
//       filePath: { type: String },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Lesson = mongoose.model('Lesson', lessonSchema);
// module.exports = Lesson;

const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true,
  },
  content: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)/.test(v);
      },
      message: 'Please provide a valid YouTube or Vimeo link',
    },
  },
  resource: {
    fileName: { type: String },
    filePath: { type: String },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Lesson', lessonSchema);
