

// // client/src/services/profileService.js
// import api from './api';

// export const getMyProfile = async () => {
//   try {
//     const { data } = await api.get('/profile/me');
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to fetch profile');
//   }
// };

// export const updateMyProfile = async (profileData) => {
//   try {
//     const { data } = await api.put('/profile/me', profileData);
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to update profile');
//   }
// };

// export const updateProfileSection = async (section, sectionData) => {
//   try {
//     const { data } = await api.patch(`/profile/me/section/${section}`, sectionData);
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error(`Failed to update ${section} section`);
//   }
// };

// export const addToProfileArray = async (arrayField, itemData) => {
//   try {
//     const { data } = await api.post(`/profile/me/array/${arrayField}`, itemData);
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error(`Failed to add item to ${arrayField}`);
//   }
// };

// export const removeFromProfileArray = async (arrayField, itemId) => {
//   try {
//     const { data } = await api.delete(`/profile/me/array/${arrayField}/${itemId}`);
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error(`Failed to remove item from ${arrayField}`);
//   }
// };

// export const uploadProfilePicture = async (imageFile) => {
//   const formData = new FormData();
//   formData.append('profileImage', imageFile); // 'profileImage' must match the backend multer field name
//   try {
//     const { data } = await api.post('/profile/me/photo', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error('Image upload failed');
//   }
// };

// export const getStudentProfile = async (studentId) => {
//   try {
//     const { data } = await api.get(`/profile/student/${studentId}`);
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to fetch student profile');
//   }
// };

// export const getProfileCompletion = async () => {
//   try {
//     const { data } = await api.get('/profile/me/completion');
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to fetch profile completion');
//   }
// };

// export const getProfilesByVisaType = async (visaType) => {
//   try {
//     const { data } = await api.get(`/profile/visa-type/${visaType}`);
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to fetch profiles by visa type');
//   }
// };

// // Helper functions for specific profile sections
// export const updatePersonalInfo = (personalInfo) =>
//   updateProfileSection('personalInfo', personalInfo);

// export const updateContactInfo = (contactInfo) =>
//   updateProfileSection('contactInfo', contactInfo);

// export const updatePassportInfo = (passportInfo) =>
//   updateProfileSection('passportInfo', passportInfo);

// export const updateFamilyInfo = (familyInfo) =>
//   updateProfileSection('familyInfo', familyInfo);

// export const updateVisaInfo = (visaInfo) =>
//   updateProfileSection('visaInfo', visaInfo);

// export const updateDestinationInfo = (destinationInfo) =>
//   updateProfileSection('destinationInfo', destinationInfo);

// export const updateFinancialInfo = (financialInfo) =>
//   updateProfileSection('financialInfo', financialInfo);

// // Helper functions for array fields
// export const addEducation = (education) =>
//   addToProfileArray('educationHistory', education);

// export const addEmployment = (employment) =>
//   addToProfileArray('employmentHistory', employment);

// export const addTestScore = (testScore) =>
//   addToProfileArray('testScores', testScore);

// export const addDocument = (document) =>
//   addToProfileArray('documents', document);

// export const addDependent = (dependent) =>
//   addToProfileArray('dependents', dependent);

// export const addTravelHistory = (travel) =>
//   addToProfileArray('travelHistory', travel);

// export const removeEducation = (educationId) =>
//   removeFromProfileArray('educationHistory', educationId);

// export const removeEmployment = (employmentId) =>
//   removeFromProfileArray('employmentHistory', employmentId);

// export const removeTestScore = (testScoreId) =>
//   removeFromProfileArray('testScores', testScoreId);

// export const removeDocument = (documentId) =>
//   removeFromProfileArray('documents', documentId);

// export const removeDependent = (dependentId) =>
//   removeFromProfileArray('dependents', dependentId);

// export const removeTravelHistory = (travelId) =>
//   removeFromProfileArray('travelHistory', travelId);


// client/src/services/profileService.js
import api from './api';

/**
 * ===============================
 *  PROFILE SERVICES
 * ===============================
 * Handles API requests for profile management (student, counselor, admin).
 * Includes: profile fetch, section updates, array item management,
 * image upload, and profile-specific helpers.
 */

// ===============================
// My Profile (Logged-in user)
// ===============================

/**
 * Fetch logged-in user's profile
 */
export const getMyProfile = async () => {
  try {
    const { data } = await api.get('/profile/me');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch profile');
  }
};

/**
 * Update entire profile (not recommended, prefer section updates)
 */
