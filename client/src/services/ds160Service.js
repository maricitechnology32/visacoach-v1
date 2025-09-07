


import api from './api';

/**
 * ---------------------------
 * STUDENT FUNCTIONS
 * ---------------------------
 */

/**
 * Fetches the logged-in student's own DS-160 form data.
 * If no form exists, the backend will create a new blank one.
 */
export const getMyDs160 = async () => {
  try {
    const { data } = await api.get('/ds160/me');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch DS-160 data');
  }
};

/**
 * Saves or updates the logged-in student's DS-160 form data.
 * @param {object} ds160Data - The complete DS-160 form data object.
 */
export const updateMyDs160 = async (ds160Data) => {
  try {
    const { data } = await api.put('/ds160/me', ds160Data);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to update DS-160 data');
  }
};

/**
 * Submits the DS-160 form for counselor review
 */
export const submitDs160ForReview = async () => {
  try {
    const { data } = await api.post('/ds160/me/submit');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to submit DS-160 for review');
  }
};

/**
 * ---------------------------
 * COUNSELOR / ADMIN FUNCTIONS
 * ---------------------------
 */

/**
 * Fetches all DS-160 forms for the consultancy with optional filtering and pagination
 * @param {object} params - Optional query parameters { status, page, limit }
 */
// export const getConsultancyDs160Forms = async (params = {}) => {
//   try {
//     const { data } = await api.get('/ds160/consultancy/all', { params });
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to fetch consultancy DS-160 forms');
//   }
// };


/**
 * Fetches all DS-160 forms for the consultancy with optional filtering and pagination
 * @param {object} params - Optional query parameters { status, page, limit }
 */
export const getConsultancyDs160Forms = async (params = {}) => {
  try {
    // FIX: The endpoint should be '/ds160' not '/ds160/consultancy/all'
    const { data } = await api.get('/ds160', { params });
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch consultancy DS-160 forms');
  }
};

/**
 * Fetches DS-160 statistics for the consultancy dashboard
 */
export const getDs160Stats = async () => {
  try {
    const { data } = await api.get('/ds160/consultancy/stats');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch DS-160 statistics');
  }
};

/**
 * Fetches the DS-160 form data for a specific student.
 * @param {string} studentId - The ID of the student.
 */
export const getStudentDs160 = async (studentId) => {
  try {
    const { data } = await api.get(`/ds160/student/${studentId}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error("Failed to fetch student's DS-160 data");
  }
};

/**
 * Submits counselor/admin review for a student's DS-160 form.
 * @param {string} studentId - The ID of the student.
 * @param {object} reviewData - { status: string, counselorFeedback: string }
 */
export const reviewStudentDs160 = async (studentId, reviewData) => {
  try {
    const { data } = await api.put(`/ds160/student/${studentId}/review`, reviewData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to submit DS-160 review');
  }
};

/**
 * ---------------------------
 * ADMIN ONLY FUNCTIONS
 * ---------------------------
 */

/**
 * Fetches all DS-160 forms across all consultancies (Admin only).
 * Useful for system-wide dashboards or monitoring.
 * @param {object} params - Optional query parameters { status, page, limit }
 */
export const getAllDs160 = async (params = {}) => {
  try {
    const { data } = await api.get('/ds160', { params });
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch all DS-160 forms');
  }
};

/**
 * ---------------------------
 * UTILITY FUNCTIONS
 * ---------------------------

/**
 * Downloads DS-160 form as PDF
 * @param {string} applicationId - The DS-160 application ID
 */
export const downloadDs160Pdf = async (applicationId) => {
  try {
    const response = await api.get(`/ds160/download/${applicationId}`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to download DS-160 PDF');
  }
};



export const uploadDs160Photo = async (photoFile) => {
  const formData = new FormData();
  formData.append('ds160Photo', photoFile); // 'ds160Photo' must match the backend multer field name

  try {
    const { data } = await api.post('/ds160/me/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Photo upload failed');
  }
};

export const getPrivateFile = async (filePath) => {
  try {
    const response = await api.post('/files/download', { filePath, fileName: 'image' }, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch secure file', error);
  }
}

// src/services/ds160Service.js
export const getPhotograph = async (photoId) => {
  try {
    const response = await fetch(`/api/ds160/photograph/${photoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch photograph');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getPhotograph:', error);
    throw error;
  }
};