
// const mongoose = require('mongoose');

// const addressSchema = new mongoose.Schema({
//   street: String,
//   city: String,
//   state: String,
//   postalCode: String,
//   country: String
// });

// const educationSchema = new mongoose.Schema({
//   institution: String,
//   degree: String,
//   fieldOfStudy: String,
//   startDate: Date,
//   endDate: Date,
//   gpa: Number,
//   isCurrent: Boolean
// });

// const employmentSchema = new mongoose.Schema({
//   employer: String,
//   position: String,
//   startDate: Date,
//   endDate: Date,
//   isCurrent: Boolean,
//   description: String
// });

// const testScoreSchema = new mongoose.Schema({
//   testType: {
//     type: String,
//     enum: ['TOEFL', 'IELTS', 'GRE', 'GMAT', 'PTE', 'Duolingo', 'SAT', 'ACT', 'Other']
//   },
//   score: Number,
//   testDate: Date,
//   reading: Number,
//   listening: Number,
//   speaking: Number,
//   writing: Number,
//   total: Number
// });

// const documentSchema = new mongoose.Schema({
//   documentType: {
//     type: String,
//     enum: ['PASSPORT', 'PHOTO', 'TRANSCRIPT', 'DIPLOMA', 'FINANCIAL_STATEMENT', 'BANK_LETTER', 'SPONSOR_LETTER', 'RESUME', 'RECOMMENDATION_LETTER', 'VISA', 'I20', 'DS2019', 'OTHER']
//   },
//   fileName: String,
//   fileUrl: String,
//   uploadDate: {
//     type: Date,
//     default: Date.now
//   },
//   description: String
// });

// const dependentSchema = new mongoose.Schema({
//   fullName: String,
//   relationship: {
//     type: String,
//     enum: ['SPOUSE', 'CHILD', 'PARENT', 'OTHER']
//   },
//   dateOfBirth: Date,
//   passportNumber: String,
//   passportExpiry: Date,
//   countryOfCitizenship: String,
//   countryOfResidence: String
// });

// const visaApplicationSchema = new mongoose.Schema({
//   country: String,
//   visaType: String,
//   applicationDate: Date,
//   status: {
//     type: String,
//     enum: ['NOT_STARTED', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'DENIED', 'APPEALING']
//   },
//   applicationNumber: String,
//   interviewDate: Date,
//   decisionDate: Date
// });

// const profileSchema = new mongoose.Schema({
//   // Reference to the main User model
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     unique: true,
//   },

//   // Personal Information
//   personalInfo: {
//     firstName: String,
//     middleName: String,
//     lastName: String,
//     dateOfBirth: Date,
//     placeOfBirth: {
//       city: String,
//       country: String
//     },
//     gender: {
//       type: String,
//       enum: ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']
//     },
//     maritalStatus: {
//       type: String,
//       enum: ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'SEPARATED']
//     },
//     nationality: String,
//     otherNationalities: [String]
//   },

//   // Contact Information
//   contactInfo: {
//     email: String,
//     phone: {
//       countryCode: String,
//       number: String
//     },
//     emergencyContact: {
//       fullName: String,
//       relationship: String,
//       phone: {
//         countryCode: String,
//         number: String
//       },
//       email: String,
//       address: addressSchema
//     },
//     currentAddress: addressSchema,
//     permanentAddress: addressSchema,
//     sameAsPermanent: Boolean
//   },

//   // Passport Information
//   passportInfo: {
//     passportNumber: String,
//     issuingCountry: String,
//     issueDate: Date,
//     expiryDate: Date,
//     placeOfIssue: String
//   },

//   // Family Information
//   familyInfo: {
//     father: {
//       fullName: String,
//       dateOfBirth: Date,
//       nationality: String,
//       occupation: String,
//       currentAddress: addressSchema
//     },
//     mother: {
//       fullName: String,
//       dateOfBirth: Date,
//       nationality: String,
//       occupation: String,
//       currentAddress: addressSchema
//     },
//     spouse: {
//       fullName: String,
//       dateOfBirth: Date,
//       nationality: String,
//       occupation: String,
//       currentAddress: addressSchema
//     },
//     children: [{
//       fullName: String,
//       dateOfBirth: Date,
//       relationship: String
//     }]
//   },

//   // Educational Background
//   educationHistory: [educationSchema],

//   // Employment History
//   employmentHistory: [employmentSchema],

//   // Test Scores
//   testScores: [testScoreSchema],

//   // Visa Information
//   visaInfo: {
//     currentVisaType: String,
//     currentVisaExpiry: Date,
//     visaHistory: [visaApplicationSchema],
//     intendedVisa: {
//       country: String,
//       type: String,
//       intendedDate: Date
//     },
//     sevisId: String, // For US F-1 visas
//     caseNumber: String // For US H-1B visas
//   },

