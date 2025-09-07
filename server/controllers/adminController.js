// server/controllers/adminController.js

const User = require('../models/userModel');
const Consultancy = require('../models/consultancyModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Application = require('../models/applicationModel'); // ==> FIX: Import the Application model


// @desc    Create a counselor/admin for a specific consultancy
// @route   POST /api/admin/create-counselor
// @access  Private (Super Admin)
const createCounselor = async (req, res) => {
  try {
    const { name, email, consultancyId } = req.body;

    // 1. Validation
    if (!name || !email || !consultancyId) {
      return res.status(400).json({ message: 'Please provide name, email, and consultancyId.' });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // 3. Check if the consultancy exists
    const consultancy = await Consultancy.findById(consultancyId);
    if (!consultancy) {
      return res.status(404).json({ message: 'Consultancy not found.' });
    }

    // 4. Create a placeholder password; they will set their own.
    const placeholderPassword = 'temp_pass_' + Date.now();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(placeholderPassword, salt);

    // 5. Create the new user with the 'admin' role
    const newCounselor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin', // Assigning the 'admin' role for this consultancy
      consultancy: consultancyId, // Linking to the specific consultancy
    });

    // 6. Generate a setup token and link, just like the student invite
    const setupToken = jwt.sign({ id: newCounselor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const setupLink = `http://localhost:3000/set-password?token=${setupToken}`;

    console.log(`--- NEW COUNSELOR/ADMIN INVITE ---
To: ${email}
For Consultancy: ${consultancy.name}
Setup Link: ${setupLink}
-------------------------------------`);

    res.status(201).json({
      message: 'Counselor account created successfully. Invitation link generated.',
      counselor: { _id: newCounselor.id, name: newCounselor.name, email: newCounselor.email },
      setupToken, // Sent for easy testing
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getConsultancyUsers = async (req, res) => {
  try {
    const users = await User.find({ consultancy: req.params.consultancyId });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getPlatformStats = async (req, res) => {
  try {
    // Run all count queries in parallel for better performance
    const [totalConsultancies, totalCounselors, totalStudents] = await Promise.all([
      // Query 1: Count all consultancy documents
      Consultancy.countDocuments({}),

      // Query 2: Count all users with the role of counselor or admin
      User.countDocuments({ role: { $in: ['counselor', 'admin'] } }),

      // Query 3: Count all users with the role of student
      User.countDocuments({ role: 'student' }),
    ]);

    // Send the aggregated data in the response
    res.status(200).json({
      totalConsultancies,
      totalCounselors,
      totalStudents,
    });

  } catch (error) {
    console.error('Error fetching platform stats:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getPlatformApplicationStats = async (req, res) => {
  try {
    // Aggregation pipeline to count statuses across ALL consultancies
    const stats = await Application.aggregate([
      { $group: { _id: '$visaStatus', count: { $sum: 1 } } },
      { $project: { status: '$_id', count: 1, _id: 0 } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};




module.exports = {
  createCounselor,
  getConsultancyUsers,
  getPlatformStats,
  getPlatformApplicationStats
};