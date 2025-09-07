// client/src/services/documentService.js
import api from './api';

export const getMyDocuments = async () => {
  try {
    const response = await api.get('/documents/my-documents');
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to fetch documents');
  }
};

export const uploadDocument = async (file, documentType) => {
  const formData = new FormData();
  formData.append('documentFile', file); // 'documentFile' must match the backend multer field name
  formData.append('documentType', documentType);

  try {
    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('File upload failed');
  }
};

export const deleteDocument = async (documentId) => {
  try {
    const response = await api.delete(`/documents/${documentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to delete document');
  }
};

// export const updateDocument = async (docId, updateData) => {
//   try {
//     const { data } = await api.put(`/documents/${docId}`, updateData);
//     return data;
//   } catch (error) {
//     throw error.response?.data || new Error('Failed to update document');
//   }
// };

export const updateDocument = async (docId, documentType, newFile) => {
  const formData = new FormData();
  formData.append('documentType', documentType);
  if (newFile) {
    formData.append('documentFile', newFile);
  }
  const { data } = await api.put(`/documents/${docId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const getStudentDocuments = async (studentId) => {
  try {
    const { data } = await api.get(`/documents/student/${studentId}`);
    return data;
  } catch (error) {
    throw error.response?.data || new Error("Failed to fetch student's documents");
  }
};