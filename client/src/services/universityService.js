
import api from './api';

// Gets partner universities for the logged-in user's consultancy with optional filtering
export const getPartnerUniversities = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    // Add filter parameters if provided
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });

    const { data } = await api.get(`/universities?${params.toString()}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch universities');
  }
};

// Gets a single partner university
export const getPartnerUniversity = async (id) => {
  try {
    const { data } = await api.get(`/universities/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch university');
  }
};

// Adds a new partner university (Counselor/Admin only)
export const addPartnerUniversity = async (universityData) => {
  try {
    const { data } = await api.post('/universities', universityData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to add university');
  }
};

// Updates an existing partner university (Counselor/Admin only)
export const updatePartnerUniversity = async (id, universityData) => {
  try {
    const { data } = await api.put(`/universities/${id}`, universityData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to update university');
  }
};

// Deletes a partner university (Counselor/Admin only)
export const deletePartnerUniversity = async (id) => {
  try {
    await api.delete(`/universities/${id}`);
    return id; // Return the id for easy state updates
  } catch (error) {
    throw error.response?.data || new Error('Failed to delete university');
  }
};

// Adds a program to a university (Counselor/Admin only)
export const addProgramToUniversity = async (universityId, programData) => {
  try {
    const { data } = await api.post(`/universities/${universityId}/programs`, programData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to add program');
  }
};

// Updates a program in a university (Counselor/Admin only)
export const updateProgramInUniversity = async (universityId, programId, programData) => {
  try {
    const { data } = await api.put(`/universities/${universityId}/programs/${programId}`, programData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to update program');
  }
};

// Deletes a program from a university (Counselor/Admin only)
export const deleteProgramFromUniversity = async (universityId, programId) => {
  try {
    await api.delete(`/universities/${universityId}/programs/${programId}`);
    return { universityId, programId }; // Return both ids for state updates
  } catch (error) {
    throw error.response?.data || new Error('Failed to delete program');
  }
};

// Gets countries list for filter options
export const getCountries = async () => {
  try {
    const { data } = await api.get('/universities/filters/countries');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch countries');
  }
};

// Gets program levels for filter options
export const getProgramLevels = async () => {
  try {
    const { data } = await api.get('/universities/filters/program-levels');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch program levels');
  }
};

export const getUniversityRecommendations = async () => {
  try {
    // This calls the new POST endpoint
    const { data } = await api.post('/universities/recommend');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to get recommendations');
  }
};

// Export default object with all functions
const universityService = {
  getPartnerUniversities,
  getPartnerUniversity,
  addPartnerUniversity,
  updatePartnerUniversity,
  deletePartnerUniversity,
  addProgramToUniversity,
  updateProgramInUniversity,
  deleteProgramFromUniversity,
  getCountries,
  getProgramLevels,
  getUniversityRecommendations
};

export default universityService;