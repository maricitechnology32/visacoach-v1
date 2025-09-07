const mongoose = require('mongoose');

const forumPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  consultancy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultancy',
    required: true,
  },
  // An array of references to all comments on this post
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ForumComment',
  }],
}, { timestamps: true });

module.exports = mongoose.model('ForumPost', forumPostSchema);