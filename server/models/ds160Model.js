

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ds160Schema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  consultancy: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultancy', required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Submitted for Review', 'Approved'], default: 'Not Started' },
  counselorFeedback: { type: String },
  applicationId: { type: String, unique: true, sparse: true }, // DS-160 application ID
  confirmationNumber: String, // DS-160 confirmation number

  // 1. Personal Information
  personalInfo: {
    surname: String,
    givenNames: String,
    fullNameNative: String,
    telecode: String,
    hasOtherNames: { type: Boolean, default: false },
    otherNamesList: [String],
    sex: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer not to say'] },
    maritalStatus: {
      type: String,
      enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated', 'Other']
    },
    dateOfBirth: Date,
    birthCity: String,
    birthState: String,
    birthCountry: String,
    nationality: String,
    hasOtherNationality: { type: Boolean, default: false },
    otherNationalities: [String],
    nationalIdNumber: String,
    hasUsSocialSecurityNumber: { type: Boolean, default: false },
    usSocialSecurityNumber: String,
    hasUsTaxpayerId: { type: Boolean, default: false },
    usTaxpayerIdNumber: String,
  },

  // 2. Passport Information
  passportInfo: {
    passportNumber: String,
    passportBookNumber: String, // Missing in original
    passportIssueDate: Date,
    passportExpiryDate: Date,
    passportIssueAuthority: String, // Missing in original
    passportIssueCity: String, // Missing in original
    passportIssueCountry: String,
    isPassportLostOrStolen: { type: Boolean, default: false }, // Missing in original
    lostOrStolenDetails: String, // Missing in original
  },

  // 3. Contact Information
  contactInfo: {
    homeAddress: {
      street: String,
      city: String,
      stateProvince: String,
      postalCode: String,
      country: String,
    },
    isMailingAddressDifferent: { type: Boolean, default: false },
    mailingAddress: {
      street: String,
      city: String,
      stateProvince: String,
      postalCode: String,
      country: String,
    },
    primaryPhoneNumber: String,
    secondaryPhoneNumber: String, // Missing in original
    email: String,
    additionalEmails: [String], // Missing in original
  },

  // 4. Travel Information
  travelInfo: {
    purposeOfTrip: {
      type: String,
      enum: ['Business', 'Tourism', 'Study', 'Work', 'Exchange', 'Transit', 'Other']
    },
    hasSpecificTravelPlans: { type: Boolean, default: false },
    intendedArrivalDate: Date,
    intendedLengthOfStay: Number, // In days
    addressInUS: String,
    personPayingForTrip: {
      type: String,
      enum: ['Self', 'Family', 'Company', 'Other']
    },
    payerName: String,
    payerRelationship: String,
    payerAddress: String,
    payerPhone: String,
    payerEmail: String,
    travelCompanions: [{
      name: String,
      relationship: String,
      age: Number // Missing in original
    }],
  },

  // 5. Previous U.S. Travel History
  previousUSTravel: {
    hasBeenToUS: { type: Boolean, default: false },
    visits: [{
      arrivalDate: Date,
      departureDate: Date,
      durationOfStay: Number,
      purpose: String,
      visaType: String,
      i94Number: String, // Missing in original
      statusMaintained: Boolean // Missing in original
    }],
    hasBeenIssuedUsVisa: { type: Boolean, default: false },
    visaIssueDate: Date,
    visaFoilingNumber: String, // Missing in original
    hasVisaBeenLostOrStolen: { type: Boolean, default: false },
    lostOrStolenVisaDetails: String,
    hasBeenRefusedUsVisa: { type: Boolean, default: false },
    visaRefusalDetails: String,
    hasBeenRefusedAdmissionToUS: { type: Boolean, default: false },
    refusalDetails: String,
    hasFiledUSImmigrationPetition: { type: Boolean, default: false },
    immigrationPetitionDetails: String,
  },

  // 6. Travel History (Last 5 Years)
  internationalTravelHistory: {
    hasTraveledInternationally: { type: Boolean, default: false },
    trips: [{
      country: String,
      arrivalDate: Date,
      departureDate: Date,
      purpose: String
    }]
  },

  // 7. U.S. Point of Contact
  usContact: {
    organizationOrPerson: { type: String, enum: ['Organization', 'Person'] },
    contactName: String,
    organizationName: String,
    relationship: String,
    contactPhone: String,
    contactEmail: String,
    contactAddress: String,
  },

  // 8. Family Information
  familyInfo: {
    father: {
      surname: String,
      givenName: String,
      dateOfBirth: Date,
      isInUS: Boolean, // Missing in original
      usStatus: String // Missing in original
    },
    mother: {
      surname: String,
      givenName: String,
      dateOfBirth: Date,
      isInUS: Boolean, // Missing in original
      usStatus: String // Missing in original
    },
    hasSpouse: { type: Boolean, default: false },
    spouse: {
      fullName: String,
      dateOfBirth: Date,
      nationality: String,
      address: String,
      isInUS: Boolean, // Missing in original
      usStatus: String // Missing in original
    },
    children: [{
      name: String,
      dateOfBirth: Date,
      isInUS: Boolean, // Missing in original
      usStatus: String // Missing in original
    }],
    siblings: [{
      name: String,
      dateOfBirth: Date,
      isInUS: Boolean, // Missing in original
      usStatus: String // Missing in original
    }],
    relativesInUS: [{
      name: String,
      relationship: String,
      status: String,
      address: String
    }],
  },

  // 9. Work/Education/Training Information
  workEducation: {
    presentOccupation: String,
    isStudent: { type: Boolean, default: false },
    current: {
      occupation: String,
      employerOrSchool: String,
      address: String,
      monthlySalary: Number,
      duties: String,
      startDate: Date,
      supervisorName: String, // Missing in original
      supervisorPhone: String, // Missing in original
    },
    previousEmployment: [{
      occupation: String,
      employer: String,
      address: String,
      dateFrom: Date,
      dateTo: Date,
      supervisorName: String // Missing in original
    }],
    educationalHistory: [{
      schoolName: String,
      address: String,
      courseOfStudy: String,
      dateFrom: Date,
      dateTo: Date,
      degree: String // Missing in original
    }],
    otherTraining: [{
      description: String,
      dateFrom: Date,
      dateTo: Date,
      institution: String
    }],
    professionalMemberships: [String], // Missing in original
    specializedSkills: [String], // Missing in original
  },

  // 10. SEVIS Information (for F/J applicants)
  sevisInfo: {
    hasSevisId: { type: Boolean, default: false },
    sevisId: String,
    schoolProgramNumber: String, // Missing in original
    schoolName: String,
    courseOfStudy: String,
    schoolAddress: String,
    programStartDate: Date, // Missing in original
    programEndDate: Date, // Missing in original
  },

  // 11. Security and Background
  security: {
    // Health-related questions
    hasCommunicableDisease: { type: Boolean, default: false },
    hasHarmfulPhysicalOrMentalDisorder: { type: Boolean, default: false },
    isDrugAbuserOrAddict: { type: Boolean, default: false },

    // Criminal history
    hasBeenArrested: { type: Boolean, default: false },
    hasCriminalHistory: { type: Boolean, default: false },
    hasViolatedDrugLaws: { type: Boolean, default: false },
    hasBeenInvolvedInProstitution: { type: Boolean, default: false },
    hasEngagedInMoneyLaundering: { type: Boolean, default: false },
    hasCommitedFraud: { type: Boolean, default: false },

    // Security-related questions
    hasTerroristConnections: { type: Boolean, default: false },
    hasEngagedInEspionage: { type: Boolean, default: false },
    hasEngagedInGenocide: { type: Boolean, default: false },
    hasBeenInvolvedInTorture: { type: Boolean, default: false },
    hasBeenInvolvedInExtrajudicialKillings: { type: Boolean, default: false },

    // Immigration violations
    hasVisaOverstay: { type: Boolean, default: false },
    hasBeenDeported: { type: Boolean, default: false },
    hasHelpedOthersEnterUSIllegally: { type: Boolean, default: false },

    // Other
    isMemberOfTotalitarianParty: { type: Boolean, default: false },
    hasParticipatedInPersecution: { type: Boolean, default: false },

    // Additional details for any "yes" answers
    details: {
      communicableDisease: String,
      mentalDisorder: String,
      drugAbuse: String,
      criminalHistory: String,
      arrestDetails: String,
      drugViolationDetails: String,
      prostitutionDetails: String,
      moneyLaunderingDetails: String,
      fraudDetails: String,
      terroristConnections: String,
      espionageDetails: String,
      genocideDetails: String,
      tortureDetails: String,
      extrajudicialKillings: String,
      overstayDetails: String,
      deportationDetails: String,
      illegalEntryAssistance: String,
      totalitarianPartyDetails: String,
      persecutionDetails: String,
      otherDetails: String
    }
  },

  // 12. Additional Point of Contact
  additionalContacts: {
    contactInHomeCountry: {
      fullName: String,
      relationship: String,
      address: String,
      phone: String,
      email: String
    },
    emergencyContact: {
      fullName: String,
      relationship: String,
      address: String,
      phone: String,
      email: String
    }
  },

  // 13. Social Media and Online Presence
  socialMedia: {
    platforms: [{
      platform: String,
      username: String,
      isPublic: { type: Boolean, default: true }
    }],
    phoneNumbersUsedLast5Years: [String],
    emailAddressesUsedLast5Years: [String],
    internationalIdentityNumbers: [String] // Missing in original
  },

  // 14. Applicant Statement
  applicantStatement: {
    hasReadAndUnderstood: { type: Boolean, default: false },
    agreesInformationIsCorrect: { type: Boolean, default: false },
    signature: String, // Digital signature
    dateSigned: Date
  },



  photograph: {
    filePath: {
      type: String,
      default: '/images/default-avatar.png' // The path to the photo file or data URL
    },
    meetsRequirements: {
      type: Boolean,
      default: false
    },
    uploadDate: {
      type: Date
    }
  },

  // 16. Additional Information
  additionalInformation: {
    explanations: String, // For any additional explanations
    otherComments: String
  }

}, { timestamps: true });
ds160Schema.plugin(mongoosePaginate);


module.exports = mongoose.model('Ds160', ds160Schema);
