// server/controllers/dashboardController.js
const User = require('../models/userModel');
const StudentJourney = require('../models/studentJourneyModel');

// @desc    Get aggregated data for the counselor dashboard
// @route   GET /api/dashboard/counselor
// @access  Private (Counselor, Admin)
const getCounselorDashboard = async (req, res) => {
  try {
    const consultancyId = req.user.consultancy;

    // We will run three queries in parallel for efficiency
    const [totalStudents, tasksByStatus, recentActivity] = await Promise.all([
      // Query 1: Get the total count of students for this consultancy
      User.countDocuments({ consultancy: consultancyId, role: 'student' }),

      // Query 2: Get the count of tasks grouped by their status
      StudentJourney.aggregate([
        { $match: { consultancy: consultancyId } }, // Filter for journeys in this consultancy
        { $unwind: '$tasks' }, // Deconstruct the tasks array
        { $group: { _id: '$tasks.status', count: { $sum: 1 } } }, // Group by status and count
      ]),

      // Query 3: Get the 5 most recently updated student journeys
      StudentJourney.find({ consultancy: consultancyId })
        .sort({ updatedAt: -1 })
        .limit(5)
        .populate('student', 'name email'), // Also fetch the student's name and email
    ]);

    // Format the tasksByStatus result for easier use on the frontend
    const formattedTasks = tasksByStatus.reduce((acc, status) => {
      acc[status._id] = status.count;
      return acc;
    }, {});

    res.status(200).json({
      totalStudents,
      tasksByStatus: formattedTasks,
      recentActivity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getCounselorDashboard };