// client/src/services/adminService.js
import api from './api';

// --- Consultancy Management ---
export const createConsultancy = async (consultancyData) => {
  try {
    const { data } = await api.post('/consultancies', consultancyData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to create consultancy');
  }
};

export const getConsultancies = async () => {
  try {
    const { data } = await api.get('/consultancies');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch consultancies');
  }
};

// --- Counselor Management ---
export const createCounselor = async (counselorData) => {
  try {
    const { data } = await api.post('/admin/create-counselor', counselorData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to create counselor');
  }
};

// eslint-disable-next-line no-unused-vars
export const getConsultancyById = async (id) => { /* We'll need this */ };
export const getConsultancyUsers = async (consultancyId) => {
  try {
    const { data } = await api.get(`/admin/consultancies/${consultancyId}/users`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch users');
  }
};

export const getPlatformStats = async () => {
  try {
    const { data } = await api.get('/admin/stats');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch platform stats');
  }
};

export const toggleConsultancyStatus = async (id) => {
  const { data } = await api.patch(`/consultancies/${id}/status`);
  return data;
};

export const updateConsultancy = async (id, data) => {
  const response = await api.put(`/consultancies/${id}`, data);
  return response.data;
};