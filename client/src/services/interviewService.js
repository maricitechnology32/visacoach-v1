import api from './api';

export const startInterview = async () => {
  try {
    const { data } = await api.post('/interviews/start');
    return data; // This will return the vapiConfig object from our backend
  } catch (error) {
    throw error.response?.data || new Error('Failed to start interview');
  }
};