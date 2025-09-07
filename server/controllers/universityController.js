
const PartnerUniversity = require('../models/partnerUniversityModel');
const Profile = require('../models/profileModel');
const axios = require('axios');


// @desc    Get all partner universities for a consultancy with optional filtering
const getPartnerUniversities = async (req, res) => {
  try {
    const {
      search,
      country,
      programLevel,
      partnershipLevel,
      hasScholarships,
      page = 1,
      limit = 10,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    const filter = { consultancy: req.user.consultancy };

    if (search) {
      filter.$text = { $search: search };
    }
    if (country && country !== 'All') filter.country = country;
    if (programLevel && programLevel !== 'All') filter['programs.level'] = programLevel;
    if (partnershipLevel && partnershipLevel !== 'All') filter.partnershipLevel = partnershipLevel;
    if (hasScholarships === 'true') filter['programs.scholarshipsAvailable'] = true;

    const sortOptions = {};
    if (search) {
      sortOptions.score = { $meta: 'textScore' };
    }
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const limitNum = parseInt(limit, 10);
    const pageNum = parseInt(page, 10);
    const skip = (pageNum - 1) * limitNum;

    const universities = await PartnerUniversity.find(filter)
      .sort(sortOptions)
      .limit(limitNum)
      .skip(skip);

    const total = await PartnerUniversity.countDocuments(filter);

    res.json({
      universities,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      total
    });
  } catch (error) {
    console.error('Error fetching universities:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single partner university
const getPartnerUniversity = async (req, res) => {
  try {
    const university = await PartnerUniversity.findOne({
      _id: req.params.id,
      consultancy: req.user.consultancy
    });

    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }

    res.json(university);
  } catch (error) {
    console.error('Error fetching university:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new partner university
const addPartnerUniversity = async (req, res) => {
  // --- ADD THIS LINE ---
  console.log("INCOMING REQUEST BODY:", req.body);

  try {
    const university = await PartnerUniversity.create({
      ...req.body,
      consultancy: req.user.consultancy,
    });
    res.status(201).json(university);
  } catch (error) {
    console.error('Error adding university:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a partner university
const updatePartnerUniversity = async (req, res) => {
  try {
    // IMPROVEMENT: More flexible way to prevent mass assignment.
    // We create a copy of the body and remove fields that should never be updated.
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.consultancy;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updatedUniversity = await PartnerUniversity.findOneAndUpdate(
      { _id: req.params.id, consultancy: req.user.consultancy },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUniversity) {
      return res.status(404).json({ message: 'University not found or not authorized' });
    }

    res.json(updatedUniversity);
  } catch (error) {
    console.error('Error updating university:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a partner university
const deletePartnerUniversity = async (req, res) => {
  try {
    const university = await PartnerUniversity.findOneAndDelete({
      _id: req.params.id,
      consultancy: req.user.consultancy
    });

    if (!university) {
      return res.status(403).json({ message: 'Not authorized or university not found' });
    }

    res.json({ message: 'University removed successfully' });
  } catch (error) {
    console.error('Error deleting university:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- Sub-document CRUD for Programs ---

// @desc    Add a program to a university
const addProgramToUniversity = async (req, res) => {
  try {
    const university = await PartnerUniversity.findOne({
      _id: req.params.id,
      consultancy: req.user.consultancy
    });

    if (!university) {
      return res.status(403).json({ message: 'Not authorized or university not found' });
    }

    if (!Array.isArray(university.programs)) {
      university.programs = [];
    }

    university.programs.push(req.body);
    const updatedUniversity = await university.save();

    res.status(200).json(updatedUniversity);
  } catch (error) {
    console.error('Error adding program:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a program in a university
const updateProgramInUniversity = async (req, res) => {
  try {
    const { id, programId } = req.params;
    const university = await PartnerUniversity.findOne({ _id: id, consultancy: req.user.consultancy });

    if (!university) {
      return res.status(403).json({ message: 'Not authorized or university not found' });
    }

    const program = university.programs.id(programId);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // IMPROVEMENT: Sanitize the body to prevent mass assignment on the sub-document.
    const updateData = { ...req.body };
    delete updateData._id; // Never allow updating the sub-document's ID

    program.set(updateData);
    const updatedUniversity = await university.save();

    res.json(updatedUniversity);
  } catch (error) {
    console.error('Error updating program:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a program from a university
// const deleteProgramFromUniversity = async (req, res) => {
//   try {
//     const { id, programId } = req.params;
//     const university = await PartnerUniversity.findOne({ _id: id, consultancy: req.user.consultancy });

//     if (!university) {
//       return res.status(403).json({ message: 'Not authorized or university not found' });
//     }

//     const program = university.programs.id(programId);
//     if (program) {
//       program.remove();
//       await university.save();
//     } else {
//       return res.status(404).json({ message: 'Program not found' });
//     }

//     res.json({ message: 'Program removed successfully' });
//   } catch (error) {
//     console.error('Error deleting program:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

const deleteProgramFromUniversity = async (req, res) => {
  try {
    const { id, programId } = req.params;
    const university = await PartnerUniversity.findOne({
      _id: id,
      consultancy: req.user.consultancy
    });

    if (!university) {
      return res.status(403).json({ message: 'Not authorized or university not found' });
    }

    // Check if program exists
    const program = university.programs.id(programId);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Remove the program using pull() method
    university.programs.pull(programId);
    await university.save();

    res.json({ message: 'Program removed successfully' });
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- Helper Functions for Filters ---

// @desc    Get countries list for filter
const getCountries = async (req, res) => {
  try {
    const countries = await PartnerUniversity.distinct('country', {
      consultancy: req.user.consultancy
    });
    res.json(countries.sort());
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get program levels for filter
const getProgramLevels = async (req, res) => {
  try {
    const programLevels = await PartnerUniversity.distinct('programs.level', {
      consultancy: req.user.consultancy
    });
    res.json(programLevels.filter(level => level != null));
  } catch (error) {
    console.error('Error fetching program levels:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



// @desc    Get a single program by its ID
// @route   GET /api/programs/:id
const getProgramById = async (req, res) => {
  try {
    // Find the university that contains the program
    const university = await PartnerUniversity.findOne({
      'programs._id': req.params.id,
      consultancy: req.user.consultancy
    });

    if (!university) {
      return res.status(404).json({ message: 'Program not found or you are not authorized' });
    }

    // Extract the specific program sub-document
    const program = university.programs.id(req.params.id);

    res.json({
      program,
      university: {
        _id: university._id,
        name: university.name
      }
    });
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const getUniversityRecommendations = async (req, res) => {
  try {
    console.log("--- Starting University Recommendation ---");

    const studentProfile = await Profile.findOne({ user: req.user.id });
    if (!studentProfile) {
      return res.status(400).json({ message: 'Please complete your profile first.' });
    }

    // Use the correct paths from your detailed Profile model
    const profileSummary = `
      - Major: ${studentProfile.educationHistory[0]?.fieldOfStudy || 'Not specified'}
      - Country Preference: ${studentProfile.travelHistory[0]?.country || 'Not specified'}
      - English Test Score (Duolingo): ${studentProfile.testScores.find(t => t.testType === 'Duolingo')?.score || 'N/A'}
      - GPA: ${studentProfile.educationHistory[0]?.gpa || 'N/A'}
    `;
    console.log("Debug: Generated Profile Summary for AI:\n", profileSummary);

    const systemPrompt = `You are an expert university admissions counselor. Based on the student's profile, recommend 9 universities and categorize them as "Ambitious" (3 schools), "Target" (3 schools), and "Safe" (3 schools). For each university, provide a short reason for the recommendation.

    Student Profile:
    ${profileSummary}

    Return your answer as a valid JSON object with the following structure:
    {
      "ambitious": [{ "name": "University Name", "reason": "Reason..." }],
      "target": [{ "name": "University Name", "reason": "Reason..." }],
      "safe": [{ "name": "University Name", "reason": "Reason..." }]
    }`;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'openai/gpt-4o-mini',
      response_format: { type: "json_object" },
      messages: [{ role: 'system', content: systemPrompt }],
    }, { headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}` } });

    const recommendations = JSON.parse(response.data.choices[0].message.content);
    res.json(recommendations);

  } catch (error) {
    console.error("--- ERROR in getUniversityRecommendations ---");
    if (error.response) {
      console.error("API Error Status:", error.response.status);
      console.error("API Error Data:", error.response.data);
    } else {
      console.error("Non-API Error:", error.message);
    }
    res.status(500).json({ message: 'Failed to get recommendations.' });
  }
};




module.exports = {
  getPartnerUniversities,
  getPartnerUniversity,
  addPartnerUniversity,
  updatePartnerUniversity,
  deletePartnerUniversity,
  addProgramToUniversity,
  updateProgramInUniversity,
  deleteProgramFromUniversity,
  getCountries,
  getProgramLevels,
  getUniversityRecommendations,
};