//   // Destination Information
//   destinationInfo: {
//     country: String,
//     university: String,
//     program: String,
//     major: String,
//     degree: String,
//     startDate: Date,
//     duration: Number, // in months
//     estimatedTuition: Number,
//     estimatedLivingExpenses: Number
//   },

//   // Financial Information
//   financialInfo: {
//     fundingSource: {
//       type: String,
//       enum: ['PERSONAL', 'FAMILY', 'SCHOLARSHIP', 'EDUCATION_LOAN', 'EMPLOYER', 'GOVERNMENT', 'OTHER']
//     },
//     sponsor: {
//       name: String,
//       relationship: String,
//       occupation: String,
//       annualIncome: Number,
//       contactInfo: {
//         phone: String,
//         email: String,
//         address: addressSchema
//       }
//     },
//     bankStatements: [{
//       bankName: String,
//       accountType: String,
//       balance: Number,
//       currency: String
//     }],
//     scholarships: [{
//       name: String,
//       amount: Number,
//       duration: Number
//     }],
//     loans: [{
//       institution: String,
//       amount: Number,
//       disbursementDate: Date
//     }]
//   },

//   // Document Repository
//   documents: [documentSchema],

//   // Dependents (for visas that allow dependents)
//   dependents: [dependentSchema],

//   // Travel History
//   travelHistory: [{
//     country: String,
//     purpose: String,
//     startDate: Date,
//     endDate: Date,
//     visaType: String
//   }],

//   // Profile settings
//   profilePictureUrl: {
//     type: String,
//     default: '/images/default-avatar.png'
//   },

//   // Status tracking
//   profileCompletion: {
//     type: Number,
//     default: 0,
//     min: 0,
//     max: 100
//   }

// }, { timestamps: true });

// // Pre-save middleware to calculate profile completion percentage
// profileSchema.pre('save', function (next) {
//   let completion = 0;
//   const fieldsToCheck = [
//     this.personalInfo.firstName,
//     this.personalInfo.lastName,
//     this.personalInfo.dateOfBirth,
//     this.contactInfo.email,
//     this.contactInfo.phone.number,
//     this.passportInfo.passportNumber,
//     this.destinationInfo.country,
//     this.destinationInfo.university,
//     this.financialInfo.fundingSource
//   ];

//   const completedFields = fieldsToCheck.filter(field => field !== undefined && field !== '').length;
//   completion = Math.round((completedFields / fieldsToCheck.length) * 100);

//   this.profileCompletion = completion;
//   next();
// });

// module.exports = mongoose.model('Profile', profileSchema);


const mongoose = require('mongoose');

//
// ===== Sub-Schemas =====
//
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String
}, { _id: false });

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
  gpa: Number,
  isCurrent: { type: Boolean, default: false }
}, { _id: false });

const employmentSchema = new mongoose.Schema({
  employer: { type: String, required: true },
  position: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  isCurrent: { type: Boolean, default: false },
  description: String
}, { _id: false });

const testScoreSchema = new mongoose.Schema({
  testType: {
    type: String,
    enum: ['TOEFL', 'IELTS', 'GRE', 'GMAT', 'PTE', 'Duolingo', 'SAT', 'ACT', 'Other'],
    required: true
  },
  score: Number,
  testDate: Date,
  reading: Number,
  listening: Number,
  speaking: Number,
  writing: Number,
  total: Number
}, { _id: false });

const documentSchema = new mongoose.Schema({
  documentType: {
    type: String,
    enum: [
      'PASSPORT', 'PHOTO', 'TRANSCRIPT', 'DIPLOMA', 'FINANCIAL_STATEMENT',
      'BANK_LETTER', 'SPONSOR_LETTER', 'RESUME', 'RECOMMENDATION_LETTER',
      'VISA', 'I20', 'DS2019', 'OTHER'
    ],
    required: true
  },
  fileName: { type: String, required: true },
  fileUrl: {
    type: String,
    required: true,
    match: [/^https?:\/\/.+/, 'File URL must be valid']
  },
  uploadDate: { type: Date, default: Date.now },
  description: String
}, { _id: false });

const dependentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  relationship: {
    type: String,
    enum: ['SPOUSE', 'CHILD', 'PARENT', 'OTHER'],
    required: true
  },
  dateOfBirth: Date,
  passportNumber: String,
  passportExpiry: Date,
  countryOfCitizenship: String,
  countryOfResidence: String
}, { _id: false });

const visaApplicationSchema = new mongoose.Schema({
  country: String,
  visaType: String,
  applicationDate: Date,
  status: {
    type: String,
    enum: ['NOT_STARTED', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'DENIED', 'APPEALING'],
    default: 'NOT_STARTED'
  },
  applicationNumber: String,
  interviewDate: Date,
  decisionDate: Date
}, { _id: false });

