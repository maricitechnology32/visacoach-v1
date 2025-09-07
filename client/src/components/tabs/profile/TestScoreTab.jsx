/* eslint-disable no-unused-vars */
// import { useState, useEffect } from 'react';
// import { format, parseISO, isValid } from 'date-fns';

// const TestScoresTab = ({ data, onAdd, onRemove, onUpdate }) => {
//   const [newEntry, setNewEntry] = useState({
//     testType: '',
//     score: '',
//     testDate: '',
//     reading: '',
//     listening: '',
//     speaking: '',
//     writing: '',
//     total: ''
//   });
//   const [editEntry, setEditEntry] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [sortBy, setSortBy] = useState('testDate');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [filterType, setFilterType] = useState('');
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

//   // Validate form inputs
//   const validateForm = (entry) => {
//     const newErrors = {};
//     if (!entry.testType) newErrors.testType = 'Test type is required';
//     if (!entry.score && !entry.total) newErrors.score = 'Score or total is required';
//     if (!entry.testDate) newErrors.testDate = 'Test date is required';
//     if (entry.testDate && !isValid(parseISO(entry.testDate))) {
//       newErrors.testDate = 'Invalid date format';
//     }
//     if (entry.score && isNaN(Number(entry.score))) {
//       newErrors.score = 'Score must be a valid number';
//     }
//     return newErrors;
//   };

//   // Auto-calculate total for language tests
//   useEffect(() => {
//     if (showSectionScores(newEntry.testType)) {
//       const sections = ['reading', 'listening', 'speaking', 'writing'];
//       const total = sections.reduce((sum, field) => {
//         const value = Number(newEntry[field]) || 0;
//         return sum + value;
//       }, 0);
//       setNewEntry(prev => ({ ...prev, total: total > 0 ? total : '' }));
//     }
//   }, [newEntry.reading, newEntry.listening, newEntry.speaking, newEntry.writing]);

