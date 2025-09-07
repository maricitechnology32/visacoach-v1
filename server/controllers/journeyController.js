// // server/controllers/journeyController.js
// const StudentJourney = require('../models/studentJourneyModel');

// // @desc    Get the logged-in student's journey
// // @route   GET /api/journey/me
// // @access  Private (Student)
// const getMyJourney = async (req, res) => {
//   try {
//     // Find the journey that belongs to the user making the request
//     const journey = await StudentJourney.findOne({ student: req.user.id })
//       .populate('template', 'name visaType'); // Also fetch the template's name and visaType

//     if (!journey) {
//       return res.status(404).json({ message: 'No journey found for this student. Please contact your counselor.' });
//     }

//     res.status(200).json(journey);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };
// const updateTaskStatus = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { status, notes } = req.body;
//     const user = req.user;

//     // Find the journey that contains the specific task
//     const journey = await StudentJourney.findOne({ "tasks._id": taskId });

//     if (!journey) {
//       return res.status(404).json({ message: 'Task or Journey not found.' });
//     }

//     // --- Authorization Check ---
//     const isOwner = journey.student.toString() === user.id.toString();
//     const isAuthorizedCounselor =
//       ['counselor', 'admin'].includes(user.role) &&
//       journey.consultancy.toString() === user.consultancy.toString();

//     if (!isOwner && !isAuthorizedCounselor) {
//       return res.status(403).json({ message: 'User not authorized to update this task.' });
//     }

//     // Prevent students from setting the status to 'approved'
//     if (user.role === 'student' && status === 'approved') {
//       return res.status(403).json({ message: 'Students cannot approve tasks.' });
//     }

//     // --- Update the specific task ---
//     const task = journey.tasks.id(taskId); // A Mongoose helper to find a subdocument by its _id
//     if (status) task.status = status;
//     if (notes) task.notes = notes;

//     await journey.save();

//     res.status(200).json(journey);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// const getStudentJourney = async (req, res) => {
//   const journey = await StudentJourney.findOne({ student: req.params.studentId });
//   // Add security check
//   res.json(journey);
// };


// module.exports = {
//   getMyJourney,
//   updateTaskStatus,
//   getStudentJourney,
// };


const StudentJourney = require('../models/studentJourneyModel');
const User = require('../models/userModel');

// @desc    Get the logged-in student's own journey
const getMyJourney = async (req, res) => {
  try {
    const journey = await StudentJourney.findOne({ student: req.user.id })
      .populate('template', 'name visaType');
    if (!journey) {
      return res.status(404).json({ message: 'No journey found for this student.' });
    }
    res.status(200).json(journey);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a specific student's journey (for counselors)
const getStudentJourney = async (req, res) => {
  try {
    const student = await User.findById(req.params.studentId);
    if (!student || student.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this journey' });
    }
    const journey = await StudentJourney.findOne({ student: req.params.studentId });
    res.json(journey);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update the status of a task in a student's journey
const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status, notes } = req.body;
    const user = req.user;

    const journey = await StudentJourney.findOne({ "tasks._id": taskId });
    if (!journey) {
      return res.status(404).json({ message: 'Task or Journey not found.' });
    }

    // Authorization Check
    const isOwner = journey.student.toString() === user.id.toString();
    const isAuthorizedCounselor =
      ['counselor', 'admin'].includes(user.role) &&
      journey.consultancy.toString() === user.consultancy.toString();

    if (!isOwner && !isAuthorizedCounselor) {
      return res.status(403).json({ message: 'User not authorized to update this task.' });
    }

    if (user.role === 'student' && status === 'approved') {
      return res.status(403).json({ message: 'Students cannot approve tasks.' });
    }

    const task = journey.tasks.id(taskId);
    if (status) task.status = status;
    if (notes) task.notes = notes;

    await journey.save();
    res.status(200).json(journey);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getMyJourney,
  getStudentJourney,
  updateTaskStatus,
};