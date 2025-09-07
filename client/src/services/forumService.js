// client/src/services/forumService.js
import api from './api';

export const getConsultancyPosts = async () => {
  try {
    const { data } = await api.get('/forums/posts');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch posts');
  }
};

export const getPostById = async (postId) => {
  try {
    const { data } = await api.get(`/forums/posts/${postId}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch post details');
  }
};

export const createPost = async (postData) => {
  try {
    const { data } = await api.post('/forums/posts', postData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to create post');
  }
};

export const addCommentToPost = async (postId, content) => {
  try {
    const { data } = await api.post(`/forums/posts/${postId}/comments`, { content });
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to add comment');
  }
};