//   const handleChange = (field, value) => {
//     const updatedEntry = { ...newEntry, [field]: value };
//     setNewEntry(updatedEntry);
//     setErrors(validateForm(updatedEntry));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formErrors = validateForm(newEntry);
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     const processedEntry = {
//       ...newEntry,
//       score: newEntry.score ? Number(newEntry.score) : undefined,
//       reading: newEntry.reading ? Number(newEntry.reading) : undefined,
//       listening: newEntry.listening ? Number(newEntry.listening) : undefined,
//       speaking: newEntry.speaking ? Number(newEntry.speaking) : undefined,
//       writing: newEntry.writing ? Number(newEntry.writing) : undefined,
//       total: newEntry.total ? Number(newEntry.total) : undefined
//     };

//     if (editEntry) {
//       onUpdate({ ...processedEntry, _id: editEntry._id });
//       setEditEntry(null);
//     } else {
//       onAdd(processedEntry);
//     }

//     setNewEntry({
//       testType: '',
//       score: '',
//       testDate: '',
//       reading: '',
//       listening: '',
//       speaking: '',
//       writing: '',
//       total: ''
//     });
//     setErrors({});
//   };

//   const handleEdit = (entry) => {
//     setEditEntry(entry);
//     setNewEntry({
//       testType: entry.testType || '',
//       score: entry.score || '',
//       testDate: entry.testDate || '',
//       reading: entry.reading || '',
//       listening: entry.listening || '',
//       speaking: entry.speaking || '',
//       writing: entry.writing || '',
//       total: entry.total || ''
//     });
//   };

//   const handleCancelEdit = () => {
//     setEditEntry(null);
//     setNewEntry({
//       testType: '',
//       score: '',
//       testDate: '',
//       reading: '',
//       listening: '',
//       speaking: '',
//       writing: '',
//       total: ''
//     });
//     setErrors({});
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Date not specified';
//     try {
//       const date = parseISO(dateString);
//       return isValid(date)
//         ? format(date, 'MMMM d, yyyy')
//         : 'Invalid date';
//     } catch (error) {
//       return 'Invalid date', error;
//     }
//   };

//   const showSectionScores = (testType) => {
//     return ['TOEFL', 'IELTS', 'PTE', 'Duolingo'].includes(testType);
//   };

//   // Sort and filter data
//   const sortedAndFilteredData = [...data]
//     .filter(entry => filterType ? entry.testType === filterType : true)
//     .sort((a, b) => {
//       const valueA = a[sortBy] || '';
//       const valueB = b[sortBy] || '';
//       if (sortBy === 'testDate') {
//         return sortOrder === 'desc'
//           ? new Date(valueB) - new Date(valueA)
//           : new Date(valueA) - new Date(valueB);
//       }
//       return sortOrder === 'desc'
//         ? valueB > valueA ? 1 : -1
//         : valueA > valueB ? 1 : -1;
//     });

//   return (
//     <div className="bg-white p-8 rounded-md border border-3 border-green-200 ">
//       {/* Section Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//           Test Scores
//         </h2>
//         <div className="flex gap-4">
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             <option value="testDate">Sort by Date</option>
//             <option value="testType">Sort by Test Type</option>
//             <option value="score">Sort by Score</option>
//           </select>
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             <option value="desc">Descending</option>
//             <option value="asc">Ascending</option>
//           </select>
//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             <option value="">All Tests</option>
//             <option value="TOEFL">TOEFL</option>
//             <option value="IELTS">IELTS</option>
//             <option value="GRE">GRE</option>
//             <option value="GMAT">GMAT</option>
//             <option value="SAT">SAT</option>
//             <option value="ACT">ACT</option>
//             <option value="Duolingo">Duolingo</option>
//             <option value="PTE">PTE</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//       </div>

//       {/* Test Scores List */}
//       <div className="mb-8">
//         {sortedAndFilteredData.map((entry) => (
//           <div key={entry._id} className="border-b border-gray-200 py-4 flex justify-between items-center group hover:bg-gray-50 transition-colors duration-200 px-4 rounded-lg">
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-2">
//                 <span className="font-semibold text-gray-800">{entry.testType}</span>
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                   {entry.score || entry.total}
//                 </span>
//               </div>

//               {showSectionScores(entry.testType) && (entry.reading || entry.listening || entry.speaking || entry.writing) && (
//                 <div className="flex flex-wrap gap-2 mt-2 mb-2">
//                   {entry.reading && (
//                     <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
//                       Reading: {entry.reading}
//                     </span>
//                   )}
//                   {entry.listening && (
//                     <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
//                       Listening: {entry.listening}
//                     </span>
//                   )}
//                   {entry.speaking && (
//                     <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
//                       Speaking: {entry.speaking}
//                     </span>
//                   )}
//                   {entry.writing && (
//                     <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
//                       Writing: {entry.writing}
//                     </span>
//                   )}
//                 </div>
//               )}

//               <p className="text-sm text-gray-500 flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 Taken on {formatDate(entry.testDate)}
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleEdit(entry)}
//                 className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded-full hover:bg-blue-50"
//                 title="Edit test score"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                 </svg>
//               </button>
//               <button
//                 onClick={() => setShowDeleteConfirm(entry._id)}
//                 className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
//                 title="Remove test score"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ))}

