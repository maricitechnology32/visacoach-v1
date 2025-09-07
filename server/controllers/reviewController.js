const Review = require('../models/reviewModel');

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.create({
      student: req.user.id,
      consultancy: req.user.consultancy,
      rating,
      comment,
    });
    res.status(201).json({ message: 'Thank you for your review! It will be visible after moderation.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .populate('student', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createReview, getApprovedReviews };