// /* eslint-disable no-unused-vars */


// import { useState, useEffect } from 'react';
// import { getMyDocuments, uploadDocument, deleteDocument, updateDocument } from '../services/documentService';
// import Modal from '../components/Modal';
// import {
//   FiUpload, FiTrash2, FiEdit, FiFile, FiImage,
//   FiCheckCircle, FiXCircle, FiClock, FiDownload,
//   FiPlus, FiAlertCircle
// } from "react-icons/fi";
 

// const DocumentsPage = () => {
//   const [documents, setDocuments] = useState([]);
//   const [file, setFile] = useState(null);
//   const [documentType, setDocumentType] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState('');
//   const [newFile, setNewFile] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingDoc, setEditingDoc] = useState(null);
//   const [newDocumentType, setNewDocumentType] = useState('');
//   const [fileName, setFileName] = useState('');

//   const fetchDocuments = async () => {
//     try {
//       setLoading(true);
//       const docs = await getMyDocuments();
//       setDocuments(docs);
//     } catch (err) {
//       setError(err.message || 'Failed to load documents.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setFileName(selectedFile ? selectedFile.name : '');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file || !documentType) {
//       setError('Please select a file and a document type.');
//       return;
//     }
//     setUploading(true);
//     setError('');
//     try {
//       const newDoc = await uploadDocument(file, documentType);
//       setDocuments(prevDocs => [...prevDocs, newDoc]);
//       setFile(null);
//       setDocumentType('');
//       setFileName('');
//       e.target.reset();
//     } catch (err) {
//       setError(err.message || 'File upload failed.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDelete = async (docId) => {
//     if (window.confirm('Are you sure you want to delete this document?')) {
//       try {
//         await deleteDocument(docId);
//         setDocuments(documents.filter(doc => doc._id !== docId));
//       } catch (err) {
//         setError(err.message || 'Failed to delete document.');
//       }
//     }
//   };

//   const handleEditClick = (doc) => {
//     setEditingDoc(doc);
//     setNewDocumentType(doc.documentType);
//     setIsModalOpen(true);
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedDoc = await updateDocument(editingDoc._id, newDocumentType, newFile);
//       setDocuments(documents.map(d => d._id === editingDoc._id ? updatedDoc : d));
//       setIsModalOpen(false);
//       setNewFile(null);
//       setEditingDoc(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const isImageFile = (fileName) => {
//     if (!fileName) return false;
//     return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(fileName);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'approved': return <FiCheckCircle className="text-green-500" />;
//       case 'rejected': return <FiXCircle className="text-red-500" />;
//       default: return <FiClock className="text-amber-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'approved': return 'bg-green-100 text-green-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       default: return 'bg-amber-100 text-amber-800';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
//           <p className="text-gray-600 mt-2">Manage all your important documents in one place</p>
//         </div>
//         <div className="bg-green-50 p-3 rounded-lg">
//           <p className="text-green-700 text-sm font-medium">
//             {documents.length} document{documents.length !== 1 ? 's' : ''} uploaded
//           </p>
//         </div>
//       </div>

//       {error && (
//         <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
//           <FiAlertCircle className="mr-2" />
//           {error}
//         </div>
//       )}

//       {/* Upload Card */}
//       <div className="bg-white rounded-md p-6 mb-8 border border-green-300">
//         <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//           <FiUpload className="mr-2 text-green-600" />
//           Upload a New Document
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Document Type
//               </label>
//               <input
//                 type="text"
//                 value={documentType}
//                 onChange={(e) => setDocumentType(e.target.value)}
//                 placeholder="e.g., Passport, Visa, Financial Statement"
//                 className="w-full border border-green-300 rounded-lg px-4 py-3    "
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select File
//               </label>
//               <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
//                     <p className="mb-2 text-sm text-gray-500">
//                       <span className="font-semibold">Click to upload</span> or drag and drop
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       PDF, DOC, JPG, PNG (MAX. 10MB)
//                     </p>
//                   </div>
//                   <input
//                     type="file"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     required
//                   />
//                 </label>
//               </div>
//               {fileName && (
//                 <p className="mt-2 text-sm text-gray-600 flex items-center">
//                   <FiFile className="mr-1" /> Selected: {fileName}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end pt-4">
//             <button
//               type="submit"
//               disabled={uploading}
//               className="flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[120px]"
//             >
//               {uploading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Uploading...
//                 </>
//               ) : (
//                 <>
//                   <FiUpload className="mr-2" />
//                   Upload Document
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Documents List */}
//       <div>
//         <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//           <FiFile className="mr-2 text-green-600" />
//           Your Uploaded Documents
//         </h2>