//
// ===== Profile Schema =====
//
const profileSchema = new mongoose.Schema({
  // Reference to User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // Personal Info
  personalInfo: {
    firstName: { type: String, required: false },
    middleName: String,
    lastName: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    placeOfBirth: {
      city: String,
      country: String
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']
    },
    maritalStatus: {
      type: String,
      enum: ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'SEPARATED']
    },
    nationality: { type: String, required: false },
    otherNationalities: [String]
  },

  // Contact Info
  contactInfo: {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    phone: {
      countryCode: String,
      number: { type: String, match: [/^\d{7,15}$/, 'Invalid phone number'] }
    },
    emergencyContact: {
      fullName: String,
      relationship: String,
      phone: {
        countryCode: String,
        number: { type: String, match: [/^\d{7,15}$/, 'Invalid phone number'] }
      },
      email: { type: String, match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] },
      address: addressSchema
    },
    currentAddress: addressSchema,
    permanentAddress: addressSchema,
    sameAsPermanent: Boolean
  },

  // Passport Info
  passportInfo: {
    passportNumber: { type: String, unique: true, sparse: true },
    issuingCountry: String,
    issueDate: Date,
    expiryDate: Date,
    placeOfIssue: String
  },

  // Family Info
  familyInfo: {
    father: {
      fullName: String,
      dateOfBirth: Date,
      nationality: String,
      occupation: String,
      currentAddress: addressSchema
    },
    mother: {
      fullName: String,
      dateOfBirth: Date,
      nationality: String,
      occupation: String,
      currentAddress: addressSchema
    },
    spouse: {
      fullName: String,
      dateOfBirth: Date,
      nationality: String,
      occupation: String,
      currentAddress: addressSchema
    },
    children: [{
      fullName: String,
      dateOfBirth: Date,
      relationship: String
    }]
  },

  // Histories
  educationHistory: [educationSchema],
  employmentHistory: [employmentSchema],
  testScores: [testScoreSchema],

  // Visa Info
  visaInfo: {
    currentVisaType: String,
    currentVisaExpiry: Date,
    visaHistory: [visaApplicationSchema],
    intendedVisa: {
      country: String,
      type: String,
      intendedDate: Date
    },
    sevisId: String,
    caseNumber: String
  },

  // Destination Info
  destinationInfo: {
    country: String,
    university: String,
    program: String,
    major: String,
    degree: String,
    startDate: Date,
    duration: Number,
    estimatedTuition: Number,
    estimatedLivingExpenses: Number
  },

  // Financial Info
  financialInfo: {
    fundingSource: {
      type: String,
      enum: ['PERSONAL', 'FAMILY', 'SCHOLARSHIP', 'EDUCATION_LOAN', 'EMPLOYER', 'GOVERNMENT', 'OTHER']
    },
    sponsor: {
      name: String,
      relationship: String,
      occupation: String,
      annualIncome: Number,
      contactInfo: {
        phone: { type: String, match: [/^\d{7,15}$/, 'Invalid phone number'] },
        email: { type: String, match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] },
        address: addressSchema
      }
    },
    bankStatements: [{
      bankName: String,
      accountType: String,
      balance: Number,
      currency: String
    }],
    scholarships: [{
      name: String,
      amount: Number,
      duration: Number
    }],
    loans: [{
      institution: String,
      amount: Number,
      disbursementDate: Date
    }]
  },

  // Documents & Dependents
  documents: [documentSchema],
  dependents: [dependentSchema],

  // Travel History
  travelHistory: [{
    country: String,
    purpose: String,
    startDate: Date,
    endDate: Date,
    visaType: String
  }],

  // Profile Settings
  profilePictureUrl: {
    type: String,
    default: '/images/default-avatar.png'
  },

  // Completion %
  profileCompletion: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }

}, { timestamps: true });

//
// ===== Profile Completion Middleware =====
//
function calculateCompletion(doc) {
  const fieldsToCheck = [
    doc.personalInfo?.firstName,
    doc.personalInfo?.lastName,
    doc.personalInfo?.dateOfBirth,
    doc.contactInfo?.email,
    doc.contactInfo?.phone?.number,
    doc.passportInfo?.passportNumber,
    doc.destinationInfo?.country,
    doc.destinationInfo?.university,
    doc.financialInfo?.fundingSource
  ];
  const completed = fieldsToCheck.filter(v => v !== undefined && v !== '').length;
  return Math.round((completed / fieldsToCheck.length) * 100);
}

profileSchema.pre('save', function (next) {
  this.profileCompletion = calculateCompletion(this);
  next();
});

profileSchema.pre('findOneAndUpdate', function (next) {
  if (this._update) {
    this._update.profileCompletion = calculateCompletion(this._update);
  }
  next();
});

//
// ===== Indexes =====
//
profileSchema.index({ 'contactInfo.email': 1 }, { unique: true });
profileSchema.index({ 'passportInfo.passportNumber': 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Profile', profileSchema);
