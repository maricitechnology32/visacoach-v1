// client/src/services/dashboardService.js
import api from './api';

export const getCounselorDashboardData = async () => {
  try {
    const { data } = await api.get('/dashboard/counselor');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch dashboard data');
  }
};

// Fetches visa application status statistics
export const getApplicationStats = async () => {
  try {
    const { data } = await api.get('/applications/stats');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch application stats');
  }
};