export const updateMyProfile = async (profileData) => {
  try {
    const { data } = await api.put('/profile/me', profileData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to update profile');
  }
};

// ===============================
// Profile Sections
// ===============================

/**
 * Update specific section of profile using dot notation
 */
export const updateProfileSection = async (section, sectionData) => {
  try {
    const { data } = await api.patch(`/profile/me/section/${section}`, sectionData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error(`Failed to update ${section} section`);
  }
};

// ===============================
// Profile Arrays (education, employment, etc.)
// ===============================

/**
 * Add new item to profile array field
 */
export const addToProfileArray = async (arrayField, itemData) => {
  try {
    const { data } = await api.post(`/profile/me/array/${arrayField}`, itemData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error(`Failed to add item to ${arrayField}`);
  }
};

/**
 * Update an existing item in profile array
 */
export const updateProfileArrayItem = async (arrayField, itemId, itemData) => {
  try {
    const { data } = await api.put(`/profile/me/array/${arrayField}/${itemId}`, itemData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error(`Failed to update item in ${arrayField}`);
  }
};

/**
 * Remove item from profile array field
 */
export const removeFromProfileArray = async (arrayField, itemId) => {
  try {
    const { data } = await api.delete(`/profile/me/array/${arrayField}/${itemId}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error(`Failed to remove item from ${arrayField}`);
  }
};

// ===============================
// Profile Picture
// ===============================

/**
 * Upload profile picture
 */
export const uploadProfilePicture = async (imageFile) => {
  const formData = new FormData();
  formData.append('profileImage', imageFile); // Must match multer field name in backend

  try {
    const { data } = await api.post('/profile/me/picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Image upload failed');
  }
};

// ===============================
// Profile Completion & Financial Overview
// ===============================

/**
 * Get profile completion percentage/details
 */
export const getProfileCompletion = async () => {
  try {
    const { data } = await api.get('/profile/me/completion');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch profile completion');
  }
};

/**
 * Get financial overview with totals
 */
export const getFinancialOverview = async () => {
  try {
    const { data } = await api.get('/profile/me/financial-overview');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch financial overview');
  }
};

// ===============================
// Admin / Counselor Specific
// ===============================

/**
 * Get student profile (for counselor/admin)
 */
export const getStudentProfile = async (studentId) => {
  try {
    const { data } = await api.get(`/profile/student/${studentId}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch student profile');
  }
};

/**
 * Get profiles filtered by visa type (admin only)
 */
export const getProfilesByVisaType = async (visaType) => {
  try {
    const { data } = await api.get(`/profile/visa-type/${visaType}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch profiles by visa type');
  }
};

// ===============================
// Helper Functions: Section Updates
// ===============================

export const updatePersonalInfo = (personalInfo) =>
  updateProfileSection('personalInfo', personalInfo);

export const updateContactInfo = (contactInfo) =>
  updateProfileSection('contactInfo', contactInfo);

export const updatePassportInfo = (passportInfo) =>
  updateProfileSection('passportInfo', passportInfo);

export const updateFamilyInfo = (familyInfo) =>
  updateProfileSection('familyInfo', familyInfo);

export const updateVisaInfo = (visaInfo) =>
  updateProfileSection('visaInfo', visaInfo);

export const updateDestinationInfo = (destinationInfo) =>
  updateProfileSection('destinationInfo', destinationInfo);

export const updateFinancialInfo = (financialInfo) =>
  updateProfileSection('financialInfo', financialInfo);

// ===============================
// Helper Functions: Array Fields
// ===============================

// Education
export const addEducation = (education) =>
  addToProfileArray('educationHistory', education);
export const updateEducation = (educationId, education) =>
  updateProfileArrayItem('educationHistory', educationId, education);
export const removeEducation = (educationId) =>
  removeFromProfileArray('educationHistory', educationId);

// Employment
export const addEmployment = (employment) =>
  addToProfileArray('employmentHistory', employment);
export const updateEmployment = (employmentId, employment) =>
  updateProfileArrayItem('employmentHistory', employmentId, employment);
export const removeEmployment = (employmentId) =>
  removeFromProfileArray('employmentHistory', employmentId);

// Test Scores
export const addTestScore = (testScore) =>
  addToProfileArray('testScores', testScore);
export const updateTestScore = (testScoreId, testScore) =>
  updateProfileArrayItem('testScores', testScoreId, testScore);
export const removeTestScore = (testScoreId) =>
  removeFromProfileArray('testScores', testScoreId);

// Documents
export const addDocument = (document) =>
  addToProfileArray('documents', document);
export const updateDocument = (documentId, document) =>
  updateProfileArrayItem('documents', documentId, document);
export const removeDocument = (documentId) =>
  removeFromProfileArray('documents', documentId);

// Dependents
export const addDependent = (dependent) =>
  addToProfileArray('dependents', dependent);
export const updateDependent = (dependentId, dependent) =>
  updateProfileArrayItem('dependents', dependentId, dependent);
export const removeDependent = (dependentId) =>
  removeFromProfileArray('dependents', dependentId);

// Travel History
export const addTravelHistory = (travel) =>
  addToProfileArray('travelHistory', travel);
export const updateTravelHistory = (travelId, travel) =>
  updateProfileArrayItem('travelHistory', travelId, travel);
export const removeTravelHistory = (travelId) =>
  removeFromProfileArray('travelHistory', travelId);