//         {documents.length === 0 ? (
//           <div className="bg-white rounded-md   p-12 text-center border border-dashed border-green-300">
//             <FiFile className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-4 text-lg font-medium text-gray-900">No documents yet</h3>
//             <p className="mt-2 text-gray-500">Get started by uploading your first document.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-4">
//             {documents.map((doc) => (
//               <div key={doc._id} className="bg-white rounded-md p-5 border border-green-200 hover:shadow-md transition-shadow">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                   <div className="flex items-start gap-4 flex-1">
//                     <div className="flex-shrink-0">
//                       {isImageFile(doc.fileName) ? (
//                         <div className="relative">
//                           <img
//                             src={`http://localhost:5001${doc.filePath}`}
//                             alt={doc.documentType}
//                             className="w-16 h-16 object-cover rounded-lg border border-green-200"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
//                         </div>
//                       ) : (
//                         <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center text-green-600 border border-green-300">
//                           <FiFile className="w-8 h-8" />
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-medium text-gray-900 truncate">{doc.documentType}</h3>
//                       <p className="text-sm text-gray-500 mt-1 truncate">{doc.fileName}</p>
//                       {/* <div className="flex items-center mt-2">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
//                           {getStatusIcon(doc.status)}
//                           <span className="ml-1 capitalize">{doc.status}</span>
//                         </span>
//                         <span className="text-xs text-gray-500 ml-3">
//                           {doc.uploadDate
//                             ? `Uploaded on ${format(parse(doc.uploadDate, "dd-MM-yyyy", new Date()), "MM/dd/yyyy")}`
//                             : 'Upload date not available'}
//                         </span>
//                       </div> */}
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 self-stretch md:self-center">
//                     <a
//                       href={`http://localhost:5001${doc.filePath}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center justify-center w-10 h-10 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                       title="Download"
//                     >
//                       <FiDownload className="w-5 h-5" />
//                     </a>
//                     <button
//                       onClick={() => handleEditClick(doc)}
//                       className="flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                       title="Edit"
//                     >
//                       <FiEdit className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(doc._id)}
//                       className="flex items-center justify-center w-10 h-10 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                       title="Delete"
//                     >
//                       <FiTrash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Edit Modal */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Document">
//         {editingDoc && (
//           <form onSubmit={handleUpdateSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Document Type
//               </label>
//               <input
//                 type="text"
//                 value={newDocumentType}
//                 onChange={(e) => setNewDocumentType(e.target.value)}
//                 className="w-full border border-green-300 rounded-lg px-4 py-2  "
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Replace File (Optional)
//               </label>
//               <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors">
//                   <div className="flex flex-col items-center justify-center">
//                     <FiUpload className="w-6 h-6 mb-1 text-gray-400" />
//                     <p className="text-sm text-gray-500">Click to select a new file</p>
//                   </div>
//                   <input
//                     type="file"
//                     onChange={(e) => setNewFile(e.target.files[0])}
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-green-300 hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default DocumentsPage;

