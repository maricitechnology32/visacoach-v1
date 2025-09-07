import api from './api';

export const setPassword = async (token, password) => {
  try {
    const { data } = await api.post('/auth/set-password', { token, password });
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to set password');
  }
};