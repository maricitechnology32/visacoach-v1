// server/models/messageModel.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  // A unique ID representing the conversation between two users
  conversationId: {
    type: String,
    required: true,
    index: true // Index for faster queries
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);