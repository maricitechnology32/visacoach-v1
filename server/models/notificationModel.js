// server/models/notificationModel.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { // The user who receives the notification
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sender: { // The user who triggered the notification (e.g., a counselor)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    required: true,
    enum: ['document_status', 'new_message', 'task_update', 'notice'],
  },
  message: {
    type: String,
    required: true,
  },
  link: { // A URL for the frontend to navigate to when clicked
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);