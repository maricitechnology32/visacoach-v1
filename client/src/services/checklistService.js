// client/src/services/checklistService.js
import api from './api';

export const getChecklistTemplates = async () => {
  try {
    const { data } = await api.get('/checklists');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch templates');
  }
};

export const createChecklistTemplate = async (templateData) => {
  try {
    const { data } = await api.post('/checklists', templateData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to create template');
  }
};
export const getTemplateById = async (templateId) => {
  try {
    const { data } = await api.get(`/checklists/${templateId}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch template details');
  }
};

export const addTaskToTemplate = async (templateId, taskData) => {
  try {
    const { data } = await api.post(`/checklists/${templateId}/tasks`, taskData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to add task');
  }
};

 

export const updateTaskInTemplate = async (templateId, taskId, taskData) => {
  const { data } = await api.put(`/checklists/${templateId}/tasks/${taskId}`, taskData);
  return data;
};

export const deleteTaskFromTemplate = async (templateId, taskId) => {
  const { data } = await api.delete(`/checklists/${templateId}/tasks/${taskId}`);
  return data;
};


// We will add more functions here later for managing tasks