


// server/controllers/profileController.js
const Profile = require('../models/profileModel');

//
// ===== Helper Functions =====
//
const handleError = (err, res) => {
  console.error(err.message);

  // Validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ errors });
  }

  // Duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate field value entered', keyValue: err.keyValue });
  }

  res.status(500).json({ message: 'Server Error', error: err.message });
};

const validSections = [
  'personalInfo', 'contactInfo', 'passportInfo', 'familyInfo',
  'educationHistory', 'employmentHistory', 'testScores', 'visaInfo',
  'destinationInfo', 'financialInfo', 'documents', 'dependents',
  'travelHistory', 'profilePictureUrl'
];

const validArrayFields = [
  'educationHistory', 'employmentHistory', 'testScores',
  'documents', 'dependents', 'travelHistory',
  'financialInfo.bankStatements', 'financialInfo.scholarships', 'financialInfo.loans',
  'visaInfo.visaHistory'
];

const updatableArrayFields = [
  'educationHistory', 'employmentHistory', 'testScores',
  'documents', 'dependents', 'travelHistory'
];

//
// ===== Controllers =====
//

// @desc    Get or create user profile
// @route   GET /api/profile/me
const getMyProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'email']);

    if (!profile) {
      // Create basic profile
      profile = await Profile.create({
        user: req.user.id,
        personalInfo: {
          firstName: req.user.name ? req.user.name.split(' ')[0] : '',
          lastName: req.user.name ? req.user.name.split(' ').slice(1).join(' ') : ''
        },
        contactInfo: { email: req.user.email || '' }
      });

      profile = await Profile.findById(profile._id).populate('user', ['name', 'email']);
    }

    res.json(profile);
  } catch (err) {
    handleError(err, res);
  }
};


// @desc    Update specific profile section
// @route   PATCH /api/profile/me/section/:section
const updateProfileSection = async (req, res) => {
  try {
    const { section } = req.params;
    const updateData = req.body;

    if (!validSections.includes(section)) {
      return res.status(400).json({ message: 'Invalid profile section' });
    }

    // Build dot-notation query
    const updateQuery = {};
    for (const [key, value] of Object.entries(updateData)) {
      updateQuery[`${section}.${key}`] = value;
    }

    if (Object.keys(updateQuery).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: updateQuery },
      { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true }
    ).populate('user', ['name', 'email']);

    res.json(profile);
  } catch (err) {
    handleError(err, res);
  }
};

// @desc    Add item to array field
// @route   POST /api/profile/me/array/:arrayField
const addToProfileArray = async (req, res) => {
  try {
    const { arrayField } = req.params;
    const newItem = req.body;

    if (!validArrayFields.includes(arrayField)) {
      return res.status(400).json({ message: 'Invalid array field' });
    }

    const updateQuery = {};
    updateQuery[arrayField] = newItem;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $push: updateQuery },
      { new: true, runValidators: true }
    ).populate('user', ['name', 'email']);

    res.json(profile);
  } catch (err) {
    handleError(err, res);
  }
};

// @desc    Update item in an array field
// @route   PUT /api/profile/me/array/:arrayField/:itemId
const updateProfileArrayItem = async (req, res) => {
  try {
    const { arrayField, itemId } = req.params;
    const updateData = req.body;

    if (!updatableArrayFields.includes(arrayField)) {
      return res.status(400).json({ message: 'Invalid array field for update operation' });
    }

    const updateQuery = {};
    for (const [key, value] of Object.entries(updateData)) {
      updateQuery[`${arrayField}.$[element].${key}`] = value;
    }

    if (Object.keys(updateQuery).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: updateQuery },
      { new: true, runValidators: true, arrayFilters: [{ 'element._id': itemId }] }
    ).populate('user', ['name', 'email']);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    handleError(err, res);
  }
};

// @desc    Remove item from array field
// @route   DELETE /api/profile/me/array/:arrayField/:itemId
const removeFromProfileArray = async (req, res) => {
  try {
    const { arrayField, itemId } = req.params;

    if (!validArrayFields.includes(arrayField)) {
      return res.status(400).json({ message: 'Invalid array field' });
    }

    const updateQuery = {};
    updateQuery[arrayField] = { _id: itemId };

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: updateQuery },
      { new: true }
    ).populate('user', ['name', 'email']);

    res.json(profile);
  } catch (err) {
    handleError(err, res);
  }
};

// @desc    Upload profile picture
// @route   POST /api/profile/me/picture
const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image file.' });
    }

    const filePath = `/${req.file.path.replace(/\\/g, '/').replace('public/', '')}`;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: { profilePictureUrl: filePath } },
      { new: true }
    ).populate('user', ['name', 'email']);

    res.status(200).json(profile);
  } catch (err) {
    handleError(err, res);
  }
};

// @desc    Get student profile (admin/advisor only)
// @route   GET /api/profile/student/:studentId
const getStudentProfile = async (req, res) => {
  try {
    // TODO: enforce role-based access (admin/advisor only)
    const profile = await Profile.findOne({ user: req.params.studentId })
      .populate('user', ['name', 'email']);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    handleError(err, res);
  }
};

// @desc    Get profile completion
// @route   GET /api/profile/me/completion
const getProfileCompletion = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    res.json({ completion: profile ? profile.profileCompletion : 0 });
  } catch (err) {
    handleError(err, res);
  }
};

// @desc    Get profiles by visa type (admin only)
// @route   GET /api/profile/visa-type/:visaType
const getProfilesByVisaType = async (req, res) => {
  try {
    // TODO: enforce admin-only access
    const { visaType } = req.params;
    const profiles = await Profile.find({ 'visaInfo.intendedVisa.type': visaType })
      .populate('user', ['name', 'email']);

    res.json(profiles);
  } catch (err) {
    handleError(err, res);
  }
};

// @desc    Get financial overview
// @route   GET /api/profile/me/financial-overview
const getFinancialOverview = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile || !profile.financialInfo) {
      return res.json({ totalAvailable: 0, currency: 'USD', breakdown: {} });
    }

    const { financialInfo, destinationInfo } = profile;
    let totalAvailable = 0;
    const breakdown = {};

    // Bank statements
    if (financialInfo.bankStatements?.length) {
      breakdown.bankTotal = financialInfo.bankStatements.reduce((sum, s) => sum + (s.balance || 0), 0);
      totalAvailable += breakdown.bankTotal;
    }

    // Scholarships
    if (financialInfo.scholarships?.length) {
      breakdown.scholarshipTotal = financialInfo.scholarships.reduce((sum, s) => sum + (s.amount || 0), 0);
      totalAvailable += breakdown.scholarshipTotal;
    }

    // Loans
    if (financialInfo.loans?.length) {
      breakdown.loanTotal = financialInfo.loans.reduce((sum, l) => sum + (l.amount || 0), 0);
      totalAvailable += breakdown.loanTotal;
    }

    // Sponsor
    if (financialInfo.sponsor?.annualIncome) {
      breakdown.sponsorAnnualIncome = financialInfo.sponsor.annualIncome;
    }

    const tuition = destinationInfo?.estimatedTuition || 0;
    const living = destinationInfo?.estimatedLivingExpenses || 0;

    res.json({
      totalAvailable,
      currency: 'USD', // TODO: multi-currency support
      breakdown,
      meetsRequirements: totalAvailable >= (tuition + living)
    });
  } catch (err) {
    handleError(err, res);
  }
};

//
// ===== Exports =====
//
module.exports = {
  getMyProfile,
  updateProfileSection,
  addToProfileArray,
  updateProfileArrayItem,
  removeFromProfileArray,
  uploadProfilePicture,
  getStudentProfile,
  getProfileCompletion,
  getProfilesByVisaType,
  getFinancialOverview
};
