// server/models/consultancyModel.js

const mongoose = require('mongoose');

const consultancySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a consultancy name'],
      unique: true,
    },
    contactEmail: {
      type: String,
      required: [true, 'Please add a contact email'],
    },
    address: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
   },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Consultancy', consultancySchema);