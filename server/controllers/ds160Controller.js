

// server/controllers/ds160Controller.js
const Ds160 = require('../models/ds160Model');
const User = require('../models/userModel');

// ---------------------
// Utility: Validation
// ---------------------
const validateDs160BeforeSubmit = (ds160) => {
  const errors = [];

  // Personal Info
  // if (!ds160.personalInfo?.surname) errors.push('Surname is required.');
  // if (!ds160.personalInfo?.givenNames) errors.push('Given names are required.');
  // if (!ds160.personalInfo?.dateOfBirth) errors.push('Date of Birth is required.');
  // if (!ds160.personalInfo?.birthCountry) errors.push('Country of Birth is required.');
  // if (!ds160.personalInfo?.nationality) errors.push('Nationality is required.');
  // if (!ds160.personalInfo?.sex) errors.push('Sex is required.');
  // if (!ds160.personalInfo?.maritalStatus) errors.push('Marital status is required.');

  // // Passport Info
  // if (!ds160.passportInfo?.passportNumber) errors.push('Passport number is required.');
  // if (!ds160.passportInfo?.passportIssueDate) errors.push('Passport issue date is required.');
  // if (!ds160.passportInfo?.passportExpiryDate) errors.push('Passport expiry date is required.');
  // if (!ds160.passportInfo?.passportIssueCountry) errors.push('Passport issue country is required.');

  // // Contact Info
  // if (!ds160.contactInfo?.homeAddress?.street) errors.push('Home address street is required.');
  // if (!ds160.contactInfo?.homeAddress?.city) errors.push('Home address city is required.');
  // if (!ds160.contactInfo?.homeAddress?.country) errors.push('Home address country is required.');
  // if (!ds160.contactInfo?.primaryPhoneNumber) errors.push('Primary phone number is required.');
  // if (!ds160.contactInfo?.email) errors.push('Email is required.');

  // // Travel Info
  // if (!ds160.travelInfo?.purposeOfTrip) errors.push('Purpose of trip is required.');
  // if (ds160.travelInfo?.hasSpecificTravelPlans && !ds160.travelInfo?.intendedArrivalDate) {
  //   errors.push('Intended arrival date is required if travel plans are specific.');
  // }
  // if (!ds160.travelInfo?.personPayingForTrip) errors.push('Person paying for trip is required.');
  // if (ds160.travelInfo?.personPayingForTrip !== 'Self' && !ds160.travelInfo?.payerName) {
  //   errors.push('Payer name is required when someone else is paying for the trip.');
  // }

  // // US Contact
  // if (!ds160.usContact?.contactName) errors.push('US contact name is required.');
  // if (!ds160.usContact?.contactAddress) errors.push('US contact address is required.');

  // // Security Questions - Must be explicitly answered
  // if (ds160.security?.hasCommunicableDisease === undefined) errors.push('Must answer communicable disease question.');
  // if (ds160.security?.hasHarmfulPhysicalOrMentalDisorder === undefined) errors.push('Must answer physical/mental disorder question.');
  // if (ds160.security?.isDrugAbuserOrAddict === undefined) errors.push('Must answer drug abuse question.');
  // if (ds160.security?.hasBeenArrested === undefined) errors.push('Must answer arrest history question.');
  // if (ds160.security?.hasCriminalHistory === undefined) errors.push('Must answer criminal history question.');
  // if (ds160.security?.hasTerroristConnections === undefined) errors.push('Must answer terrorist connections question.');

  // // Applicant Statement
  // if (!ds160.applicantStatement?.hasReadAndUnderstood) errors.push('Must confirm having read and understood the application.');
  // if (!ds160.applicantStatement?.agreesInformationIsCorrect) errors.push('Must confirm that information is correct.');
  // if (!ds160.applicantStatement?.signature) errors.push('Digital signature is required.');
  // if (!ds160.applicantStatement?.dateSigned) errors.push('Signature date is required.');

  // // Photograph
  // if (!ds160.ds160Photo?.meetsRequirements) errors.push('Photograph must meet requirements.');
  // if (!ds160.ds160Photo?.filePath) errors.push('Photograph must be uploaded.');

  return errors;
};

// ---------------------
// Controller Functions
// ---------------------

