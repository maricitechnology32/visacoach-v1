// import { useState } from 'react';
// import { format, parseISO, isValid, isAfter, isFuture } from 'date-fns';

// const EducationTab = ({ data, onAdd, onRemove, onUpdate }) => {
//   const [newEntry, setNewEntry] = useState({
//     institution: '',
//     degree: '',
//     fieldOfStudy: '',
//     startDate: '',
//     endDate: '',
//     gpa: ''
//   });
//   const [editEntry, setEditEntry] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
//   const [showResetConfirm, setShowResetConfirm] = useState(false);
//   const [sortBy, setSortBy] = useState('startDate');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [filterInstitution, setFilterInstitution] = useState('');

//   // Validate form inputs
//   const validateForm = (entry) => {
//     const newErrors = {};
//     if (!entry.institution) newErrors.institution = 'Institution is required';
//     if (entry.institution.length > 100) newErrors.institution = 'Institution must be 100 characters or less';
//     if (!entry.degree) newErrors.degree = 'Degree is required';
//     if (entry.degree.length > 50) newErrors.degree = 'Degree must be 50 characters or less';
//     if (!entry.fieldOfStudy) newErrors.fieldOfStudy = 'Field of study is required';
//     if (entry.fieldOfStudy.length > 50) newErrors.fieldOfStudy = 'Field of study must be 50 characters or less';
//     if (!entry.startDate) newErrors.startDate = 'Start date is required';
//     if (entry.startDate && (!isValid(parseISO(entry.startDate)) || isFuture(parseISO(entry.startDate)))) {
//       newErrors.startDate = 'Invalid or future start date';
//     }
//     if (entry.endDate && (!isValid(parseISO(entry.endDate)) || isFuture(parseISO(entry.endDate)))) {
//       newErrors.endDate = 'Invalid or future end date';
//     }
//     if (entry.startDate && entry.endDate && !isAfter(parseISO(entry.endDate), parseISO(entry.startDate))) {
//       newErrors.endDate = 'End date must be after start date';
//     }
//     if (entry.gpa && !/^\d*\.?\d{0,2}$/.test(entry.gpa)) {
//       newErrors.gpa = 'GPA must be a valid number (e.g., 3.5)';
//     }
//     if (entry.gpa && (Number(entry.gpa) < 0 || Number(entry.gpa) > 4.0)) {
//       newErrors.gpa = 'GPA must be between 0.0 and 4.0';
//     }
//     return newErrors;
//   };

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
//       gpa: newEntry.gpa ? Number(newEntry.gpa) : undefined
//     };

//     if (editEntry) {
//       onUpdate({ ...processedEntry, _id: editEntry._id });
//       setEditEntry(null);
//     } else {
//       onAdd(processedEntry);
//     }

//     setNewEntry({
//       institution: '',
//       degree: '',
//       fieldOfStudy: '',
//       startDate: '',
//       endDate: '',
//       gpa: ''
//     });
//     setErrors({});
//   };

//   const handleEdit = (entry) => {
//     setEditEntry(entry);
//     setNewEntry({
//       institution: entry.institution || '',
//       degree: entry.degree || '',
//       fieldOfStudy: entry.fieldOfStudy || '',
//       startDate: entry.startDate || '',
//       endDate: entry.endDate || '',
//       gpa: entry.gpa || ''
//     });
//   };

//   const handleCancelEdit = () => {
//     setEditEntry(null);
//     setNewEntry({
//       institution: '',
//       degree: '',
//       fieldOfStudy: '',
//       startDate: '',
//       endDate: '',
//       gpa: ''
//     });
//     setErrors({});
//   };

//   const handleReset = () => {
//     handleCancelEdit();
//     setShowResetConfirm(false);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not specified';
//     try {
//       const date = parseISO(dateString);
//       return isValid(date) ? format(date, 'MMMM yyyy') : 'Invalid date';
//     } catch {
//       return 'Invalid date';
//     }
//   };

//   // Sort and filter data
//   const sortedAndFilteredData = [...data]
//     .filter(entry => filterInstitution ? entry.institution.toLowerCase().includes(filterInstitution.toLowerCase()) : true)
//     .sort((a, b) => {
//       const valueA = a[sortBy] || '';
//       const valueB = b[sortBy] || '';
//       if (sortBy === 'startDate' || sortBy === 'endDate') {
//         return sortOrder === 'desc'
//           ? new Date(valueB) - new Date(valueA)
//           : new Date(valueA) - new Date(valueB);
//       }
//       return sortOrder === 'desc'
//         ? valueB.localeCompare(valueA)
//         : valueA.localeCompare(valueB);
//     });

