import api from './api';

export const getApprovedReviews = async () => {
  try {
    const { data } = await api.get('/reviews');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch reviews');
  }
};

export const createReview = async (reviewData) => {
  try {
    const { data } = await api.post('/reviews', reviewData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to submit review');
  }
};