// import React from 'react';

// // Reusable form components
// const Input = ({ label, name, ...props }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <input name={name} {...props} className="w-full border p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
//   </div>
// );
// const TextArea = ({ label, name, ...props }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <textarea name={name} {...props} className="w-full border p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
//   </div>
// );
// const Select = ({ label, name, children, ...props }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <select name={name} {...props} className="w-full border p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500">{children}</select>
//   </div>
// );
// const Checkbox = ({ name, label, ...props }) => (
//   <label className="flex items-center space-x-2">
//     <input type="checkbox" name={name} {...props} className="rounded text-indigo-600 focus:ring-indigo-500" />
//     <span className="text-sm">{label}</span>
//   </label>
// );

// const ProgramModal = ({ isOpen, onClose, onSubmit, programFormData, setProgramFormData, isEditing, universityName }) => {
//   if (!isOpen) return null;

//   // --- Form Input Handlers ---
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProgramFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//   };

//   const handleNestedInputChange = (e, parentField) => {
//     const { name, value } = e.target;
//     setProgramFormData(prev => ({
//       ...prev,
//       [parentField]: { ...prev[parentField], [name]: value }
//     }));
//   };

//   const handleMultiSelectChange = (field, value) => {
//     const currentValues = programFormData[field] || [];
//     const newValues = currentValues.includes(value)
//       ? currentValues.filter(item => item !== value)
//       : [...currentValues, value];
//     setProgramFormData(prev => ({ ...prev, [field]: newValues }));
//   };

//   // --- Dynamic Array Handlers ---
//   const addLanguageRequirement = () => setProgramFormData(p => ({ ...p, languageRequirements: [...p.languageRequirements, { name: '', minimumScore: '' }] }));
//   const handleLanguageRequirementChange = (i, f, v) => setProgramFormData(p => ({ ...p, languageRequirements: p.languageRequirements.map((r, idx) => idx === i ? { ...r, [f]: v } : r) }));
//   const removeLanguageRequirement = (i) => setProgramFormData(p => ({ ...p, languageRequirements: p.languageRequirements.filter((_, idx) => idx !== i) }));

//   const addTestRequirement = () => setProgramFormData(p => ({ ...p, academicRequirements: { ...p.academicRequirements, requiredTests: [...p.academicRequirements.requiredTests, { name: '', minimumScore: '' }] } }));
//   const handleTestRequirementChange = (i, f, v) => setProgramFormData(p => ({ ...p, academicRequirements: { ...p.academicRequirements, requiredTests: p.academicRequirements.requiredTests.map((t, idx) => idx === i ? { ...t, [f]: v } : t) } }));
//   const removeTestRequirement = (i) => setProgramFormData(p => ({ ...p, academicRequirements: { ...p.academicRequirements, requiredTests: p.academicRequirements.requiredTests.filter((_, idx) => idx !== i) } }));

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
//       <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col" onClick={e => e.stopPropagation()}>
//         <div className="flex justify-between items-center p-5 border-b">
//           <h2 className="text-xl font-semibold text-gray-800">
//             {isEditing ? 'Edit Program' : 'Add New Program'}
//             {universityName && <span className="text-gray-500 font-normal"> to {universityName}</span>}
//           </h2>
//           <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto max-h-[75vh]">
//           <form onSubmit={onSubmit} className="space-y-6">
//             {/* --- Basic Information --- */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input label="Program Name *" name="name" value={programFormData.name} onChange={handleInputChange} required />
//               <Select label="Level *" name="level" value={programFormData.level} onChange={handleInputChange} required>
//                 <option>Bachelors</option><option>Masters</option><option>PhD</option><option>Diploma</option><option>Certificate</option>
//               </Select>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
//               <Input label="Duration Value" name="value" type="number" step="0.5" value={programFormData.duration.value} onChange={(e) => handleNestedInputChange(e, 'duration')} />
//               <Select label="Duration Unit" name="unit" value={programFormData.duration.unit} onChange={(e) => handleNestedInputChange(e, 'duration')}>
//                 <option>Years</option><option>Months</option><option>Semesters</option><option>Weeks</option>
//               </Select>
//             </div>

