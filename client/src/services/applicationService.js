// import api from './api';

// // Gets all application records for a consultancy
// export const getApplications = async () => {
//   try {
//     const { data } = await api.get('/applications');
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to fetch applications');
//   }
// };

// // Creates a new application record
// export const createApplication = async (applicationData) => {
//   try {
//     const { data } = await api.post('/applications', applicationData);
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to create application');
//   }
// };

// // Updates an existing application record
// export const updateApplication = async (id, applicationData) => {
//   try {
//     const { data } = await api.put(`/applications/${id}`, applicationData);
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to update application');
//   }
// };

// // Deletes an application record
// export const deleteApplication = async (id) => {
//   try {
//     await api.delete(`/applications/${id}`);
//     return id;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to delete application');
//   }
// };


import api from './api';

// Gets all application records for a consultancy
export const getApplications = async () => {
  try {
    const { data } = await api.get('/applications');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch applications');
  }
};

// Creates a new application record
export const createApplication = async (applicationData) => {
  try {
    // This function is correct. The `applicationData` object it receives
    // from the frontend page must contain the university and program IDs.
    const { data } = await api.post('/applications', applicationData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to create application');
  }
};

// Updates an existing application record
export const updateApplication = async (id, applicationData) => {
  try {
    const { data } = await api.put(`/applications/${id}`, applicationData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to update application');
  }
};

// Deletes an application record
export const deleteApplication = async (id) => {
  try {
    await api.delete(`/applications/${id}`);
    return id;
  } catch (error) {
    throw error.response?.data || new Error('Failed to delete application');
  }
};