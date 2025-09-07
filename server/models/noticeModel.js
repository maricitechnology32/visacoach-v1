// server/models/noticeModel.js
const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    consultancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultancy',
      required: true,
    },
    // This array can track which users have seen the notice
    isReadBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Notice', noticeSchema);