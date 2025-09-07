// server/controllers/timelineController.js
const VisaTimeline = require('../models/visaTimelineModel');

// @desc    Submit or update a visa timeline
// @route   POST /api/timelines
// @access  Private (Student)
const submitTimeline = async (req, res) => {
  try {
    const { consulateLocation, status, dates, visaType } = req.body;
    const studentId = req.user.id;

    const timelineData = {
      student: studentId,
      consultancy: req.user.consultancy,
      visaType,
      consulateLocation,
      status,
      dates,
    };

    // Find and update if exists, or create if it doesn't (upsert)
    const timeline = await VisaTimeline.findOneAndUpdate(
      { student: studentId },
      timelineData,
      { new: true, upsert: true }
    );

    res.status(201).json(timeline);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get aggregated visa timeline analytics
// @route   GET /api/timelines
// @access  Private
const getTimelineAnalytics = async (req, res) => {
  try {
    const analytics = await VisaTimeline.aggregate([
      // 1. Filter for only approved applications with the necessary dates
      {
        $match: {
          status: 'Approved',
          'dates.applicationSubmitted': { $exists: true },
          'dates.decisionDate': { $exists: true },
        },
      },
      // 2. Calculate the processing time in days
      {
        $project: {
          consulateLocation: 1,
          processingTime: {
            $dateDiff: {
              startDate: '$dates.applicationSubmitted',
              endDate: '$dates.decisionDate',
              unit: 'day',
            },
          },
        },
      },
      // 3. Group by consulate and calculate the average time
      {
        $group: {
          _id: '$consulateLocation',
          averageProcessingTimeDays: { $avg: '$processingTime' },
          count: { $sum: 1 },
        },
      },
      // 4. Sort by the number of submissions
      {
        $sort: { count: -1 },
      },
    ]);
    res.status(200).json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { submitTimeline, getTimelineAnalytics };