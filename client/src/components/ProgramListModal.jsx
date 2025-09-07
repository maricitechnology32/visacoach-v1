// import React from 'react';
// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
//       <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl flex flex-col" onClick={e => e.stopPropagation()}>
//         <div className="flex justify-between items-center p-5 border-b">
//           <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//           <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto max-h-[75vh]">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };


// const ProgramListModal = ({ isOpen, onClose, university, onAdd, onEdit, onView, onDelete }) => {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title={`Programs at ${university?.name}`}>
//       <div className="space-y-4">
//         <button
//           onClick={onAdd}
//           className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//         >
//           + Add New Program
//         </button>
//         {university?.programs?.length > 0 ? (
//           <ul className="divide-y divide-gray-200">
//             {university.programs.map(program => (
//               <li key={program._id} className="py-3 flex justify-between items-center">
//                 <div>
//                   <p className="font-semibold text-gray-800">{program.name}</p>
//                   <p className="text-sm text-gray-500">{program.level}</p>
//                 </div>
//                 <div className="space-x-3">
//                   <button onClick={() => onView(program)} className="text-blue-600 hover:underline">Details</button>
//                   <button onClick={() => onEdit(program)} className="text-indigo-600 hover:underline">Edit</button>
//                   <button onClick={() => onDelete(program._id)} className="text-red-600 hover:underline">Delete</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-center text-gray-500 py-6">No programs found for this university.</p>
//         )}
//         <div className="flex justify-end pt-4 space-x-2 border-t mt-6">
//           <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">Close</button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ProgramListModal;


import React, { useState } from 'react';

// Toast notification component
const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 
             1 0 00-1.414-1.414L9 10.586 7.707 
             9.293a1 1 0 00-1.414 1.414l2 
             2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 
             0 000 16zM8.707 
             7.293a1 1 0 
             00-1.414 1.414L8.586 
             10l-1.293 
             1.293a1 1 0 
             101.414 1.414L10 
             11.414l1.293 
             1.293a1 1 0 
             001.414-1.414L11.414 
             10l1.293-1.293a1 1 0 
             00-1.414-1.414L10 
             8.586 8.707 
             7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 
             8 8 0 0116 
             0zm-7-4a1 1 0 
             11-2 0 1 1 0 
             012 0zM9 9a1 1 0 
             000 2v3a1 1 0 
             001 1h1a1 1 0 
             100-2v-3a1 1 0 
             00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  const bgColors = {
    success: 'bg-green-100 border-green-200 text-green-800',
    error: 'bg-red-100 border-red-200 text-red-800',
    info: 'bg-blue-100 border-blue-200 text-blue-800',
  };

  return (
    <div
      className={`fixed top-4 right-4 flex items-center p-4 mb-4 w-full max-w-xs border rounded-lg shadow-lg transition-opacity duration-300 ${bgColors[type]} z-50`}
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
        {icons[type]}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 hover:bg-gray-100 hover:bg-opacity-25 transition-colors"
        onClick={onClose}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 
               011.414 0L10 
               8.586l4.293-4.293a1 
               1 0 111.414 
               1.414L11.414 
               10l4.293 4.293a1 1 
               0 01-1.414 
               1.414L10 
               11.414l-4.293 
               4.293a1 1 0 
               01-1.414-1.414L8.586 
               10 4.293 
               5.707a1 1 0 
               010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

// Modal component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[75vh]">{children}</div>
      </div>
    </div>
  );
};

// Main ProgramListModal component
const ProgramListModal = ({
  isOpen,
  onClose,
  university,
  onAdd,
  onEdit,
  onView,
  onDelete,
}) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (programId, programName) => {
    if (window.confirm(`Are you sure you want to delete "${programName}"?`)) {
      onDelete(programId);
      showToast('Program deleted successfully', 'success');
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Programs at ${university?.name}`}
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Manage academic programs offered by this university
            </p>
            <button
              onClick={onAdd}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 
                     0H6"
                ></path>
              </svg>
              Add New Program
            </button>
          </div>

          {university?.programs?.length > 0 ? (
            <div className="bg-gray-50 rounded-xl p-1">
              <ul className="divide-y divide-gray-200">
                {university.programs.map((program) => (
                  <li
                    key={program._id}
                    className="py-4 px-4 hover:bg-white transition-colors rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {program.name}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                            {program.level}
                          </span>
                          <span className="text-sm text-gray-500">
                            {program.duration
                              ? `${program.duration.value} ${program.duration.unit}`
                              : 'Duration not specified'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            onView(program);
                            showToast('Viewing program details', 'info');
                          }}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                          title="View details"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 
                                 3 0 016 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 
                                 7.943 7.523 5 12 5c4.478 
                                 0 8.268 2.943 9.542 
                                 7-1.274 4.057-5.064 7-9.542 
                                 7-4.477 0-8.268-2.943-9.542-7z"
                            ></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            onEdit(program);
                            showToast('Editing program', 'info');
                          }}
                          className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors"
                          title="Edit program"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 
                                 00-2 2v11a2 2 0 
                                 002 2h11a2 2 0 
                                 002-2v-5m-1.414-9.414a2 
                                 2 0 112.828 2.828L11.828 
                                 15H9v-2.828l8.586-8.586z"
                            ></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(program._id, program.name)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete program"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 
                                 12.142A2 2 0 
                                 0116.138 21H7.862a2 2 0 
                                 01-1.995-1.858L5 7m5 
                                 4v6m4-6v6m1-10V4a1 
                                 1 0 00-1-1h-4a1 1 0 
                                 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-10 px-4 bg-gray-50 rounded-xl">
              <svg
                className="w-16 h-16 mx-auto text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 
                     4h.01m-6.938 
                     4h13.856c1.54 
                     0 2.502-1.667 
                     1.732-3L13.732 
                     4c-.77-1.333-2.694-1.333-3.464 
                     0L3.34 16c-.77 1.333.192 
                     3 1.732 3z"
                ></path>
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-700">
                No programs found
              </h3>
              <p className="mt-2 text-gray-500">
                This university doesn't have any programs yet.
              </p>
              <button
                onClick={onAdd}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-all"
              >
                Add the first program
              </button>
            </div>
          )}

          <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}
      </style>
    </>
  );
};

export default ProgramListModal;
