// server/controllers/financialController.js
const FinancialProfile = require('../models/financialProfileModel');
const PDFDocument = require('pdfkit');
// @desc    Get or create a student's financial profile
// @route   GET /api/financials
// @access  Private (Student)
const getFinancialProfile = async (req, res) => {
  try {
    let profile = await FinancialProfile.findOne({ student: req.user.id });

    // If no profile exists, create a new blank one
    if (!profile) {
      profile = await FinancialProfile.create({ student: req.user.id });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a student's financial profile
// @route   PUT /api/financials
// @access  Private (Student)
const updateFinancialProfile = async (req, res) => {
  try {
    const { estimatedExpenses, assets } = req.body;

    const profileData = {
      student: req.user.id,
      estimatedExpenses,
      assets,
    };

    // Find the profile and update it, or create if it doesn't exist (upsert)
    const updatedProfile = await FinancialProfile.findOneAndUpdate(
      { student: req.user.id },
      profileData,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const generateFinancialReport = async (req, res) => {
  try {
    // 1. Fetch the user's financial profile and basic info
    const profile = await FinancialProfile.findOne({ student: req.user.id });
    const user = req.user;

    if (!profile) {
      return res.status(404).json({ message: 'Financial profile not found. Please add your financial details first.' });
    }

    // 2. Create a new PDF document in memory
    const doc = new PDFDocument({ margin: 50 });

    // 3. Set HTTP headers to tell the browser to download the file
    const fileName = `Financial_Summary_${user.name.replace(/\s+/g, '_')}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    // Pipe the PDF content directly to the response
    doc.pipe(res);

    // 4. Add content to the PDF
    // Header
    doc.fontSize(20).font('Helvetica-Bold').text('Financial Summary for Visa Application', { align: 'center' });
    doc.moveDown();

    // Student Details
    doc.fontSize(12).font('Helvetica').text(`Name: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.moveDown(2);

    // Calculations
    const totalExpenses = (profile.estimatedExpenses.tuition || 0) + (profile.estimatedExpenses.livingCosts || 0) + (profile.estimatedExpenses.other || 0);
    const totalAssets = profile.assets.reduce((sum, asset) => sum + asset.amount, 0);
    const surplus = totalAssets - totalAssets;

    // Assets Table
    doc.fontSize(14).font('Helvetica-Bold').text('Available Funds / Assets');
    profile.assets.forEach(asset => {
      doc.fontSize(11).font('Helvetica').text(`- ${asset.description} (${asset.assetType}): $${asset.amount.toLocaleString()}`);
    });
    doc.moveDown();

    // Summary Section
    doc.fontSize(16).font('Helvetica-Bold').text(`Total Available Funds: $${totalAssets.toLocaleString()} USD`);
    doc.fontSize(12).font('Helvetica').text(`Total Estimated Expenses: $${totalExpenses.toLocaleString()} USD`);
    doc.moveDown();

    // Final Surplus/Deficit
    const surplusColor = surplus >= 0 ? 'green' : 'red';
    doc.fontSize(18).font('Helvetica-Bold').fillColor(surplusColor).text(`Surplus: $${surplus.toLocaleString()} USD`);

    // 5. Finalize the PDF
    doc.end();

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Server Error while generating PDF.' });
  }
};


// Update module.exports
module.exports = {
  getFinancialProfile,
  updateFinancialProfile,
  generateFinancialReport,
};