//             {/* --- Fees --- */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4">
//               <div className="space-y-2 p-3 border rounded-md"><h4 className="font-medium text-gray-800">Tuition Fee</h4><div className="grid grid-cols-1 sm:grid-cols-2 gap-2"><Input label="Amount" name="amount" type="number" step="0.01" value={programFormData.tuitionFee.amount} onChange={(e) => handleNestedInputChange(e, 'tuitionFee')} /><Select label="Currency" name="currency" value={programFormData.tuitionFee.currency} onChange={(e) => handleNestedInputChange(e, 'tuitionFee')}><option>USD</option><option>EUR</option></Select></div><Select label="Period" name="period" value={programFormData.tuitionFee.period} onChange={(e) => handleNestedInputChange(e, 'tuitionFee')}><option value="per year">Per Year</option><option value="per semester">Per Semester</option></Select></div>
//               <div className="space-y-2 p-3 border rounded-md"><h4 className="font-medium text-gray-800">Application Fee</h4><div className="grid grid-cols-1 sm:grid-cols-2 gap-2"><Input label="Amount" name="amount" type="number" step="0.01" value={programFormData.applicationFee.amount} onChange={(e) => handleNestedInputChange(e, 'applicationFee')} /><Select label="Currency" name="currency" value={programFormData.applicationFee.currency} onChange={(e) => handleNestedInputChange(e, 'applicationFee')}><option>USD</option><option>EUR</option></Select></div></div>
//             </div>

//             {/* --- Application Details --- */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
//               <Input label="Application Deadline" name="applicationDeadline" type="date" value={programFormData.applicationDeadline} onChange={handleInputChange} />
//               <Input label="Application Link" name="applicationLink" type="url" value={programFormData.applicationLink} onChange={handleInputChange} />
//             </div>
//             <div className="border-t pt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Intake Seasons</label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-2">{['Fall', 'Spring', 'Summer', 'Winter'].map(s => (<Checkbox key={s} label={s} checked={programFormData.intakeSeasons.includes(s)} onChange={() => handleMultiSelectChange('intakeSeasons', s)} />))}</div>
//             </div>

//             {/* --- Language Requirements --- */}
//             <div className="border-t pt-4 space-y-3">
//               <div className="flex justify-between items-center"><h3 className="text-lg font-medium">Language Requirements</h3><button type="button" onClick={addLanguageRequirement} className="text-sm text-indigo-600 font-medium">+ Add</button></div>
//               {programFormData.languageRequirements.map((r, i) => (<div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end p-2 border rounded-md"><Select label="Test" value={r.name} onChange={(e) => handleLanguageRequirementChange(i, 'name', e.target.value)}><option value="">Select</option><option>IELTS</option><option>TOEFL</option></Select><Input label="Min Score" type="number" step="0.1" value={r.minimumScore} onChange={(e) => handleLanguageRequirementChange(i, 'minimumScore', e.target.value)} /><button type="button" onClick={() => removeLanguageRequirement(i)} className="px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600">Remove</button></div>))}
//             </div>

//             {/* --- Academic Requirements --- */}
//             <div className="border-t pt-4 space-y-3">
//               <h3 className="text-lg font-medium">Academic Requirements</h3><Input label="Min GPA (5.0 scale)" name="minimumGPA" type="number" step="0.1" value={programFormData.academicRequirements.minimumGPA} onChange={(e) => handleNestedInputChange(e, 'academicRequirements')} />
//               <div className="flex justify-between items-center mt-2"><h4 className="font-medium">Required Tests</h4><button type="button" onClick={addTestRequirement} className="text-sm text-indigo-600 font-medium">+ Add</button></div>
//               {programFormData.academicRequirements.requiredTests.map((t, i) => (<div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end p-2 border rounded-md"><Input label="Test Name" value={t.name} onChange={(e) => handleTestRequirementChange(i, 'name', e.target.value)} /><Input label="Min Score" type="number" value={t.minimumScore} onChange={(e) => handleTestRequirementChange(i, 'minimumScore', e.target.value)} /><button type="button" onClick={() => removeTestRequirement(i)} className="px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600">Remove</button></div>))}
//             </div>

//             {/* --- Scholarships & Description --- */}
//             <div className="border-t pt-4 space-y-4">
//               <Checkbox label="Scholarships Available" name="scholarshipsAvailable" checked={programFormData.scholarshipsAvailable} onChange={handleInputChange} />
//               <TextArea label="Scholarship Details" name="scholarshipDetails" rows="3" value={programFormData.scholarshipDetails} onChange={handleInputChange} />
//               <TextArea label="Program Description" name="programDescription" rows="4" value={programFormData.programDescription} onChange={handleInputChange} />
//             </div>

//             {/* --- Action Buttons --- */}
//             <div className="flex justify-end pt-4 space-x-2 border-t mt-6">
//               <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">Cancel</button>
//               <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">{isEditing ? 'Update Program' : 'Add Program'}</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgramModal;



import React from 'react';

// Reusable form components
const Input = ({ label, name, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input name={name} {...props} className="w-full border p-2 rounded-md focus:ring-green-500 focus:border-green-500" />
  </div>
);

const TextArea = ({ label, name, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea name={name} {...props} className="w-full border p-2 rounded-md focus:ring-green-500 focus:border-green-500" />
  </div>
);

const Select = ({ label, name, children, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select name={name} {...props} className="w-full border p-2 rounded-md focus:ring-green-500 focus:border-green-500">{children}</select>
  </div>
);

const Checkbox = ({ name, label, ...props }) => (
  <label className="flex items-center space-x-2">
    <input type="checkbox" name={name} {...props} className="rounded text-green-600 focus:ring-green-500" />
    <span className="text-sm">{label}</span>
  </label>
);

const ProgramModal = ({ isOpen, onClose, onSubmit, programFormData, setProgramFormData, isEditing, universityName }) => {
  if (!isOpen) return null;

  // Format date for input field (convert from ISO to yyyy-MM-dd)
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.log(error);

      return '';
    }
  };

  // Parse date from input field (convert from yyyy-MM-dd to ISO)
  const parseDateFromInput = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toISOString();
    } catch (error) {
      console.log(error);

      return null;
    }
  };

  // --- Form Input Handlers ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProgramFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNestedInputChange = (e, parentField) => {
    const { name, value } = e.target;
    setProgramFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [name]: value
      }
    }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setProgramFormData(prev => ({
      ...prev,
      applicationDeadline: parseDateFromInput(value)
    }));
  };

  const handleMultiSelectChange = (field, value) => {
    const currentValues = programFormData[field] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    setProgramFormData(prev => ({ ...prev, [field]: newValues }));
  };

  // --- Dynamic Array Handlers ---
  const addLanguageRequirement = () => setProgramFormData(p => ({
    ...p,
    languageRequirements: [...p.languageRequirements, { name: '', minimumScore: '' }]
  }));

  const handleLanguageRequirementChange = (i, f, v) => setProgramFormData(p => ({
    ...p,
    languageRequirements: p.languageRequirements.map((r, idx) =>
      idx === i ? { ...r, [f]: v } : r
    )
  }));

  const removeLanguageRequirement = (i) => setProgramFormData(p => ({
    ...p,
    languageRequirements: p.languageRequirements.filter((_, idx) => idx !== i)
  }));

  const addTestRequirement = () => setProgramFormData(p => ({
    ...p,
    academicRequirements: {
      ...p.academicRequirements,
      requiredTests: [...p.academicRequirements.requiredTests, { name: '', minimumScore: '' }]
    }
  }));

  const handleTestRequirementChange = (i, f, v) => setProgramFormData(p => ({
    ...p,
    academicRequirements: {
      ...p.academicRequirements,
      requiredTests: p.academicRequirements.requiredTests.map((t, idx) =>
        idx === i ? { ...t, [f]: v } : t
      )
    }
  }));

  const removeTestRequirement = (i) => setProgramFormData(p => ({
    ...p,
    academicRequirements: {
      ...p.academicRequirements,
      requiredTests: p.academicRequirements.requiredTests.filter((_, idx) => idx !== i)
    }
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? 'Edit Program' : 'Add New Program'}
            {universityName && <span className="text-gray-500 font-normal"> to {universityName}</span>}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* --- Basic Information --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Program Name *"
                name="name"
                value={programFormData.name || ''}
                onChange={handleInputChange}
                required
              />
              <Select
                label="Level *"
                name="level"
                value={programFormData.level || 'Masters'}
                onChange={handleInputChange}
                required
              >
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
                <option value="Diploma">Diploma</option>
                <option value="Certificate">Certificate</option>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <Input
                label="Duration Value"
                name="value"
                type="number"
                step="0.5"
                value={programFormData.duration?.value || ''}
                onChange={(e) => handleNestedInputChange(e, 'duration')}
              />
              <Select
                label="Duration Unit"
                name="unit"
                value={programFormData.duration?.unit || 'years'}
                onChange={(e) => handleNestedInputChange(e, 'duration')}
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
                <option value="semesters">Semesters</option>
                <option value="weeks">Weeks</option>
              </Select>
            </div>

            {/* --- Fees --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4">
              <div className="space-y-2 p-3 border rounded-md">
                <h4 className="font-medium text-gray-800">Tuition Fee</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input
                    label="Amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    value={programFormData.tuitionFee?.amount || ''}
                    onChange={(e) => handleNestedInputChange(e, 'tuitionFee')}
                  />
                  <Select
                    label="Currency"
                    name="currency"
                    value={programFormData.tuitionFee?.currency || 'USD'}
                    onChange={(e) => handleNestedInputChange(e, 'tuitionFee')}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </Select>
                </div>
                <Select
                  label="Period"
                  name="period"
                  value={programFormData.tuitionFee?.period || 'per year'}
                  onChange={(e) => handleNestedInputChange(e, 'tuitionFee')}
                >
                  <option value="per year">Per Year</option>
                  <option value="per semester">Per Semester</option>
                </Select>
              </div>

              <div className="space-y-2 p-3 border rounded-md">
                <h4 className="font-medium text-gray-800">Application Fee</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input
                    label="Amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    value={programFormData.applicationFee?.amount || ''}
                    onChange={(e) => handleNestedInputChange(e, 'applicationFee')}
                  />
                  <Select
                    label="Currency"
                    name="currency"
                    value={programFormData.applicationFee?.currency || 'USD'}
                    onChange={(e) => handleNestedInputChange(e, 'applicationFee')}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </Select>
                </div>
              </div>
            </div>

            {/* --- Application Details --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Deadline
                </label>
                <input
                  type="date"
                  value={formatDateForInput(programFormData.applicationDeadline)}
                  onChange={handleDateChange}
                  className="w-full border p-2 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <Input
                label="Application Link"
                name="applicationLink"
                type="url"
                value={programFormData.applicationLink || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Intake Seasons</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Fall', 'Spring', 'Summer', 'Winter'].map(season => (
                  <Checkbox
                    key={season}
                    label={season}
                    checked={programFormData.intakeSeasons?.includes(season) || false}
                    onChange={() => handleMultiSelectChange('intakeSeasons', season)}
                  />
                ))}
              </div>
            </div>

            {/* --- Language Requirements --- */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Language Requirements</h3>
                <button
                  type="button"
                  onClick={addLanguageRequirement}
                  className="text-sm text-green-600 font-medium hover:text-green-800 transition-colors duration-200"
                >
                  + Add
                </button>
              </div>
              {programFormData.languageRequirements?.map((requirement, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end p-2 border rounded-md">
                  <Select
                    label="Test"
                    value={requirement.name || ''}
                    onChange={(e) => handleLanguageRequirementChange(index, 'name', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="IELTS">IELTS</option>
                    <option value="TOEFL">TOEFL</option>
                    <option value="PTE">PTE</option>
                    <option value="Duolingo">Duolingo</option>
                  </Select>
                  <Input
                    label="Min Score"
                    type="number"
                    step="0.1"
                    value={requirement.minimumScore || ''}
                    onChange={(e) => handleLanguageRequirementChange(index, 'minimumScore', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeLanguageRequirement(index)}
                    className="px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* --- Academic Requirements --- */}
            <div className="border-t pt-4 space-y-3">
              <h3 className="text-lg font-medium">Academic Requirements</h3>
              <Input
                label="Min GPA (5.0 scale)"
                name="minimumGPA"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={programFormData.academicRequirements?.minimumGPA || ''}
                onChange={(e) => handleNestedInputChange(e, 'academicRequirements')}
              />

              <div className="flex justify-between items-center mt-2">
                <h4 className="font-medium">Required Tests</h4>
                <button
                  type="button"
                  onClick={addTestRequirement}
                  className="text-sm text-green-600 font-medium hover:text-green-800 transition-colors duration-200"
                >
                  + Add
                </button>
              </div>

              {programFormData.academicRequirements?.requiredTests?.map((test, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end p-2 border rounded-md">
                  <Input
                    label="Test Name"
                    value={test.name || ''}
                    onChange={(e) => handleTestRequirementChange(index, 'name', e.target.value)}
                  />
                  <Input
                    label="Min Score"
                    type="number"
                    value={test.minimumScore || ''}
                    onChange={(e) => handleTestRequirementChange(index, 'minimumScore', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeTestRequirement(index)}
                    className="px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* --- Scholarships & Description --- */}
            <div className="border-t pt-4 space-y-4">
              <Checkbox
                label="Scholarships Available"
                name="scholarshipsAvailable"
                checked={programFormData.scholarshipsAvailable || false}
                onChange={handleInputChange}
              />
              <TextArea
                label="Scholarship Details"
                name="scholarshipDetails"
                rows="3"
                value={programFormData.scholarshipDetails || ''}
                onChange={handleInputChange}
              />
              <TextArea
                label="Program Description"
                name="programDescription"
                rows="4"
                value={programFormData.programDescription || ''}
                onChange={handleInputChange}
              />
            </div>

            {/* --- Action Buttons --- */}
            <div className="flex justify-end pt-4 space-x-2 border-t mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                {isEditing ? 'Update Program' : 'Add Program'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProgramModal;