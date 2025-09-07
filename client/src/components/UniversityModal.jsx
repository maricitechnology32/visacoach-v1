// import React from 'react';

// // Reusable form components can be defined here or imported from a shared UI file
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


// const UniversityModal = ({ isOpen, onClose, onSubmit, formData, setFormData, isEditing }) => {
//   if (!isOpen) return null;

//   // --- Form Input Handlers ---
//   // These handlers now live within the modal and operate on the state passed via props.
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//   };

//   const handleNestedInputChange = (e, parentField) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [parentField]: { ...prev[parentField], [name]: type === 'checkbox' ? checked : value }
//     }));
//   };

//   const handleDoubleNestedInputChange = (e, parentField, childField) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [parentField]: {
//         ...prev[parentField],
//         [childField]: { ...prev[parentField][childField], [name]: value }
//       }
//     }));
//   };

//   const handleArrayFieldChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value.split(',').map(item => item.trim()).filter(Boolean)
//     }));
//   };

//   const handleMultiSelectChange = (field, value) => {
//     const currentValues = formData[field] || [];
//     const newValues = currentValues.includes(value)
//       ? currentValues.filter(item => item !== value)
//       : [...currentValues, value];
//     setFormData(prev => ({ ...prev, [field]: newValues }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
//       <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col" onClick={e => e.stopPropagation()}>
//         <div className="flex justify-between items-center p-5 border-b">
//           <h2 className="text-xl font-semibold text-gray-800">{isEditing ? 'Edit University' : 'Add New University'}</h2>
//           <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto max-h-[75vh]">
//           <form onSubmit={onSubmit} className="space-y-6">
//             {/* --- Basic Info --- */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input label="Name *" name="name" value={formData.name} onChange={handleInputChange} required />
//               <Input label="Country *" name="country" value={formData.country} onChange={handleInputChange} required />
//               <Input label="City" name="city" value={formData.city} onChange={handleInputChange} />
//               <Input label="Website *" type="url" name="website" value={formData.website} onChange={handleInputChange} required />
//             </div>
//             <TextArea label="Description" name="description" rows="4" value={formData.description} onChange={handleInputChange} />

//             {/* --- University Details --- */}
//             <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <Input label="Established Year" type="number" name="establishedYear" value={formData.establishedYear} onChange={handleInputChange} min="1000" max={new Date().getFullYear()} />
//               <Select label="Type" name="type" value={formData.type} onChange={handleInputChange}>
//                 <option>Public</option><option>Private</option><option>Non-profit</option>
//               </Select>
//               <Select label="Campus Setting" name="campusSetting" value={formData.campusSetting} onChange={handleInputChange}>
//                 <option value="">Select Setting</option><option>Urban</option><option>Suburban</option><option>Rural</option><option>Online</option>
//               </Select>
//               <Input label="Total Students" type="number" name="totalStudents" value={formData.totalStudents} onChange={handleInputChange} />
//               <Input label="Int'l Students" type="number" name="internationalStudents" value={formData.internationalStudents} onChange={handleInputChange} />
//               <Input label="Student-Faculty Ratio" type="number" step="0.1" name="studentFacultyRatio" value={formData.studentFacultyRatio} onChange={handleInputChange} />
//               <Input label="Acceptance Rate (%)" type="number" name="acceptanceRate" min="0" max="100" value={formData.acceptanceRate} onChange={handleInputChange} />
//             </div>

//             {/* --- Partnership Details --- */}
//             <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Select label="Partnership Level" name="partnershipLevel" value={formData.partnershipLevel} onChange={handleInputChange}>
//                 <option>Standard</option><option>Premium</option><option>Strategic</option>
//               </Select>
//               <Input label="Partnership Start Date" type="date" name="partnershipStartDate" value={formData.partnershipStartDate} onChange={handleInputChange} />
//               <div className="flex items-end pb-2"><Checkbox label="Is Active" name="isActive" checked={formData.isActive} onChange={handleInputChange} /></div>
//             </div>

//             {/* --- Accreditation & Opportunities --- */}
//             <div className="border-t pt-4 space-y-4">
//               <Input label="Accreditation (comma-separated)" name="accreditation" value={formData.accreditation.join(', ')} onChange={handleArrayFieldChange} />
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Special Opportunities</label>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {['Exchange Programs', 'Dual Degrees', 'Research Collaboration', 'Faculty Exchange', 'Summer Programs', 'Internships'].map(opt => (
//                     <Checkbox key={opt} label={opt} checked={formData.specialOpportunities.includes(opt)} onChange={() => handleMultiSelectChange('specialOpportunities', opt)} />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* --- Housing & Visa --- */}
//             <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="flex items-center"><Checkbox label="On-Campus Housing" name="onCampus" checked={formData.housingOptions.onCampus} onChange={(e) => handleNestedInputChange(e, 'housingOptions')} /></div>
//               <div className="flex items-center"><Checkbox label="Off-Campus Assistance" name="offCampusAssistance" checked={formData.housingOptions.offCampusAssistance} onChange={(e) => handleNestedInputChange(e, 'housingOptions')} /></div>
//               <div className="flex items-center"><Checkbox label="Visa Support" name="visaSupport" checked={formData.visaSupport} onChange={handleInputChange} /></div>
//             </div>

//             {/* --- Contact Information --- */}
//             <div className="border-t pt-4 space-y-4">
//               <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
//               <div className="p-4 border rounded-md space-y-4">
//                 <h4 className="font-medium">International Office</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <Input label="Email" type="email" name="email" value={formData.contactInformation.internationalOffice.email} onChange={(e) => handleDoubleNestedInputChange(e, 'contactInformation', 'internationalOffice')} />
//                   <Input label="Phone" type="tel" name="phone" value={formData.contactInformation.internationalOffice.phone} onChange={(e) => handleDoubleNestedInputChange(e, 'contactInformation', 'internationalOffice')} />
//                 </div>
//               </div>
//               <div className="p-4 border rounded-md space-y-4">
//                 <h4 className="font-medium">Representative</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <Input label="Name" name="name" value={formData.contactInformation.representative.name} onChange={(e) => handleDoubleNestedInputChange(e, 'contactInformation', 'representative')} />
//                   <Input label="Email" type="email" name="email" value={formData.contactInformation.representative.email} onChange={(e) => handleDoubleNestedInputChange(e, 'contactInformation', 'representative')} />
//                   <Input label="Phone" type="tel" name="phone" value={formData.contactInformation.representative.phone} onChange={(e) => handleDoubleNestedInputChange(e, 'contactInformation', 'representative')} />
//                 </div>
//               </div>
//             </div>

//             {/* --- Media & Links --- */}
//             <div className="border-t pt-4 space-y-4">
//               <h3 className="text-lg font-semibold text-gray-800">Media & Links</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Input label="Facebook URL" name="facebook" type="url" value={formData.socialMedia.facebook} onChange={(e) => handleNestedInputChange(e, 'socialMedia')} />
//                 <Input label="Twitter URL" name="twitter" type="url" value={formData.socialMedia.twitter} onChange={(e) => handleNestedInputChange(e, 'socialMedia')} />
//                 <Input label="Instagram URL" name="instagram" type="url" value={formData.socialMedia.instagram} onChange={(e) => handleNestedInputChange(e, 'socialMedia')} />
//                 <Input label="LinkedIn URL" name="linkedin" type="url" value={formData.socialMedia.linkedin} onChange={(e) => handleNestedInputChange(e, 'socialMedia')} />
//                 <Input label="YouTube URL" name="youtube" type="url" value={formData.socialMedia.youtube} onChange={(e) => handleNestedInputChange(e, 'socialMedia')} />
//                 <Input label="Image URL" name="imageUrl" type="url" value={formData.imageUrl} onChange={handleInputChange} />
//                 <Input label="Brochure URL" name="brochureUrl" type="url" value={formData.brochureUrl} onChange={handleInputChange} />
//                 <Input label="Virtual Tour URL" name="virtualTourUrl" type="url" value={formData.virtualTourUrl} onChange={handleInputChange} />
//               </div>
//             </div>

//             {/* --- Application Process --- */}
//             <div className="border-t pt-4">
//               <TextArea label="Application Process" name="applicationProcess" rows="4" value={formData.applicationProcess} onChange={handleInputChange} />
//             </div>

//             {/* --- Action Buttons --- */}
//             <div className="flex justify-end pt-4 space-x-2 border-t mt-6">
//               <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">Cancel</button>
//               <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">{isEditing ? 'Update University' : 'Create University'}</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UniversityModal;


import React from 'react';

// Reusable form components can be defined here or imported from a shared UI file
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

const UniversityModal = ({ isOpen, onClose, onSubmit, formData, setFormData, isEditing }) => {
  if (!isOpen) return null;

  // Safe accessors for nested data
  const getNestedValue = (obj, path, defaultValue = '') => {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue), obj);
  };

  // --- Form Input Handlers ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleNestedInputChange = (e, parentField) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] || {}),
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleDoubleNestedInputChange = (e, parentField, childField) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] || {}),
        [childField]: {
          ...(prev[parentField]?.[childField] || {}),
          [name]: value
        }
      }
    }));
  };

  const handleArrayFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.split(',').map(item => item.trim()).filter(Boolean)
    }));
  };

  const handleMultiSelectChange = (field, value) => {
    const currentValues = formData[field] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    setFormData(prev => ({ ...prev, [field]: newValues }));
  };

  // Format date for input field
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

  // Handle date change
  const handleDateChange = (e, fieldName) => {
    const { value } = e.target;
    const dateValue = value ? new Date(value).toISOString() : null;
    setFormData(prev => ({ ...prev, [fieldName]: dateValue }));
  };

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{isEditing ? 'Edit University' : 'Add New University'}</h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* --- Basic Info --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Name *" name="name" value={formData.name || ''} onChange={handleInputChange} required />
              <Input label="Country *" name="country" value={formData.country || ''} onChange={handleInputChange} required />
              <Input label="City" name="city" value={formData.city || ''} onChange={handleInputChange} />
              <Input label="Website *" type="url" name="website" value={formData.website || ''} onChange={handleInputChange} required />
            </div>
            <TextArea label="Description" name="description" rows="4" value={formData.description || ''} onChange={handleInputChange} />

            {/* --- University Details --- */}
            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input label="Established Year" type="number" name="establishedYear" value={formData.establishedYear || ''} onChange={handleInputChange} min="1000" max={new Date().getFullYear()} />
              <Select label="Type" name="type" value={formData.type || 'Public'} onChange={handleInputChange}>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Non-profit">Non-profit</option>
              </Select>
              <Select label="Campus Setting" name="campusSetting" value={formData.campusSetting || ''} onChange={handleInputChange}>
                <option value="">Select Setting</option>
                <option value="Urban">Urban</option>
                <option value="Suburban">Suburban</option>
                <option value="Rural">Rural</option>
                <option value="Online">Online</option>
              </Select>
              <Input label="Total Students" type="number" name="totalStudents" value={formData.totalStudents || ''} onChange={handleInputChange} />
              <Input label="Int'l Students" type="number" name="internationalStudents" value={formData.internationalStudents || ''} onChange={handleInputChange} />
              <Input label="Student-Faculty Ratio" type="number" step="0.1" name="studentFacultyRatio" value={formData.studentFacultyRatio || ''} onChange={handleInputChange} />
              <Input label="Acceptance Rate (%)" type="number" name="acceptanceRate" min="0" max="100" value={formData.acceptanceRate || ''} onChange={handleInputChange} />
            </div>

            {/* --- Partnership Details --- */}
            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select label="Partnership Level" name="partnershipLevel" value={formData.partnershipLevel || 'Standard'} onChange={handleInputChange}>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Strategic">Strategic</option>
              </Select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partnership Start Date</label>
                <input
                  type="date"
                  value={formatDateForInput(formData.partnershipStartDate)}
                  onChange={(e) => handleDateChange(e, 'partnershipStartDate')}
                  className="w-full border p-2 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="flex items-end pb-2">
                <Checkbox label="Is Active" name="isActive" checked={formData.isActive || false} onChange={handleInputChange} />
              </div>
            </div>

            {/* --- Accreditation & Opportunities --- */}
            <div className="border-t pt-4 space-y-4">
              <Input
                label="Accreditation (comma-separated)"
                name="accreditation"
                value={(formData.accreditation || []).join(', ')}
                onChange={handleArrayFieldChange}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Opportunities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Exchange Programs', 'Dual Degrees', 'Research Collaboration', 'Faculty Exchange', 'Summer Programs', 'Internships'].map(opt => (
                    <Checkbox
                      key={opt}
                      label={opt}
                      checked={(formData.specialOpportunities || []).includes(opt)}
                      onChange={() => handleMultiSelectChange('specialOpportunities', opt)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* --- Housing & Visa --- */}
            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Checkbox
                  label="On-Campus Housing"
                  name="onCampus"
                  checked={formData.housingOptions?.onCampus || false}
                  onChange={(e) => handleNestedInputChange(e, 'housingOptions')}
                />
              </div>
              <div className="flex items-center">
                <Checkbox
                  label="Off-Campus Assistance"
                  name="offCampusAssistance"
                  checked={formData.housingOptions?.offCampusAssistance || false}
                  onChange={(e) => handleNestedInputChange(e, 'housingOptions')}
                />
              </div>
              <div className="flex items-center">
                <Checkbox
                  label="Visa Support"
                  name="visaSupport"
                  checked={formData.visaSupport || false}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* --- Contact Information --- */}
            <div className="border-t pt-4 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
              <div className="p-4 border rounded-md space-y-4">
                <h4 className="font-medium">International Office</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={getNestedValue(formData, 'contactInformation.internationalOffice.email')}
                    onChange={(e) => handleDoubleNestedInputChange(e, 'contactInformation', 'internationalOffice')}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={getNestedValue(formData, 'contactInformation.internationalOffice.phone')}
                    onChange={(e) => handleDoubleNestedInputChange(e, 'contactInformation', 'internationalOffice')}
                  />
                </div>
              </div>
              <div className="p-4 border rounded-md space-y-4">
                <h4 className="font-medium">Representative</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Name"
                    name="name"
                    value={getNestedValue(formData, 'contactInformation.representative.name')}
                    onChange={(e) => handleDoubleNestedInputChange(e, 'contactInformation', 'representative')}
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={getNestedValue(formData, 'contactInformation.representative.email')}
                    onChange={(e) => handleDoubleNestedInputChange(e, 'contactInformation', 'representative')}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={getNestedValue(formData, 'contactInformation.representative.phone')}
                    onChange={(e) => handleDoubleNestedInputChange(e, 'contactInformation', 'representative')}
                  />
                </div>
              </div>
            </div>

            {/* --- Media & Links --- */}
            <div className="border-t pt-4 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Media & Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Facebook URL"
                  name="facebook"
                  type="url"
                  value={formData.socialMedia?.facebook || ''}
                  onChange={(e) => handleNestedInputChange(e, 'socialMedia')}
                />
                <Input
                  label="Twitter URL"
                  name="twitter"
                  type="url"
                  value={formData.socialMedia?.twitter || ''}
                  onChange={(e) => handleNestedInputChange(e, 'socialMedia')}
                />
                <Input
                  label="Instagram URL"
                  name="instagram"
                  type="url"
                  value={formData.socialMedia?.instagram || ''}
                  onChange={(e) => handleNestedInputChange(e, 'socialMedia')}
                />
                <Input
                  label="LinkedIn URL"
                  name="linkedin"
                  type="url"
                  value={formData.socialMedia?.linkedin || ''}
                  onChange={(e) => handleNestedInputChange(e, 'socialMedia')}
                />
                <Input
                  label="YouTube URL"
                  name="youtube"
                  type="url"
                  value={formData.socialMedia?.youtube || ''}
                  onChange={(e) => handleNestedInputChange(e, 'socialMedia')}
                />
                <Input label="Image URL" name="imageUrl" type="url" value={formData.imageUrl || ''} onChange={handleInputChange} />
                <Input label="Brochure URL" name="brochureUrl" type="url" value={formData.brochureUrl || ''} onChange={handleInputChange} />
                <Input label="Virtual Tour URL" name="virtualTourUrl" type="url" value={formData.virtualTourUrl || ''} onChange={handleInputChange} />
              </div>
            </div>

            {/* --- Application Process --- */}
            <div className="border-t pt-4">
              <TextArea label="Application Process" name="applicationProcess" rows="4" value={formData.applicationProcess || ''} onChange={handleInputChange} />
            </div>

            {/* --- Action Buttons --- */}
            <div className="flex justify-end pt-4 space-x-2 border-t mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
                {isEditing ? 'Update University' : 'Create University'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UniversityModal;