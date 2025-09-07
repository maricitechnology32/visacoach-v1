import api from './api';

export const reviewSop = async (file) => {
  const formData = new FormData();
  formData.append('sopFile', file);
  try {
    const { data } = await api.post('/sop/review', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    throw error.response?.data || new Error('SOP review failed');
  }
};

export const getSopHistory = async () => {
  try {
    const { data } = await api.get('/sop/history');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch SOP history');
  }
};

export const generateSop = async (sopData) => {
  try {
    const { data } = await api.post('/sop/generate', sopData);
    return data; // This will return { draft: "..." }
  } catch (error) {
    throw error.response?.data || new Error('SOP generation failed');
  }
};