import { useState, useEffect } from 'react';
import { getMyDocuments, uploadDocument, deleteDocument, updateDocument } from '../services/documentService';
import Modal from '../components/Modal';
import {
  FiUpload, FiTrash2, FiEdit, FiFile, FiImage,
  FiCheckCircle, FiXCircle, FiClock, FiDownload,
  FiPlus, FiAlertCircle, FiCheck
} from "react-icons/fi";

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [newDocumentType, setNewDocumentType] = useState('');
  const [fileName, setFileName] = useState('');

  // Define required document types with descriptions
  const requiredDocumentTypes = [
    {
      id: 'passport',
      name: 'Passport',
      description: 'Valid passport with at least 6 months validity',
      required: true
    },
    {
      id: 'visa',
      name: 'Visa',
      description: 'Previous visas if applicable',
      required: true
    },
    {
      id: 'photo',
      name: 'Photograph',
      description: 'Passport-style photograph',
      required: true
    },
    {
      id: 'financial',
      name: 'Financial Documents',
      description: 'Bank statements, sponsorship letters',
      required: true
    },
    {
      id: 'employment',
      name: 'Employment Verification',
      description: 'Employment letter, pay stubs',
      required: true
    },
    {
      id: 'invitation',
      name: 'Invitation Letter',
      description: 'If visiting family or friends',
      required: true
    },
    {
      id: 'itinerary',
      name: 'Travel Itinerary',
      description: 'Flight and hotel bookings',
      required: true
    },
    {
      id: 'insurance',
      name: 'Travel Insurance',
      description: 'Health/travel insurance coverage',
      required: true
    },
    {
      id: 'other',
      name: 'Other Documents',
      description: 'Any additional supporting documents',
      required: true
    }
  ];

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const docs = await getMyDocuments();
      setDocuments(docs);
    } catch (err) {
      setError(err.message || 'Failed to load documents.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !documentType) {
      setError('Please select a file and a document type.');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const newDoc = await uploadDocument(file, documentType);
      setDocuments(prevDocs => [...prevDocs, newDoc]);
      setFile(null);
      setDocumentType('');
      setFileName('');
      e.target.reset();
    } catch (err) {
      setError(err.message || 'File upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(docId);
        setDocuments(documents.filter(doc => doc._id !== docId));
      } catch (err) {
        setError(err.message || 'Failed to delete document.');
      }
    }
  };

  const handleEditClick = (doc) => {
    setEditingDoc(doc);
    setNewDocumentType(doc.documentType);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDoc = await updateDocument(editingDoc._id, newDocumentType, newFile);
      setDocuments(documents.map(d => d._id === editingDoc._id ? updatedDoc : d));
      setIsModalOpen(false);
      setNewFile(null);
      setEditingDoc(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const isImageFile = (fileName) => {
    if (!fileName) return false;
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(fileName);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <FiCheckCircle className="text-green-500" />;
      case 'rejected': return <FiXCircle className="text-red-500" />;
      default: return <FiClock className="text-amber-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-amber-100 text-amber-800';
    }
  };

  // Check if a document type has been uploaded
  const isDocumentUploaded = (docType) => {
    return documents.some(doc => doc.documentType === docType);
  };

  // Calculate completion percentage
  const completionPercentage = () => {
    const requiredDocs = requiredDocumentTypes.filter(doc => doc.required);
    const uploadedRequiredDocs = documents.filter(doc =>
      requiredDocs.some(reqDoc => reqDoc.name === doc.documentType)
    );
    return Math.round((uploadedRequiredDocs.length / requiredDocs.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600 mt-2">Manage all your important documents in one place</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-green-700 text-sm font-medium">Document Completion</p>
            <span className="text-green-700 font-bold">{completionPercentage()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage()}%` }}
            ></div>
          </div>
          <p className="text-xs text-green-600 mt-1">
            {documents.length} of {requiredDocumentTypes.filter(doc => doc.required).length} required documents uploaded
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <FiAlertCircle className="mr-2" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Document Checklist */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-sm p-6 border-2 border-green-300 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiCheck className="mr-2 text-green-600" />
              Required Documents
            </h2>

            <div className="space-y-4">
              {requiredDocumentTypes.map((docType) => (
                <div key={docType.id} className="flex items-start gap-3 p-3 rounded-lg border-2 border-green-300">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${isDocumentUploaded(docType.name)
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                    }`}>
                    {isDocumentUploaded(docType.name) && <FiCheck className="w-3 h-3" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{docType.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{docType.description}</p>
                    {docType.required && (
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-medium text-green-900 text-sm mb-2">Tips for uploading:</h3>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• Ensure documents are clear and readable</li>
                <li>• File size should be less than 10MB</li>
                <li>• Accepted formats: PDF, JPG, PNG</li>
                <li>• Name files appropriately for easy identification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Upload and Documents List */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upload Card */}
          <div className="bg-white rounded-sm p-6 border-2 border-green-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiUpload className="mr-2 text-green-600" />
              Upload a New Document
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full border border-green-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Document Type</option>
                    {requiredDocumentTypes.map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.name} {type.required && '(Required)'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select File <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, DOC, JPG, PNG (MAX. 10MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                  {fileName && (
                    <p className="mt-2 text-sm text-gray-600 flex items-center">
                      <FiFile className="mr-1" /> Selected: {fileName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[120px]"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FiUpload className="mr-2" />
                      Upload Document
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Documents List */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiFile className="mr-2 text-green-600" />
              Your Uploaded Documents
            </h2>

            {documents.length === 0 ? (
              <div className="bg-white rounded-sm p-12 text-center border border-dashed border-green-300">
                <FiFile className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No documents yet</h3>
                <p className="mt-2 text-gray-500">Get started by uploading your first document.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {documents.map((doc) => {
                  const docType = requiredDocumentTypes.find(t => t.name === doc.documentType);
                  return (
                    <div key={doc._id} className="bg-white rounded-lg p-5 border-2 border-green-300 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="flex-shrink-0">
                            {isImageFile(doc.fileName) ? (
                              <div className="relative">
                                <img
                                  src={`http://localhost:5001${doc.filePath}`}
                                  alt={doc.documentType}
                                  className="w-16 h-16 object-cover rounded-lg border border-green-200"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                              </div>
                            ) : (
                              <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center text-green-600 border border-green-300">
                                <FiFile className="w-8 h-8" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900 truncate">{doc.documentType}</h3>
                              {docType?.required && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                  Required
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1 truncate">{doc.fileName}</p>
                            <div className="flex items-center mt-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                                {getStatusIcon(doc.status)}
                                <span className="ml-1 capitalize">{doc.status}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-stretch md:self-center">
                          <a
                            href={`http://localhost:5001${doc.filePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download"
                          >
                            <FiDownload className="w-5 h-5" />
                          </a>
                          <button
                            onClick={() => handleEditClick(doc)}
                            className="flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FiEdit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(doc._id)}
                            className="flex items-center justify-center w-10 h-10 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Document">
        {editingDoc && (
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Type
              </label>
              <select
                value={newDocumentType}
                onChange={(e) => setNewDocumentType(e.target.value)}
                className="w-full border border-green-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Document Type</option>
                {requiredDocumentTypes.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name} {type.required && '(Required)'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Replace File (Optional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <FiUpload className="w-6 h-6 mb-1 text-gray-400" />
                    <p className="text-sm text-gray-500">Click to select a new file</p>
                  </div>
                  <input
                    type="file"
                    onChange={(e) => setNewFile(e.target.files[0])}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-green-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default DocumentsPage;
