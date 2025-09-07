const mongoose = require('mongoose');

const forumCommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // A reference back to the parent post
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ForumPost',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ForumComment', forumCommentSchema);