//   return (
//     <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01-2.964.74 12.083 12.083 0 01-2.964-.74L12 14z" />
//           </svg>
//           Education History
//         </h2>
//         <div className="flex gap-4">
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="border  border-green-300 rounded-md px-3 py-2 focus:outline-none  "
//           >
//             <option value="startDate">Sort by Start Date</option>
//             <option value="institution">Sort by Institution</option>
//             <option value="degree">Sort by Degree</option>
//           </select>
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="border  border-green-300 rounded-md px-3 py-2 focus:outline-none  "
//           >
//             <option value="desc">Descending</option>
//             <option value="asc">Ascending</option>
//           </select>
//           <input
//             type="text"
//             value={filterInstitution}
//             onChange={(e) => setFilterInstitution(e.target.value)}
//             placeholder="Filter by institution"
//             className="border  border-green-300 rounded-md px-3 py-2 focus:outline-none  "
//           />
//         </div>
//       </div>

//       {/* Education Entries List */}
//       <div className="space-y-4 mb-8">
//         {sortedAndFilteredData.length > 0 ? (
//           sortedAndFilteredData.map((entry) => (
//             <div
//               key={entry._id}
//               className="bg-green-50 border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-colors duration-200"
//             >
//               <div>
//                 <p className="font-semibold text-lg text-gray-800">{entry.degree} in {entry.fieldOfStudy}</p>
//                 <p className="text-sm text-gray-600">{entry.institution}</p>
//                 <p className="text-sm text-gray-600">
//                   {formatDate(entry.startDate)} - {entry.endDate ? formatDate(entry.endDate) : 'Present'}
//                 </p>
//                 {entry.gpa && <p className="text-sm text-gray-600">GPA: {entry.gpa}</p>}
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleEdit(entry)}
//                   className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded-full hover:bg-blue-50"
//                   title="Edit education entry"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={() => setShowDeleteConfirm(entry._id)}
//                   className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
//                   title="Remove education entry"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-8 border border-dashed  border-green-300 rounded-lg bg-gray-50">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 9h18m-9 6h9m-9-6h9" />
//             </svg>
//             <p className="text-gray-500 mt-2">No education history matches the current filter.</p>
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Dialog */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
//             <p className="text-gray-600 mb-6">Are you sure you want to delete this education entry? This action cannot be undone.</p>
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

//       {/* Reset Confirmation Dialog */}
//       {showResetConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Reset</h3>
//             <p className="text-gray-600 mb-6">Are you sure you want to reset the form? All unsaved changes will be lost.</p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowResetConfirm(false)}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleReset}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//               >
//                 Reset
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add/Edit Education Entry */}
//       <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//         </svg>
//         {editEntry ? 'Edit Education Entry' : 'Add New Education Entry'}
//       </h3>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Institution <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={newEntry.institution}
//               onChange={(e) => handleChange('institution', e.target.value)}
//               className={`w-full border ${errors.institution ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none  `}
//               required
//               maxLength={100}
//             />
//             {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
//             <p className="text-sm text-gray-500 mt-1">{newEntry.institution.length}/100 characters</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Degree <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={newEntry.degree}
//               onChange={(e) => handleChange('degree', e.target.value)}
//               className={`w-full border ${errors.degree ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none  `}
//               required
//               maxLength={50}
//             />
//             {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree}</p>}
//             <p className="text-sm text-gray-500 mt-1">{newEntry.degree.length}/50 characters</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Field of Study <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={newEntry.fieldOfStudy}
//               onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
//               className={`w-full border ${errors.fieldOfStudy ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none  `}
//               required
//               maxLength={50}
//             />
//             {errors.fieldOfStudy && <p className="text-red-500 text-xs mt-1">{errors.fieldOfStudy}</p>}
//             <p className="text-sm text-gray-500 mt-1">{newEntry.fieldOfStudy.length}/50 characters</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Start Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               value={newEntry.startDate}
//               onChange={(e) => handleChange('startDate', e.target.value)}
//               className={`w-full border ${errors.startDate ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none  `}
//               required
//               max={format(new Date(), 'yyyy-MM-dd')}
//             />
//             {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//             <input
//               type="date"
//               value={newEntry.endDate}
//               onChange={(e) => handleChange('endDate', e.target.value)}
//               className={`w-full border ${errors.endDate ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none  `}
//               min={newEntry.startDate}
//             />
//             {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">GPA/Grade</label>
//             <input
//               type="text"
//               value={newEntry.gpa}
//               onChange={(e) => handleChange('gpa', e.target.value)}
//               className={`w-full border ${errors.gpa ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none  `}
//               placeholder="e.g., 3.5"
//             />
//             {errors.gpa && <p className="text-red-500 text-xs mt-1">{errors.gpa}</p>}
//           </div>
//         </div>
//         <div className="flex justify-end gap-4 pt-4">
//           {(editEntry || newEntry.institution || newEntry.degree || newEntry.fieldOfStudy || newEntry.startDate || newEntry.endDate || newEntry.gpa) && (
//             <button
//               type="button"
//               onClick={() => setShowResetConfirm(true)}
//               className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//             >
//               {editEntry ? 'Cancel Edit' : 'Reset Form'}
//             </button>
//           )}
//           <button
//             type="submit"
//             className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 flex items-center gap-2"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             {editEntry ? 'Update Education' : 'Add Education'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EducationTab;


