// server/controllers/consultancyController.js

const Consultancy = require('../models/consultancyModel');

// @desc    Create a new consultancy
// @route   POST /api/consultancies
// @access  Private (Super Admin)
const createConsultancy = async (req, res) => {
  try {
    const { name, contactEmail, address } = req.body;

    if (!name || !contactEmail) {
      return res.status(400).json({ message: 'Please provide a name and contact email.' });
    }

    const consultancyExists = await Consultancy.findOne({ name });
    if (consultancyExists) {
      return res.status(400).json({ message: 'A consultancy with this name already exists.' });
    }

    const consultancy = await Consultancy.create({
      name,
      contactEmail,
      address,
    });

    res.status(201).json(consultancy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const getConsultancies = async (req, res) => {
  const consultancies = await Consultancy.find({});
  res.json(consultancies);
};
const toggleConsultancyStatus = async (req, res) => {
  const consultancy = await Consultancy.findById(req.params.id);
  if (!consultancy) return res.status(404).json({ message: 'Consultancy not found' });

  // Toggle the status
  consultancy.isActive = !consultancy.isActive;
  await consultancy.save();

  res.json(consultancy);
};
const updateConsultancy = async (req, res) => {
  const consultancy = await Consultancy.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!consultancy) return res.status(404).json({ message: 'Consultancy not found' });
  res.json(consultancy);
};

module.exports = {
  createConsultancy,
  getConsultancies,    
  toggleConsultancyStatus,
  updateConsultancy
};