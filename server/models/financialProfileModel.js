// server/models/financialProfileModel.js
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  assetType: {
    type: String,
    required: true,
    enum: ['Bank Account', 'Sponsor', 'Education Loan', 'Other'],
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
  },
});

const financialProfileSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Each student has only one financial profile
  },
  estimatedExpenses: {
    tuition: { type: Number, default: 0 },
    livingCosts: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  },
  assets: [assetSchema],
}, { timestamps: true });

module.exports = mongoose.model('FinancialProfile', financialProfileSchema);