

// client/src/services/courseService.js
import api from './api';
export const getAllCourses = async () => {
  try {
    const { data } = await api.get('/courses');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch courses');
  }
};

export const getCourseById = async (courseId) => {
  try {
    const { data } = await api.get(`/courses/${courseId}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch course details');
  }
};

export const createCourse = async (courseData) => {
  try {
    const { data } = await api.post('/courses', courseData);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to create course');
  }
};

export const getMyCourses = async () => {
  try {
    const { data } = await api.get('/courses/my-courses');
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch your courses');
  }
};



export const addLessonToCourse = async (courseId, lessonData, resourceFile) => {
  // Create a FormData object to send multipart data
  const formData = new FormData();

  // Append all the text fields from lessonData
  formData.append('moduleTitle', lessonData.moduleTitle);
  formData.append('title', lessonData.title);
  formData.append('content', lessonData.content);
  formData.append('videoUrl', lessonData.videoUrl);

  // If a file is provided, append it
  if (resourceFile) {
    formData.append('resourceFile', resourceFile);
  }

  try {
    const { data } = await api.post(`/courses/${courseId}/lessons`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to add lesson');
  }
};

// ============================
// Lesson Services
// ============================

export const getLessonById = async (lessonId) => {
  try {
    const { data } = await api.get(`/lessons/${lessonId}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch lesson');
  }
};

export const updateLesson = async (lessonId, lessonData, config = {}) => {
  try {
    // ✅ backend route: PUT /lessons/:lessonId
    const { data } = await api.put(`/lessons/${lessonId}`, lessonData, config);
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to update lesson');
  }
};

export const deleteLesson = async (lessonId) => {
  try {
    // ✅ backend route: DELETE /lessons/:lessonId
    await api.delete(`/lessons/${lessonId}`);
    return lessonId; // useful for frontend state updates
  } catch (error) {
    throw error.response?.data || new Error('Failed to delete lesson');
  }
};

export const uploadCourseThumbnail = async (courseId, file) => {
  const formData = new FormData();
  formData.append('thumbnailFile', file);
  try {
    const { data } = await api.put(`/courses/${courseId}/thumbnail`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to upload thumbnail');
  }
};
export const downloadResourceFile = async (filePath, fileName) => {
  try {
    const response = await api.post('/files/download', { filePath, fileName }, {
      responseType: 'blob', // Crucial for handling file responses
    });

    // Logic to trigger browser download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    throw new Error('Failed to download file', error);
  }
};