import { useState } from 'react';
import { format, parseISO, isValid, isAfter, isFuture } from 'date-fns';

const EducationTab = ({ data, onAdd, onRemove, onUpdate }) => {
  const [newEntry, setNewEntry] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });
  const [editEntry, setEditEntry] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [sortBy, setSortBy] = useState('startDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterInstitution, setFilterInstitution] = useState('');

  // Validate form inputs
  const validateForm = (entry) => {
    const newErrors = {};
    if (!entry.institution) newErrors.institution = 'Institution is required';
    if (entry.institution.length > 100) newErrors.institution = 'Institution must be 100 characters or less';
    if (!entry.degree) newErrors.degree = 'Degree is required';
    if (entry.degree.length > 50) newErrors.degree = 'Degree must be 50 characters or less';
    if (!entry.fieldOfStudy) newErrors.fieldOfStudy = 'Field of study is required';
    if (entry.fieldOfStudy.length > 50) newErrors.fieldOfStudy = 'Field of study must be 50 characters or less';
    if (!entry.startDate) newErrors.startDate = 'Start date is required';
    if (entry.startDate && (!isValid(parseISO(entry.startDate)) || isFuture(parseISO(entry.startDate)))) {
      newErrors.startDate = 'Invalid or future start date';
    }
    if (entry.endDate && (!isValid(parseISO(entry.endDate)) || isFuture(parseISO(entry.endDate)))) {
      newErrors.endDate = 'Invalid or future end date';
    }
    if (entry.startDate && entry.endDate && !isAfter(parseISO(entry.endDate), parseISO(entry.startDate))) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (entry.gpa && !/^\d*\.?\d{0,2}$/.test(entry.gpa)) {
      newErrors.gpa = 'GPA must be a valid number (e.g., 3.5)';
    }
    if (entry.gpa && (Number(entry.gpa) < 0 || Number(entry.gpa) > 4.0)) {
      newErrors.gpa = 'GPA must be between 0.0 and 4.0';
    }
    return newErrors;
  };

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
      gpa: newEntry.gpa ? Number(newEntry.gpa) : undefined
    };

    if (editEntry) {
      onUpdate({ ...processedEntry, _id: editEntry._id });
      setEditEntry(null);
    } else {
      onAdd(processedEntry);
    }

    setNewEntry({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: ''
    });
    setErrors({});
  };

  const handleEdit = (entry) => {
    setEditEntry(entry);
    setNewEntry({
      institution: entry.institution || '',
      degree: entry.degree || '',
      fieldOfStudy: entry.fieldOfStudy || '',
      startDate: entry.startDate || '',
      endDate: entry.endDate || '',
      gpa: entry.gpa || ''
    });
  };

  const handleCancelEdit = () => {
    setEditEntry(null);
    setNewEntry({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: ''
    });
    setErrors({});
  };

  const handleReset = () => {
    handleCancelEdit();
    setShowResetConfirm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'MMMM yyyy') : 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  };

  // Sort and filter data
  const sortedAndFilteredData = [...data]
    .filter(entry => filterInstitution ? entry.institution.toLowerCase().includes(filterInstitution.toLowerCase()) : true)
    .sort((a, b) => {
      const valueA = a[sortBy] || '';
      const valueB = b[sortBy] || '';
      if (sortBy === 'startDate' || sortBy === 'endDate') {
        return sortOrder === 'desc'
          ? new Date(valueB) - new Date(valueA)
          : new Date(valueA) - new Date(valueB);
      }
      return sortOrder === 'desc'
        ? valueB.localeCompare(valueA)
        : valueA.localeCompare(valueB);
    });

  return (
    <div className=" p-6 rounded-md border-3 border border-green-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b border-gray-200 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <span className="bg-green-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01-2.964.74 12.083 12.083 0 01-2.964-.74L12 14z" />
            </svg>
          </span>
          Education History
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border  border-green-300 rounded-md px-3 py-2 focus:outline-none   text-sm"
            >
              <option value="startDate">Start Date</option>
              <option value="institution">Institution</option>
              <option value="degree">Degree</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-green-300 rounded-md px-3 py-2 focus:outline-none   text-sm"
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
          <input
            type="text"
            value={filterInstitution}
            onChange={(e) => setFilterInstitution(e.target.value)}
            placeholder="Filter by institution"
            className="border border-green-300 rounded-md px-3 py-2 focus:outline-none   text-sm"
          />
        </div>
      </div>

      {/* Education Entries List */}
      <div className="space-y-4 mb-8">
        {sortedAndFilteredData.length > 0 ? (
          sortedAndFilteredData.map((entry) => (
            <div
              key={entry._id}
              className="bg-gray-50 border border-green-200 rounded-lg p-4 flex justify-between items-start shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9-5m9 5v6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-800">{entry.degree} in {entry.fieldOfStudy}</p>
                    <p className="text-green-600 font-medium">{entry.institution}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDate(entry.startDate)} - {entry.endDate ? formatDate(entry.endDate) : 'Present'}
                      {entry.gpa && <span className="ml-3">GPA: <span className="font-semibold">{entry.gpa}</span></span>}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(entry)}
                  className="text-gray-400 hover:text-green-600 transition-colors p-1 rounded-full hover:bg-green-50"
                  title="Edit education entry"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(entry._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                  title="Remove education entry"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border border-dashed  border-green-300 rounded-lg bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <p className="text-gray-500 mt-2">
              {data.length === 0
                ? "No education history added yet."
                : "No education history matches the current filter."}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this education entry? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onRemove(showDeleteConfirm);
                  setShowDeleteConfirm(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Reset</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to reset the form? All unsaved changes will be lost.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Education Entry */}
      <div className="bg-gray-50 p-5 rounded-lg border border-green-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {editEntry ? 'Edit Education Entry' : 'Add New Education Entry'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newEntry.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
                className={`w-full border ${errors.institution ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none  `}
                required
                maxLength={100}
              />
              {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
              <p className="text-xs text-gray-500 mt-1">{newEntry.institution.length}/100 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newEntry.degree}
                onChange={(e) => handleChange('degree', e.target.value)}
                className={`w-full border ${errors.degree ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none  `}
                required
                maxLength={50}
              />
              {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree}</p>}
              <p className="text-xs text-gray-500 mt-1">{newEntry.degree.length}/50 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newEntry.fieldOfStudy}
                onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                className={`w-full border ${errors.fieldOfStudy ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none  `}
                required
                maxLength={50}
              />
              {errors.fieldOfStudy && <p className="text-red-500 text-xs mt-1">{errors.fieldOfStudy}</p>}
              <p className="text-xs text-gray-500 mt-1">{newEntry.fieldOfStudy.length}/50 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={newEntry.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className={`w-full border ${errors.startDate ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none  `}
                required
                max={format(new Date(), 'yyyy-MM-dd')}
              />
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={newEntry.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className={`w-full border ${errors.endDate ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none  `}
                min={newEntry.startDate}
              />
              {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GPA/Grade</label>
              <input
                type="text"
                value={newEntry.gpa}
                onChange={(e) => handleChange('gpa', e.target.value)}
                className={`w-full border ${errors.gpa ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none  `}
                placeholder="e.g., 3.5"
              />
              {errors.gpa && <p className="text-red-500 text-xs mt-1">{errors.gpa}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            {(editEntry || newEntry.institution || newEntry.degree || newEntry.fieldOfStudy || newEntry.startDate || newEntry.endDate || newEntry.gpa) && (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                {editEntry ? 'Cancel Edit' : 'Reset Form'}
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {editEntry ? 'Update Education' : 'Add Education'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationTab;