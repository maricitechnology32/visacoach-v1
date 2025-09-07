import React from 'react';

// Assuming the same base Modal component as above
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

const ViewProgramModal = ({ isOpen, onClose, program, onEdit, onDelete }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Details for ${program?.name}`}>
      {program && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong className="text-gray-600 block">Level:</strong> <span className="text-lg">{program.level}</span></div>
            <div><strong className="text-gray-600 block">Duration:</strong> <span className="text-lg">{program.duration?.value} {program.duration?.unit}</span></div>
          </div>
          {program.tuitionFee?.amount && <div><strong className="text-gray-600 block">Tuition:</strong> <span className="text-lg">{program.tuitionFee.amount} {program.tuitionFee.currency} ({program.tuitionFee.period})</span></div>}
          {program.applicationDeadline && <div><strong className="text-gray-600 block">Deadline:</strong> <span className="text-lg">{new Date(program.applicationDeadline).toLocaleDateString()}</span></div>}
          {program.programDescription && <div><strong className="text-gray-600 block">Description:</strong> <p className="mt-1 p-2 bg-gray-50 rounded">{program.programDescription}</p></div>}

          <div className="flex justify-end pt-4 space-x-2 border-t mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">Close</button>
            <button type="button" onClick={onEdit} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Edit</button>
            <button type="button" onClick={onDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewProgramModal;