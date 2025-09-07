// import { useState } from 'react';
// import { format, parseISO, isValid, isAfter, isFuture } from 'date-fns';

// const PassportInfoTab = ({ data, onSave, saving }) => {
//   const [formData, setFormData] = useState({
//     passportNumber: data.passportNumber || '',
//     issuingCountry: data.issuingCountry || '',
//     issueDate: data.issueDate || '',
//     expiryDate: data.expiryDate || '',
//     placeOfIssue: data.placeOfIssue || ''
//   });
//   const [errors, setErrors] = useState({});
//   const [showResetConfirm, setShowResetConfirm] = useState(false);
//   const [countrySuggestions, setCountrySuggestions] = useState([]);

//   // Sample country list for autocomplete
//   const countries = [
//     'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
//     'France', 'Japan', 'China', 'India', 'Brazil', 'Other'
//   ];

//   // Validate form inputs
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.passportNumber) newErrors.passportNumber = 'Passport number is required';
//     if (formData.passportNumber.length > 20) newErrors.passportNumber = 'Passport number must be 20 characters or less';
//     if (!/^[A-Z0-9]+$/.test(formData.passportNumber)) newErrors.passportNumber = 'Passport number must contain only letters and numbers';
//     if (!formData.issuingCountry) newErrors.issuingCountry = 'Issuing country is required';
//     if (formData.issuingCountry.length > 50) newErrors.issuingCountry = 'Issuing country must be 50 characters or less';
//     if (!formData.issueDate) newErrors.issueDate = 'Issue date is required';
//     if (formData.issueDate && (!isValid(parseISO(formData.issueDate)) || isFuture(parseISO(formData.issueDate)))) {
//       newErrors.issueDate = 'Invalid or future issue date';
//     }
//     if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
//     if (formData.expiryDate && !isValid(parseISO(formData.expiryDate))) {
//       newErrors.expiryDate = 'Invalid expiry date';
//     }
//     if (formData.issueDate && formData.expiryDate && !isAfter(parseISO(formData.expiryDate), parseISO(formData.issueDate))) {
//       newErrors.expiryDate = 'Expiry date must be after issue date';
//     }
//     if (formData.placeOfIssue.length > 50) newErrors.placeOfIssue = 'Place of issue must be 50 characters or less';
//     return newErrors;
//   };

//   // Handle country autocomplete
//   const handleCountrySearch = (value) => {
//     const filtered = countries.filter(country =>
//       country.toLowerCase().includes(value.toLowerCase())
//     );
//     setCountrySuggestions(filtered);
//   };

//   const handleChange = (field, value) => {
//     const updatedData = { ...formData, [field]: value.toUpperCase().trim() };
//     setFormData(updatedData);
//     if (field === 'issuingCountry') {
//       handleCountrySearch(value);
//     }
//     setErrors(validateForm());
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();

//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     onSave(formData);
//     setErrors({});
//     setCountrySuggestions([]);
//   };

//   const handleReset = () => {
//     setFormData({
//       passportNumber: '',
//       issuingCountry: '',
//       issueDate: '',
//       expiryDate: '',
//       placeOfIssue: ''
//     });
//     setErrors({});
//     setShowResetConfirm(false);
//     setCountrySuggestions([]);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not specified';
//     try {
//       const date = parseISO(dateString);
//       return isValid(date) ? format(date, 'MMMM d, yyyy') : 'Invalid date';
//     } catch {
//       return 'Invalid date';
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//           </svg>
//           Passport Information
//         </h2>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Passport Number <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={formData.passportNumber}
//               onChange={(e) => handleChange('passportNumber', e.target.value)}
//               className={`w-full border ${errors.passportNumber ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               required
//               maxLength={20}
//             />
//             {errors.passportNumber && <p className="text-red-500 text-xs mt-1">{errors.passportNumber}</p>}
//             <p className="text-sm text-gray-500 mt-1">{formData.passportNumber.length}/20 characters</p>
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Issuing Country <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={formData.issuingCountry}
//               onChange={(e) => handleChange('issuingCountry', e.target.value)}
//               className={`w-full border ${errors.issuingCountry ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               required
//               maxLength={50}
//               onFocus={() => handleCountrySearch(formData.issuingCountry)}
//             />
//             {countrySuggestions.length > 0 && (
//               <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
//                 {countrySuggestions.map((country, idx) => (
//                   <div
//                     key={idx}
//                     className="px-3 py-2 hover:bg-green-100 cursor-pointer"
//                     onClick={() => {
//                       handleChange('issuingCountry', country);
//                       setCountrySuggestions([]);
//                     }}
//                   >
//                     {country}
//                   </div>
//                 ))}
//               </div>
//             )}
//             {errors.issuingCountry && <p className="text-red-500 text-xs mt-1">{errors.issuingCountry}</p>}
//             <p className="text-sm text-gray-500 mt-1">{formData.issuingCountry.length}/50 characters</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Issue Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               value={formData.issueDate}
//               onChange={(e) => handleChange('issueDate', e.target.value)}
//               className={`w-full border ${errors.issueDate ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               required
//               max={format(new Date(), 'yyyy-MM-dd')}
//             />
//             {errors.issueDate && <p className="text-red-500 text-xs mt-1">{errors.issueDate}</p>}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Expiry Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               value={formData.expiryDate}
//               onChange={(e) => handleChange('expiryDate', e.target.value)}
//               className={`w-full border ${errors.expiryDate ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               required
//               min={formData.issueDate}
//             />
//             {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Place of Issue</label>
//             <input
//               type="text"
//               value={formData.placeOfIssue}
//               onChange={(e) => handleChange('placeOfIssue', e.target.value)}
//               className={`w-full border ${errors.placeOfIssue ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               maxLength={50}
//             />
//             {errors.placeOfIssue && <p className="text-red-500 text-xs mt-1">{errors.placeOfIssue}</p>}
//             <p className="text-sm text-gray-500 mt-1">{formData.placeOfIssue.length}/50 characters</p>
//           </div>
//         </div>
//         <div className="flex justify-end gap-4 pt-4">
//           {(formData.passportNumber || formData.issuingCountry || formData.issueDate || formData.expiryDate || formData.placeOfIssue) && (
//             <button
//               type="button"
//               onClick={() => setShowResetConfirm(true)}
//               className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//             >
//               Reset Form
//             </button>
//           )}
//           <button
//             type="submit"
//             disabled={saving}
//             className={`px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:bg-green-400 flex items-center gap-2 ${saving ? 'cursor-not-allowed' : ''}`}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
//             </svg>
//             {saving ? 'Saving...' : 'Save Passport Information'}
//           </button>
//         </div>
//       </form>

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

//       {/* Summary Section */}
//       {(formData.passportNumber || formData.issuingCountry || formData.issueDate || formData.expiryDate || formData.placeOfIssue) && (
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Passport Information Summary</h3>
//           <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
//             {formData.passportNumber && <p className="text-sm text-gray-600">Passport Number: {formData.passportNumber}</p>}
//             {formData.issuingCountry && <p className="text-sm text-gray-600">Issuing Country: {formData.issuingCountry}</p>}
//             {formData.issueDate && <p className="text-sm text-gray-600">Issue Date: {formatDate(formData.issueDate)}</p>}
//             {formData.expiryDate && <p className="text-sm text-gray-600">Expiry Date: {formatDate(formData.expiryDate)}</p>}
//             {formData.placeOfIssue && <p className="text-sm text-gray-600">Place of Issue: {formData.placeOfIssue}</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PassportInfoTab;


import { useState } from 'react';
import { format, parseISO, isValid, isAfter, isFuture } from 'date-fns';

const PassportInfoTab = ({ data, onSave, saving }) => {
  const [formData, setFormData] = useState({
    passportNumber: data.passportNumber || '',
    issuingCountry: data.issuingCountry || '',
    issueDate: data.issueDate || '',
    expiryDate: data.expiryDate || '',
    placeOfIssue: data.placeOfIssue || ''
  });
  const [errors, setErrors] = useState({});
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [countrySuggestions, setCountrySuggestions] = useState([]);

  // Sample country list for autocomplete
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Japan', 'China', 'India', 'Brazil', 'Other'
  ];

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.passportNumber) newErrors.passportNumber = 'Passport number is required';
    if (formData.passportNumber.length > 20) newErrors.passportNumber = 'Passport number must be 20 characters or less';
    if (!/^[A-Z0-9]+$/.test(formData.passportNumber)) newErrors.passportNumber = 'Passport number must contain only letters and numbers';
    if (!formData.issuingCountry) newErrors.issuingCountry = 'Issuing country is required';
    if (formData.issuingCountry.length > 50) newErrors.issuingCountry = 'Issuing country must be 50 characters or less';
    if (!formData.issueDate) newErrors.issueDate = 'Issue date is required';
    if (formData.issueDate && (!isValid(parseISO(formData.issueDate)) || isFuture(parseISO(formData.issueDate)))) {
      newErrors.issueDate = 'Invalid or future issue date';
    }
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (formData.expiryDate && !isValid(parseISO(formData.expiryDate))) {
      newErrors.expiryDate = 'Invalid expiry date';
    }
    if (formData.issueDate && formData.expiryDate && !isAfter(parseISO(formData.expiryDate), parseISO(formData.issueDate))) {
      newErrors.expiryDate = 'Expiry date must be after issue date';
    }
    if (formData.placeOfIssue.length > 50) newErrors.placeOfIssue = 'Place of issue must be 50 characters or less';
    return newErrors;
  };

  // Handle country autocomplete
  const handleCountrySearch = (value) => {
    const filtered = countries.filter(country =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setCountrySuggestions(filtered);
  };

  const handleChange = (field, value) => {
    const updatedData = { ...formData, [field]: value.toUpperCase().trim() };
    setFormData(updatedData);
    if (field === 'issuingCountry') {
      handleCountrySearch(value);
    }
    setErrors(validateForm());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    onSave(formData);
    setErrors({});
    setCountrySuggestions([]);
  };

  const handleReset = () => {
    setFormData({
      passportNumber: '',
      issuingCountry: '',
      issueDate: '',
      expiryDate: '',
      placeOfIssue: ''
    });
    setErrors({});
    setShowResetConfirm(false);
    setCountrySuggestions([]);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'MMMM d, yyyy') : 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  };

  // Check if passport is expired or expiring soon
  const getExpiryStatus = () => {
    if (!formData.expiryDate) return null;

    try {
      const expiryDate = parseISO(formData.expiryDate);
      if (!isValid(expiryDate)) return null;

      const today = new Date();
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(today.getMonth() + 6);

      if (expiryDate < today) {
        return { status: 'expired', text: 'Expired' };
      } else if (expiryDate <= sixMonthsFromNow) {
        return { status: 'expiring', text: 'Expiring soon' };
      } else {
        return { status: 'valid', text: 'Valid' };
      }
    } catch {
      return null;
    }
  };

  const expiryStatus = getExpiryStatus();

  return (
    <div className="bg-white p-8 rounded-md border border-3 border-green-200  ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Passport Information
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passport Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.passportNumber}
              onChange={(e) => handleChange('passportNumber', e.target.value)}
              className={`w-full border ${errors.passportNumber ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
              maxLength={20}
            />
            {errors.passportNumber && <p className="text-red-500 text-xs mt-1">{errors.passportNumber}</p>}
            <p className="text-sm text-gray-500 mt-1">{formData.passportNumber.length}/20 characters</p>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issuing Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.issuingCountry}
              onChange={(e) => handleChange('issuingCountry', e.target.value)}
              className={`w-full border ${errors.issuingCountry ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
              maxLength={50}
              onFocus={() => handleCountrySearch(formData.issuingCountry)}
            />
            {countrySuggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                {countrySuggestions.map((country, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 hover:bg-green-100 cursor-pointer"
                    onClick={() => {
                      handleChange('issuingCountry', country);
                      setCountrySuggestions([]);
                    }}
                  >
                    {country}
                  </div>
                ))}
              </div>
            )}
            {errors.issuingCountry && <p className="text-red-500 text-xs mt-1">{errors.issuingCountry}</p>}
            <p className="text-sm text-gray-500 mt-1">{formData.issuingCountry.length}/50 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.issueDate}
              onChange={(e) => handleChange('issueDate', e.target.value)}
              className={`w-full border ${errors.issueDate ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
              max={format(new Date(), 'yyyy-MM-dd')}
            />
            {errors.issueDate && <p className="text-red-500 text-xs mt-1">{errors.issueDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              className={`w-full border ${errors.expiryDate ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
              min={formData.issueDate}
            />
            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Place of Issue</label>
            <input
              type="text"
              value={formData.placeOfIssue}
              onChange={(e) => handleChange('placeOfIssue', e.target.value)}
              className={`w-full border ${errors.placeOfIssue ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              maxLength={50}
            />
            {errors.placeOfIssue && <p className="text-red-500 text-xs mt-1">{errors.placeOfIssue}</p>}
            <p className="text-sm text-gray-500 mt-1">{formData.placeOfIssue.length}/50 characters</p>
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          {(formData.passportNumber || formData.issuingCountry || formData.issueDate || formData.expiryDate || formData.placeOfIssue) && (
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Reset Form
            </button>
          )}
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:bg-green-400 flex items-center gap-2 transition-colors ${saving ? 'cursor-not-allowed' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            {saving ? 'Saving...' : 'Save Passport Information'}
          </button>
        </div>
      </form>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Reset</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to reset the form? All unsaved changes will be lost.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Summary Section */}
      {(formData.passportNumber || formData.issuingCountry || formData.issueDate || formData.expiryDate || formData.placeOfIssue) && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Passport Information Summary
          </h3>

          <div className="border border-gray-200 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Passport Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Passport Number</p>
                    <p className="text-lg font-semibold text-gray-800">{formData.passportNumber || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Issuing Country</p>
                    <p className="text-lg font-semibold text-gray-800">{formData.issuingCountry || 'Not provided'}</p>
                  </div>
                </div>

                {formData.placeOfIssue && (
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Place of Issue</p>
                      <p className="text-lg font-semibold text-gray-800">{formData.placeOfIssue}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Date Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Issue Date</p>
                    <p className="text-lg font-semibold text-gray-800">{formatDate(formData.issueDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold text-gray-800">{formatDate(formData.expiryDate)}</p>
                      {expiryStatus && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${expiryStatus.status === 'expired' ? 'bg-red-100 text-red-800' :
                            expiryStatus.status === 'expiring' ? 'bg-amber-100 text-amber-800' :
                              'bg-green-100 text-green-800'
                          }`}>
                          {expiryStatus.text}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {formData.issueDate && formData.expiryDate && (
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Validity Period</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {(() => {
                          try {
                            const issue = parseISO(formData.issueDate);
                            const expiry = parseISO(formData.expiryDate);
                            if (isValid(issue) && isValid(expiry)) {
                              const years = expiry.getFullYear() - issue.getFullYear();
                              const months = expiry.getMonth() - issue.getMonth();
                              const totalMonths = years * 12 + months;
                              return `${totalMonths} months`;
                            }
                            return 'Invalid date range';
                          } catch {
                            return 'Invalid date range';
                          }
                        })()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Indicator */}
            {expiryStatus && (
              <div className={`mt-6 p-4 rounded-lg ${expiryStatus.status === 'expired' ? 'bg-red-50 border border-red-200' :
                  expiryStatus.status === 'expiring' ? 'bg-amber-50 border border-amber-200' :
                    'bg-green-50 border border-green-200'
                }`}>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${expiryStatus.status === 'expired' ? 'text-red-500' :
                      expiryStatus.status === 'expiring' ? 'text-amber-500' :
                        'text-green-500'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className={`text-sm font-medium ${expiryStatus.status === 'expired' ? 'text-red-800' :
                      expiryStatus.status === 'expiring' ? 'text-amber-800' :
                        'text-green-800'
                    }`}>
                    {expiryStatus.status === 'expired'
                      ? 'Your passport has expired. You need to renew it for international travel.'
                      : expiryStatus.status === 'expiring'
                        ? 'Your passport is expiring soon. Many countries require at least 6 months validity for entry.'
                        : 'Your passport is valid for international travel.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PassportInfoTab;