// @desc    Get or create the logged-in student's DS-160 form
const getMyDs160 = async (req, res) => {
  try {
    let ds160 = await Ds160.findOne({ student: req.user.id });
    if (!ds160) {
      ds160 = await Ds160.create({
        student: req.user.id,
        consultancy: req.user.consultancy,
      });
    }
    res.json(ds160);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update the logged-in student's DS-160 form (draft mode)
const updateMyDs160 = async (req, res) => {
  try {
    const allowedFields = [
      'personalInfo',
      'passportInfo',
      'contactInfo',
      'travelInfo',
      'previousUSTravel',
      'internationalTravelHistory',
      'usContact',
      'familyInfo',
      'workEducation',
      'sevisInfo',
      'security',
      'additionalContacts',
      'socialMedia',
      'applicantStatement',
      'photograph',
      'additionalInformation'
    ];

    const updates = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const ds160 = await Ds160.findOneAndUpdate(
      { student: req.user.id },
      { $set: updates },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(ds160);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a specific student's DS-160 form (for counselors)
const getStudentDs160 = async (req, res) => {
  try {
    const student = await User.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (student.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const ds160 = await Ds160.findOne({ student: req.params.studentId });
    if (!ds160) return res.status(404).json({ message: 'DS-160 not found' });

    res.json(ds160);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Submit DS-160 for review (with validation)
const submitDs160ForReview = async (req, res) => {
  try {
    const ds160 = await Ds160.findOne({ student: req.user.id });
    if (!ds160) return res.status(404).json({ message: 'DS-160 not found' });

    // Validate fields before allowing submission
    const errors = validateDs160BeforeSubmit(ds160);
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed. Please complete all required fields.',
        errors
      });
    }

    // Generate application ID if not exists
    if (!ds160.applicationId) {
      const timestamp = Date.now().toString().slice(-6);
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      ds160.applicationId = `DS160-${timestamp}-${randomNum}`;
    }

    ds160.status = 'Submitted for Review';
    ds160.submittedAt = new Date();
    await ds160.save();

    res.json({
      message: 'DS-160 submitted successfully for review',
      ds160,
      applicationId: ds160.applicationId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Counselor reviews DS-160 (approve/reject + feedback)
const reviewStudentDs160 = async (req, res) => {
  try {
    const { status, counselorFeedback } = req.body;

    if (!['In Progress', 'Submitted for Review', 'Approved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const student = await User.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (student.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updateData = { status, counselorFeedback };

    // Generate confirmation number when approved
    if (status === 'Approved' && !req.body.confirmationNumber) {
      const timestamp = Date.now().toString().slice(-8);
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      updateData.confirmationNumber = `AA${timestamp}${randomNum}`;
    }

    const ds160 = await Ds160.findOneAndUpdate(
      { student: req.params.studentId },
      { $set: updateData },
      { new: true }
    );

    if (!ds160) return res.status(404).json({ message: 'DS-160 not found' });

    // TODO: send notification to student
    res.json({
      message: `DS-160 ${status.toLowerCase()} successfully`,
      ds160
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all DS-160 forms for consultancy (for counselors/admin)
const getAllDs160 = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let query = { consultancy: req.user.consultancy };
    if (status) {
      query.status = status;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: {
        path: 'student',
        select: 'name email passportNumber'
      },
      sort: { updatedAt: -1 }
    };

    const forms = await Ds160.paginate(query, options);

    res.status(200).json({
      forms: forms.docs,
      totalPages: forms.totalPages,
      currentPage: forms.page,
      totalForms: forms.totalDocs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch DS-160 forms', error: error.message });
  }
};

// @desc    Get DS-160 statistics for dashboard
const getDs160Stats = async (req, res) => {
  try {
    const stats = await Ds160.aggregate([
      {
        $match: { consultancy: mongoose.Types.ObjectId(req.user.consultancy) }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await Ds160.countDocuments({ consultancy: req.user.consultancy });
    const submitted = await Ds160.countDocuments({
      consultancy: req.user.consultancy,
      status: 'Submitted for Review'
    });

    res.json({
      statusBreakdown: stats,
      total,
      pendingReview: submitted
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch statistics', error: error.message });
  }
};
// @desc    Upload a photo for the DS-160 form
// @route   POST /api/ds160/me/photo
// @access  Private (Student)
// const uploadDs160Photo = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'Please upload a photo.' });
//     }

//     const ds160 = await Ds160.findOne({ student: req.user.id });
//     if (!ds160) {
//       return res.status(404).json({ message: 'DS-160 form not found for this student.' });
//     }

//     // Update the photograph section of the form
//     ds160.ds160Photo = {
//       filePath: `/${req.file.path.replace(/\\/g, "/")}`,
//       uploadDate: new Date(),
//       meetsRequirements: true, // Assuming basic upload means it meets requirements for now
//     };

//     await ds160.save();

//     res.status(200).json({
//       message: 'Photo uploaded successfully.',
//       ds160Photo: ds160.ds160Photo
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };   

// @desc    Update the DS-160 photo with a data URL
// @route   PUT /api/ds160/me/photo
// @access  Private (Student)
const uploadDs160Photo = async (req, res) => {
  try {
    // Expecting { filePath: "data:image/jpeg;base64,..." } from the frontend
    const { filePath, meetsRequirements, uploadDate } = req.body;

    if (!filePath) {
      return res.status(400).json({ message: 'No photo data provided.' });
    }

    const ds160 = await Ds160.findOne({ student: req.user.id });
    if (!ds160) {
      return res.status(404).json({ message: 'DS-160 form not found.' });
    }

    // Update the photograph section with the data URL
    ds160.photograph = {
      filePath: filePath, // Save the base64 data URL
      uploadDate: uploadDate || new Date(),
      meetsRequirements: meetsRequirements || false,
    };

    await ds160.save();

    res.status(200).json({
      message: 'Photo updated successfully.',
      photograph: ds1s160.photograph
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getMyDs160,
  updateMyDs160,
  getStudentDs160,
  submitDs160ForReview,
  reviewStudentDs160,
  getAllDs160,
  getDs160Stats,
  uploadDs160Photo
};