//         {sortedAndFilteredData.length === 0 && (
//           <div className="text-center py-8 border border-dashed  border-green-300 rounded-lg bg-gray-50">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             <p className="text-gray-500 mt-2">No test scores match the current filter.</p>
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Dialog */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
//             <p className="text-gray-600 mb-6">Are you sure you want to delete this test score? This action cannot be undone.</p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowDeleteConfirm(null)}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   onRemove(showDeleteConfirm);
//                   setShowDeleteConfirm(null);
//                 }}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add/Edit Test Score Form */}
//       <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//         </svg>
//         {editEntry ? 'Edit Test Score' : 'Add New Test Score'}
//       </h3>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Test Type <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={newEntry.testType}
//               onChange={(e) => handleChange('testType', e.target.value)}
//               className={`w-full border ${errors.testType ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               required
//             >
//               <option value="">Select Test</option>
//               <option value="TOEFL">TOEFL</option>
//               <option value="IELTS">IELTS</option>
//               <option value="GRE">GRE</option>
//               <option value="GMAT">GMAT</option>
//               <option value="SAT">SAT</option>
//               <option value="ACT">ACT</option>
//               <option value="Duolingo">Duolingo English Test</option>
//               <option value="PTE">PTE Academic</option>
//               <option value="Other">Other</option>
//             </select>
//             {errors.testType && <p className="text-red-500 text-xs mt-1">{errors.testType}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               {['GRE', 'GMAT', 'SAT', 'ACT'].includes(newEntry.testType) ? 'Total Score' : 'Score'} <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               value={newEntry.score}
//               onChange={(e) => handleChange('score', e.target.value)}
//               className={`w-full border ${errors.score ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               required
//               placeholder={['GRE', 'GMAT'].includes(newEntry.testType) ? 'e.g., 320' :
//                 newEntry.testType === 'SAT' ? 'e.g., 1500' :
//                   newEntry.testType === 'ACT' ? 'e.g., 32' :
//                     'e.g., 105, 7.5'}
//               min="0"
//               step="0.5"
//             />
//             {errors.score && <p className="text-red-500 text-xs mt-1">{errors.score}</p>}
//           </div>
//         </div>

//         {showSectionScores(newEntry.testType) && (
//           <div className="border-t border-gray-200 pt-6">
//             <h4 className="text-md font-medium text-gray-700 mb-4">Section Scores (Optional, Auto-calculated Total: {newEntry.total || 'N/A'})</h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {['reading', 'listening', 'speaking', 'writing'].map((field) => (
//                 <div key={field}>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//                   <input
//                     type="number"
//                     value={newEntry[field]}
//                     onChange={(e) => handleChange(field, e.target.value)}
//                     className="w-full border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                     placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} score`}
//                     min="0"
//                     step="0.5"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="border-t border-gray-200 pt-6">
//           <div className="grid grid-cols-1 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Test Date <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="date"
//                 value={newEntry.testDate}
//                 onChange={(e) => handleChange('testDate', e.target.value)}
//                 className={`w-full border ${errors.testDate ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//                 required
//                 max={format(new Date(), 'yyyy-MM-dd')}
//               />
//               {errors.testDate && <p className="text-red-500 text-xs mt-1">{errors.testDate}</p>}
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 pt-4">
//           {editEntry && (
//             <button
//               type="button"
//               onClick={handleCancelEdit}
//               className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             >
//               Cancel
//             </button>
//           )}
//           <button
//             type="submit"
//             className="px-6 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors flex items-center gap-2"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             {editEntry ? 'Update Test Score' : 'Add Test Score'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default TestScoresTab;

import { useState, useEffect } from 'react';
import { format, parseISO, isValid } from 'date-fns';

