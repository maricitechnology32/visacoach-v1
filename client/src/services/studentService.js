// client/src/services/studentService.js
import api from './api';

export const getMyStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    // It's good practice to handle potential errors and re-throw them
    throw error.response?.data || new Error('Failed to fetch students');
  }
};

export const addStudent = async (studentData) => {
  try {
    const { data } = await api.post('/students', studentData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to add student');
  }
};

export const getStudentById = async (studentId) => {
  try {
    const { data } = await api.get(`/students/${studentId}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch student details');
  }
};