

const Application = require('../models/applicationModel');
const User = require('../models/userModel');


// @desc    Create a new visa application record
const createApplication = async (req, res) => {
  try {
    const { student, university, program, visaStatus } = req.body;

    // Security check
    const studentUser = await User.findById(student);
    if (!studentUser || studentUser.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized for this student' });
    }

    const application = await Application.create({
      student,
      university,
      program,
      visaStatus,
      consultancy: req.user.consultancy,
    });
    res.status(201).json(application);
  } catch (error) {
    console.error("Error in createApplication:", error); // This log will show the exact error
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all visa applications for a consultancy
// const getApplications = async (req, res) => {
//   try {
//     let applications = await Application.find({ consultancy: req.user.consultancy })
//       .populate('student', 'name email')
//       .populate('university', 'name country'); // FIX: Populate the linked university

//     applications = applications.filter(app => app.student); // Filter out orphaned records
//     res.json(applications);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ consultancy: req.user.consultancy })
      .populate('student', 'name email')
      .populate('university', 'name country'); // This line gets the university details

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a visa application record
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application || application.consultancy.toString() !== req.user.consultancy.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a visa application record

const deleteApplication = async (req, res) => {

  try {

    const application = await Application.findById(req.params.id);

    if (!application || application.consultancy.toString() !== req.user.consultancy.toString()) {

      return res.status(403).json({ message: 'Not authorized' });

    }

    await Application.findByIdAndDelete(req.params.id);

    res.json({ message: 'Application record removed' });

  } catch (error) {

    res.status(500).json({ message: 'Server Error' });

  }

};







// const getApplicationStats = async (req, res) => {
//   try {
//     const { country, university } = req.query;
//     const matchStage = { consultancy: req.user.consultancy };

//     if (country) matchStage.appliedCountry = country;
//     if (university) matchStage.appliedUniversity = university;

//     const stats = await Application.aggregate([
//       { $match: matchStage },
//       { $group: { _id: '$visaStatus', count: { $sum: 1 } } },
//       { $project: { status: '$_id', count: 1, _id: 0 } }
//     ]);
//     res.json(stats);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// const getApplicationStats = async (req, res) => {
//   try {
//     const { country, university } = req.query;
//     const matchStage = { consultancy: req.user.consultancy };

//     // Add the university ID to the main filter if present
//     if (university) matchStage.university = new mongoose.Types.ObjectId(university);

//     const pipeline = [
//       { $match: matchStage },
//       // Use $lookup to join with the partneruniversities collection
//       {
//         $lookup: {
//           from: 'partneruniversities',
//           localField: 'university',
//           foreignField: '_id',
//           as: 'universityDetails'
//         }
//       },
//       { $unwind: '$universityDetails' },
//     ];

//     // If a country filter is applied, add a second match stage
//     if (country) {
//       pipeline.push({ $match: { "universityDetails.country": country } });
//     }

//     // Final grouping stage
//     pipeline.push(
//       { $group: { _id: '$visaStatus', count: { $sum: 1 } } },
//       { $project: { status: '$_id', count: 1, _id: 0 } }
//     );

//     const stats = await Application.aggregate(pipeline);
//     res.json(stats);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

const getApplicationStats = async (req, res) => {
  try {
    const { country, university } = req.query;
    const matchStage = { consultancy: req.user.consultancy };

    if (country) matchStage.appliedCountry = country;
    if (university) matchStage.appliedUniversity = university;

    const stats = await Application.aggregate([
      { $match: matchStage },
      { $group: { _id: '$visaStatus', count: { $sum: 1 } } },
      { $project: { status: '$_id', count: 1, _id: 0 } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports = {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
  getApplicationStats,
};
