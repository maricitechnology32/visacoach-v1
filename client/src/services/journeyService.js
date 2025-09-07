// // client/src/services/journeyService.js
// import api from './api';

// export const getMyJourney = async () => {
//   try {
//     const response = await api.get('/journey/me');
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to fetch journey');
//   }
// };

// // ==> THIS FUNCTION IS NOW CORRECT <==
// export const getStudentJourney = async (studentId) => {
//   try {
//     const { data } = await api.get(`/journey/student/${studentId}`);
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to fetch student journey');
//   }
// };

// export const updateTaskStatus = async (taskId, status, notes = '') => {
//   try {
//     const response = await api.put(`/journey/tasks/${taskId}`, { status, notes });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to update task');
//   }
// };


import api from './api';

/**
 * For Students: Fetches the logged-in student's own journey checklist.
 */
export const getMyJourney = async () => {
  try {
    const { data } = await api.get('/journey/me');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch journey');
  }
};

/**
 * For Students/Counselors: Updates the status of a specific task within a journey.
 * @param {string} taskId - The ID of the task to update.
 * @param {string} status - The new status (e.g., 'completed', 'approved').
 */
export const updateTaskStatus = async (taskId, status) => {
  try {
    const { data } = await api.put(`/journey/tasks/${taskId}`, { status });
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to update task');
  }
};

/**
 * For Counselors: Fetches the journey checklist for a specific student.
 * @param {string} studentId - The ID of the student.
 */
export const getStudentJourney = async (studentId) => {
  try {
    const { data } = await api.get(`/journey/student/${studentId}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch student journey');
  }
};