const TestScoresTab = ({ data, onAdd, onRemove, onUpdate }) => {
  const [newEntry, setNewEntry] = useState({
    testType: '',
    score: '',
    testDate: '',
    reading: '',
    listening: '',
    speaking: '',
    writing: '',
    total: ''
  });
  const [editEntry, setEditEntry] = useState(null);
  const [errors, setErrors] = useState({});
  const [sortBy, setSortBy] = useState('testDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Validate form inputs
  const validateForm = (entry) => {
    const newErrors = {};
    if (!entry.testType) newErrors.testType = 'Test type is required';
    if (!entry.score && !entry.total) newErrors.score = 'Score or total is required';
    if (!entry.testDate) newErrors.testDate = 'Test date is required';
    if (entry.testDate && !isValid(parseISO(entry.testDate))) {
      newErrors.testDate = 'Invalid date format';
    }
    if (entry.score && isNaN(Number(entry.score))) {
      newErrors.score = 'Score must be a valid number';
    }
    return newErrors;
  };

  // Auto-calculate total for language tests
  useEffect(() => {
    if (showSectionScores(newEntry.testType)) {
      const sections = ['reading', 'listening', 'speaking', 'writing'];
      const total = sections.reduce((sum, field) => {
        const value = Number(newEntry[field]) || 0;
        return sum + value;
      }, 0);
      setNewEntry(prev => ({ ...prev, total: total > 0 ? total : '' }));
    }
  }, [newEntry.reading, newEntry.listening, newEntry.speaking, newEntry.writing, newEntry.testType]);

  const handleChange = (field, value) => {
    const updatedEntry = { ...newEntry, [field]: value };
    setNewEntry(updatedEntry);
    setErrors(validateForm(updatedEntry));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(newEntry);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const processedEntry = {
      ...newEntry,
      score: newEntry.score ? Number(newEntry.score) : undefined,
      reading: newEntry.reading ? Number(newEntry.reading) : undefined,
      listening: newEntry.listening ? Number(newEntry.listening) : undefined,
      speaking: newEntry.speaking ? Number(newEntry.speaking) : undefined,
      writing: newEntry.writing ? Number(newEntry.writing) : undefined,
      total: newEntry.total ? Number(newEntry.total) : undefined
    };

    if (editEntry) {
      onUpdate({ ...processedEntry, _id: editEntry._id });
      setEditEntry(null);
    } else {
      onAdd(processedEntry);
    }

    setNewEntry({
      testType: '',
      score: '',
      testDate: '',
      reading: '',
      listening: '',
      speaking: '',
      writing: '',
      total: ''
    });
    setErrors({});
  };

  const handleEdit = (entry) => {
    setEditEntry(entry);
    setNewEntry({
      testType: entry.testType || '',
      score: entry.score || '',
      testDate: entry.testDate || '',
      reading: entry.reading || '',
      listening: entry.listening || '',
      speaking: entry.speaking || '',
      writing: entry.writing || '',
      total: entry.total || ''
    });
  };

  const handleCancelEdit = () => {
    setEditEntry(null);
    setNewEntry({
      testType: '',
      score: '',
      testDate: '',
      reading: '',
      listening: '',
      speaking: '',
      writing: '',
      total: ''
    });
    setErrors({});
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    try {
      const date = parseISO(dateString);
      return isValid(date)
        ? format(date, 'MMM d, yyyy')
        : 'Invalid date';
    } catch (error) {
      return 'Invalid date',error;
    }
  };

  const showSectionScores = (testType) => {
    return ['TOEFL', 'IELTS', 'PTE', 'Duolingo'].includes(testType);
  };

  // Sort and filter data
  const sortedAndFilteredData = [...data]
    .filter(entry => filterType ? entry.testType === filterType : true)
    .sort((a, b) => {
      const valueA = a[sortBy] || '';
      const valueB = b[sortBy] || '';
      if (sortBy === 'testDate') {
        return sortOrder === 'desc'
          ? new Date(valueB) - new Date(valueA)
          : new Date(valueA) - new Date(valueB);
      }
      return sortOrder === 'desc'
        ? valueB > valueA ? 1 : -1
        : valueA > valueB ? 1 : -1;
    });

  return (
    <div className="bg-white p-4 md:p-6 lg:p-8 rounded-sm border-2 border-green-300 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Test Scores
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-green-300 rounded-md px-2 py-1 sm:px-3 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="testDate">Date</option>
              <option value="testType">Test Type</option>
              <option value="score">Score</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-green-300 rounded-md px-2 py-1 sm:px-3 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-green-300 rounded-md px-2 py-1 sm:px-3 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Tests</option>
            <option value="TOEFL">TOEFL</option>
            <option value="IELTS">IELTS</option>
            <option value="GRE">GRE</option>
            <option value="GMAT">GMAT</option>
            <option value="SAT">SAT</option>
            <option value="ACT">ACT</option>
            <option value="Duolingo">Duolingo</option>
            <option value="PTE">PTE</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Test Scores List */}
      <div className="mb-6 md:mb-8">
        {sortedAndFilteredData.map((entry) => (
          <div key={entry._id} className="border-b border-gray-200 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center group hover:bg-gray-50 transition-colors duration-200 px-3 rounded-lg">
            <div className="flex-1 mb-2 sm:mb-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-semibold text-gray-800 text-sm sm:text-base">{entry.testType}</span>
                <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {entry.score || entry.total}
                </span>
              </div>

              {showSectionScores(entry.testType) && (entry.reading || entry.listening || entry.speaking || entry.writing) && (
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 mb-2">
                  {entry.reading && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      R: {entry.reading}
                    </span>
                  )}
                  {entry.listening && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                      L: {entry.listening}
                    </span>
                  )}
                  {entry.speaking && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      S: {entry.speaking}
                    </span>
                  )}
                  {entry.writing && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      W: {entry.writing}
                    </span>
                  )}
                </div>
              )}

              <p className="text-xs sm:text-sm text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(entry.testDate)}
              </p>
            </div>

            <div className="flex gap-2 self-end sm:self-center">
              <button
                onClick={() => handleEdit(entry)}
                className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded-full hover:bg-blue-50"
                title="Edit test score"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(entry._id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                title="Remove test score"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {sortedAndFilteredData.length === 0 && (
          <div className="text-center py-8 border border-dashed border-green-300 rounded-lg bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              {filterType ? `No ${filterType} test scores found` : 'No test scores added yet'}
            </p>
            {filterType && (
              <button
                onClick={() => setFilterType('')}
                className="text-green-600 hover:text-green-700 text-sm mt-2 underline"
              >
                Clear filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Are you sure you want to delete this test score? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 sm:gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onRemove(showDeleteConfirm);
                  setShowDeleteConfirm(null);
                }}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm sm:text-base"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Test Score Form */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {editEntry ? 'Edit Test Score' : 'Add New Test Score'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Type <span className="text-red-500">*</span>
              </label>
              <select
                value={newEntry.testType}
                onChange={(e) => handleChange('testType', e.target.value)}
                className={`w-full border ${errors.testType ? 'border-red-500' : 'border-green-300'} rounded-md px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
              >
                <option value="">Select Test</option>
                <option value="TOEFL">TOEFL</option>
                <option value="IELTS">IELTS</option>
                <option value="GRE">GRE</option>
                <option value="GMAT">GMAT</option>
                <option value="SAT">SAT</option>
                <option value="ACT">ACT</option>
                <option value="Duolingo">Duolingo English Test</option>
                <option value="PTE">PTE Academic</option>
                <option value="Other">Other</option>
              </select>
              {errors.testType && <p className="text-red-500 text-xs mt-1">{errors.testType}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {['GRE', 'GMAT', 'SAT', 'ACT'].includes(newEntry.testType) ? 'Total Score' : 'Score'} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={newEntry.score}
                onChange={(e) => handleChange('score', e.target.value)}
                className={`w-full border ${errors.score ? 'border-red-500' : 'border-green-300'} rounded-md px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
                placeholder={['GRE', 'GMAT'].includes(newEntry.testType) ? 'e.g., 320' :
                  newEntry.testType === 'SAT' ? 'e.g., 1500' :
                    newEntry.testType === 'ACT' ? 'e.g., 32' :
                      'e.g., 105, 7.5'}
                min="0"
                step="0.5"
              />
              {errors.score && <p className="text-red-500 text-xs mt-1">{errors.score}</p>}
            </div>
          </div>

          {showSectionScores(newEntry.testType) && (
            <div className="border-t border-gray-200 pt-4 md:pt-6">
              <h4 className="text-sm md:text-md font-medium text-gray-700 mb-3 md:mb-4">
                Section Scores (Optional, Auto-calculated Total: {newEntry.total || 'N/A'})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {['reading', 'listening', 'speaking', 'writing'].map((field) => (
                  <div key={field}>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type="number"
                      value={newEntry[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full border border-green-300 rounded-md px-2 py-1 md:px-3 md:py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} score`}
                      min="0"
                      step="0.5"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4 md:pt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={newEntry.testDate}
                onChange={(e) => handleChange('testDate', e.target.value)}
                className={`w-full border ${errors.testDate ? 'border-red-500' : 'border-green-300'} rounded-md px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.testDate && <p className="text-red-500 text-xs mt-1">{errors.testDate}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 md:gap-4 pt-4">
            {editEntry && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm md:text-base"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors flex items-center gap-2 text-sm md:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {editEntry ? 'Update' : 'Add Test Score'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestScoresTab;