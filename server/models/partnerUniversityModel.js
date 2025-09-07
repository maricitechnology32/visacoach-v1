 


const mongoose = require('mongoose');

// ISO 4217 Currency Codes
const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'];

// Reusable Sub-Schemas
const priceSchema = new mongoose.Schema({
  amount: { type: Number, required: true, min: 0 },
  currency: {
    type: String,
    default: 'USD',
    required: true,
    enum: CURRENCIES
  },
  period: {
    type: String,
    enum: ['per semester', 'per year', 'per course', 'full program', 'per month', 'one-time']
  }
}, { _id: false });

const rankingSchema = new mongoose.Schema({
  organization: { type: String, required: true },
  rank: { type: Number, required: true, min: 1 },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1 // Allow next year's rankings
  },
  subject: { type: String, default: 'Overall' }
}, { _id: false });

// Language Test Scores with validation
const languageTestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['IELTS', 'TOEFL', 'PTE', 'Duolingo', 'Cambridge']
  },
  minimumScore: { type: Number, required: true }
}, { _id: false });

// Main Program Schema
const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String }, // Add program code for easier reference
  level: {
    type: String,
    enum: ['Bachelors', 'Masters', 'PhD', 'Diploma', 'Certificate'],
    required: true,
  },
  duration: {
    value: { type: Number, min: 0 },
    unit: { type: String, enum: ['years', 'months', 'semesters', 'weeks'] }
  },
  tuitionFee: priceSchema,
  applicationFee: priceSchema,
  applicationDeadline: {
    type: Date,
    validate: {
      validator: function (date) {
        // Allow null deadlines (rolling admissions)
        return date === null || date > Date.now();
      },
      message: 'Application deadline must be in the future'
    }
  },
  intakeSeasons: [{
    type: String,
    enum: ['Fall', 'Spring', 'Summer', 'Winter']
  }],
  applicationLink: {
    type: String,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i, 'Please provide a valid URL']
  },
  languageRequirements: [languageTestSchema],
  academicRequirements: {
    minimumGPA: {
      type: Number,
      min: 0,
      max: 5,
      validate: {
        validator: function (gpa) {
          // Allow null for programs without GPA requirements
          return gpa === null || (gpa >= 0 && gpa <= 5);
        },
        message: 'GPA must be between 0 and 5'
      }
    },
    requiredTests: [{
      name: String,
      minimumScore: Number
    }]
  },
  scholarshipsAvailable: { type: Boolean, default: false },
  scholarshipDetails: { type: String },
  programDescription: { type: String },
  credits: { type: Number, min: 0 }, // Add credit information
  faculty: { type: String } // Department or faculty offering the program
}, { timestamps: true });

// Partner University Schema
const partnerUniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  country: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  city: { type: String, trim: true },
  website: {
    type: String,
    required: true,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i, 'Please provide a valid URL']
  },
  description: { type: String },
  establishedYear: {
    type: Number,
    min: 1000,
    max: new Date().getFullYear()
  },
  type: {
    type: String,
    enum: ['Public', 'Private', 'Non-profit'],
    default: 'Public'
  },
  campusSetting: {
    type: String,
    enum: ['Urban', 'Suburban', 'Rural', 'Online', 'Mixed']
  },
  totalStudents: {
    type: Number,
    min: 0,
    validate: {
      validator: function (total) {
        return !this.internationalStudents || total >= this.internationalStudents;
      },
      message: 'International students cannot exceed total students'
    }
  },
  internationalStudents: {
    type: Number,
    min: 0
  },
  studentFacultyRatio: { type: Number, min: 0 },
  acceptanceRate: {
    type: Number,
    min: 0,
    max: 100
  },
  programs: [programSchema],
  rankings: [rankingSchema],
  accreditation: [{ type: String }],
  housingOptions: {
    onCampus: { type: Boolean, default: false },
    offCampusAssistance: { type: Boolean, default: false },
    cost: priceSchema // Add housing cost estimate
  },
  estimatedLivingCosts: priceSchema,
  partnershipLevel: {
    type: String,
    enum: ['Standard', 'Premium', 'Strategic'],
    default: 'Standard'
  },
  partnershipStartDate: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (date) {
        return date <= Date.now();
      },
      message: 'Partnership start date cannot be in the future'
    }
  },
  specialOpportunities: [{
    type: String,
    enum: ['Exchange Programs', 'Dual Degrees', 'Research Collaboration',
      'Faculty Exchange', 'Summer Programs', 'Internships']
  }],
  contactInformation: {
    internationalOffice: {
      email: {
        type: String,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
      },
      phone: { type: String }
    },
    representative: {
      name: { type: String },
      email: {
        type: String,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
      },
      phone: { type: String }
    }
  },
  socialMedia: {
    facebook: {
      type: String,
      match: [/^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/[\w.-]+$/i, 'Invalid Facebook URL']
    },
    twitter: {
      type: String,
      match: [/^(https?:\/\/)?(www\.)?(twitter|x)\.com\/[\w.-]+$/i, 'Invalid Twitter/X URL']
    },
    instagram: {
      type: String,
      match: [/^(https?:\/\/)?(www\.)?instagram\.com\/[\w.-]+$/i, 'Invalid Instagram URL']
    },
    linkedin: {
      type: String,
      match: [/^(https?:\/\/)?(www\.)?linkedin\.com\/(company|school)\/[\w.-]+$/i, 'Invalid LinkedIn URL']
    },
    youtube: {
      type: String,
      match: [/^(https?:\/\/)?(www\.)?youtube\.com\/(user\/|channel\/|@)?[\w.-]+$/i, 'Invalid YouTube URL']
    }
  },
  imageUrl: {
    type: String,
    match: [/^(https?:\/\/).*\.(png|jpg|jpeg|gif|svg|webp)$/i, 'Invalid Image URL']
  },
  brochureUrl: {
    type: String,
    match: [/^(https?:\/\/).*\.(pdf|doc|docx)$/i, 'Invalid Brochure URL']
  },
  virtualTourUrl: { type: String },
  applicationProcess: { type: String },
  visaSupport: { type: Boolean, default: false },
  consultancy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultancy',
    required: true,
  },
  isActive: { type: Boolean, default: true },
  popularityScore: { type: Number, default: 0, min: 0 },
  lastUpdated: { type: Date, default: Date.now } // Separate from timestamps for business logic
}, { timestamps: true });

// Indexes
partnerUniversitySchema.index({ name: 'text', country: 'text', 'programs.name': 'text' });
partnerUniversitySchema.index({ country: 1 });
partnerUniversitySchema.index({ 'programs.level': 1 });
partnerUniversitySchema.index({ partnershipLevel: 1 });
partnerUniversitySchema.index({ country: 1, 'programs.level': 1 });
partnerUniversitySchema.index({ isActive: 1 }); // For filtering active universities
partnerUniversitySchema.index({ consultancy: 1 }); // For filtering by consultancy

// Pre-save middleware to update lastUpdated
partnerUniversitySchema.pre('save', function (next) {
  this.lastUpdated = new Date();
  next();
});

// Static method to find by country and program level
partnerUniversitySchema.statics.findByCountryAndLevel = function (country, level) {
  return this.find({
    country: new RegExp(country, 'i'),
    'programs.level': level,
    isActive: true
  });
};

// Instance method to add a program
partnerUniversitySchema.methods.addProgram = function (programData) {
  this.programs.push(programData);
  return this.save();
};

module.exports = mongoose.model('PartnerUniversity', partnerUniversitySchema);