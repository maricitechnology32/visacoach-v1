

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const ChecklistTemplate = require('../models/checklistTemplateModel');
const StudentJourney = require('../models/studentJourneyModel');
const { sendInvitationEmail } = require('../services/emailService'); //  

// const addStudent = async (req, res) => {
//   try {
//     const { name, email, templateId } = req.body;

//     console.log('Incoming student data:', req.body);
//     console.log('Authenticated user:', req.user);

//     // Basic validation
//     if (!name || !email || !templateId) {
//       return res.status(400).json({ message: 'Please provide name, email, and a checklist template.' });
//     }



//     // Ensure authenticated counselor
//     const counselor = req.user;
//     if (!counselor || !counselor.consultancy) {
//       return res.status(403).json({ message: 'Counselor is not associated with a consultancy or not authenticated.' });
//     }

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'A user with this email already exists.' });
//     }

//     // Check template exists
//     const template = await ChecklistTemplate.findById(templateId);
//     if (!template) {
//       return res.status(404).json({ message: 'Checklist template not found.' });
//     }

//     // Create a temporary password
//     const temporaryPassword = crypto.randomBytes(8).toString('hex');
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(temporaryPassword, salt);

//     // Create student
//     const student = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: 'student',
//       consultancy: counselor.consultancy,
//     });

//     // Create StudentJourney
//     const studentTasks = template.tasks.map(task => ({
//       originalTaskId: task._id,
//       title: task.title,
//       description: task.description,
//       category: task.category,
//       status: 'pending',
//     }));

//     await StudentJourney.create({
//       student: student._id,
//       template: templateId,
//       tasks: studentTasks,
//     });

//     // Generate invitation token
//     const invitationToken = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     const setupLink = `${process.env.FRONTEND_URL}/set-password?token=${invitationToken}`;


//     console.log(`
//       --- NEW STUDENT INVITATION ---
//       To: ${email}
//       Setup Link: ${setupLink}
//       -----------------------------
//     `);

//     res.status(201).json({
//       message: 'Student created successfully. Invitation link generated.',
//       student: {
//         _id: student._id,
//         name: student.name,
//         email: student.email,
//       },
//       invitationToken,
//     });

//   } catch (error) {
//     console.error('Add Student Error:', error);
//     res.status(500).json({ message: 'Server error while adding student.' });
//   }
// };


const addStudent = async (req, res) => {
  try {
    const { name, email, templateId } = req.body;
    const counselor = req.user;

    // 1. Validation
    if (!name || !email || !templateId) {
      return res.status(400).json({ message: 'Please provide name, email, and a checklist template.' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'A user with this email already exists.' });
    }
    const template = await ChecklistTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: 'Checklist template not found.' });
    }

    // 2. Create a temporary password (will be replaced by the student)
    const temporaryPassword = 'temp_password_' + Date.now();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(temporaryPassword, salt);

    // 3. Create the student user in the database
    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'student',
      consultancy: counselor.consultancy,
    });

    // 4. Create their personalized journey
    const studentTasks = template.tasks.map(task => ({
      originalTaskId: task._id,
      title: task.title,
      description: task.description,
      category: task.category,
    }));

    await StudentJourney.create({
      student: student._id,
      template: templateId,
      tasks: studentTasks,
    });

    // 5. NOW that the student exists, generate the token and send the email
    const invitationToken = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const setupLink = `${process.env.FRONTEND_URL}/set-password?token=${invitationToken}`;

    await sendInvitationEmail(student.email, setupLink);

    // 6. Send success response
    res.status(201).json({
      message: 'Student created successfully and invitation sent.',
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
      },
    });

  } catch (error) {
    console.error('Add Student Error:', error);
    res.status(500).json({ message: 'Server error while adding student.' });
  }
};

const getMyStudents = async (req, res) => {
  try {
    if (!req.user || !req.user.consultancy) {
      return res.status(403).json({ message: 'Not authorized or consultancy not found.' });
    }

    const students = await User.find({
      consultancy: req.user.consultancy,
      role: 'student'
    }).select('-password');

    res.status(200).json(students);
  } catch (error) {
    console.error('Get Students Error:', error);
    res.status(500).json({ message: 'Server error while fetching students.' });
  }
};


const getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');

    if (!student) return res.status(404).json({ message: 'Student not found.' });
    if (!req.user || !req.user.consultancy) return res.status(403).json({ message: 'Counselor account not configured.' });
    if (!student.consultancy) return res.status(404).json({ message: 'Student not linked to any consultancy.' });

    if (student.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this student.' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Get Student By ID Error:', error);
    if (error.kind === 'ObjectId') return res.status(404).json({ message: 'Student not found.' });
    res.status(500).json({ message: 'Server error while fetching student.' });
  }
};


const updateStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    if (student.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this student.' });
    }

    const updatedStudent = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error('Update Student Error:', error);
    res.status(500).json({ message: 'Server error while updating student.' });
  }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Private (Counselor)
const deleteStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    if (student.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this student.' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ id: req.params.id, message: 'Student removed successfully.' });
  } catch (error) {
    console.error('Delete Student Error:', error);
    res.status(500).json({ message: 'Server error while deleting student.' });
  }
};

module.exports = {
  addStudent,
  getMyStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
