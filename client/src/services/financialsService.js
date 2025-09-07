// client/src/services/financialsService.js
import api from './api';

export const getFinancialProfile = async () => {
  try {
    const { data } = await api.get('/financials');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch financial profile');
  }
};

export const updateFinancialProfile = async (profileData) => {
  try {
    const { data } = await api.put('/financials', profileData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to update financial profile');
  }
};

export const downloadFinancialReport = async () => {
  try {
    const response = await api.get('/financials/report', {
      responseType: 'blob', // This is crucial for handling file downloads
    });

    // Create a URL for the blob and trigger a download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Financial_Summary.pdf'); // or get filename from headers
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link); // Clean up the link element
  } catch (error) {
    throw new Error('Failed to download report', error);
  }
};