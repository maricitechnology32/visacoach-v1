// import { useState } from 'react';
// import { format, parseISO, isValid, addDays } from 'date-fns';

// const DestinationInfoTab = ({ data, onSave, saving }) => {
//   const [destinations, setDestinations] = useState(data.length > 0 ? data : [{
//     country: '',
//     visaType: '',
//     purpose: '',
//     arrivalDate: '',
//     duration: '',
//     institution: '',
//     program: ''
//   }]);
//   const [errors, setErrors] = useState({});
//   const [showResetConfirm, setShowResetConfirm] = useState(false);
//   const [countrySuggestions, setCountrySuggestions] = useState([]);
//   const [activeDestination, setActiveDestination] = useState(0);

//   // Sample country list for autocomplete
//   const countries = [
//     'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
//     'France', 'Japan', 'China', 'India', 'Brazil', 'Other'
//   ];

//   // Validate form inputs
//   const validateForm = (destination) => {
//     const newErrors = {};
//     if (!destination.country) newErrors.country = 'Country is required';
//     if (!destination.visaType) newErrors.visaType = 'Visa type is required';
//     if (!destination.purpose) newErrors.purpose = 'Purpose is required';
//     if (destination.purpose.length > 500) newErrors.purpose = 'Purpose must be 500 characters or less';
//     if (destination.arrivalDate && !isValid(parseISO(destination.arrivalDate))) {
//       newErrors.arrivalDate = 'Invalid date format';
//     }
//     if (destination.duration && (isNaN(Number(destination.duration)) || Number(destination.duration) <= 0)) {
//       newErrors.duration = 'Duration must be a positive number';
//     }
//     return newErrors;
//   };

//   // Handle country autocomplete
//   const handleCountrySearch = (value) => {
//     const filtered = countries.filter(country =>
//       country.toLowerCase().includes(value.toLowerCase())
//     );
//     setCountrySuggestions(filtered);
//   };

//   const handleChange = (index, field, value) => {
//     const updatedDestinations = [...destinations];
//     updatedDestinations[index] = { ...updatedDestinations[index], [field]: value };

//     if (field === 'country') {
//       handleCountrySearch(value);
//     }

//     setDestinations(updatedDestinations);
//     setErrors(validateForm(updatedDestinations[index]));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formErrors = destinations.map(dest => validateForm(dest));

//     if (formErrors.some(err => Object.keys(err).length > 0)) {
//       setErrors(formErrors[activeDestination]);
//       return;
//     }

//     onSave(destinations);
//     setErrors({});
//   };

//   const addNewDestination = () => {
//     setDestinations([...destinations, {
//       country: '',
//       visaType: '',
//       purpose: '',
//       arrivalDate: '',
//       duration: '',
//       institution: '',
//       program: ''
//     }]);
//     setActiveDestination(destinations.length);
//   };

//   const removeDestination = (index) => {
//     const updatedDestinations = destinations.filter((_, i) => i !== index);
//     setDestinations(updatedDestinations);
//     setActiveDestination(Math.min(activeDestination, updatedDestinations.length - 1));
//   };

//   const handleReset = () => {
//     setDestinations([{
//       country: '',
//       visaType: '',
//       purpose: '',
//       arrivalDate: '',
//       duration: '',
//       institution: '',
//       program: ''
//     }]);
//     setActiveDestination(0);
//     setErrors({});
//     setShowResetConfirm(false);
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
//     <div className="bg-white p-8 rounded-md border border-3 border-green-200  ">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//           </svg>
//           Destination Information
//         </h2>
//         <button
//           onClick={addNewDestination}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//           </svg>
//           Add Destination
//         </button>
//       </div>

//       {/* Destination Tabs */}
//       {destinations.length > 1 && (
//         <div className="flex gap-2 mb-6 overflow-x-auto">
//           {destinations.map((_, index) => (
//             <div key={index} className="relative">
//               <button
//                 onClick={() => setActiveDestination(index)}
//                 className={`px-4 py-2 rounded-t-md ${activeDestination === index ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-green-500 hover:text-white transition-colors`}
//               >
//                 Destination {index + 1}
//               </button>
//               {destinations.length > 1 && (
//                 <button
//                   onClick={() => removeDestination(index)}
//                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700"
//                   title="Remove Destination"
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Form for Active Destination */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Country Applying To <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={destinations[activeDestination].country}
//               onChange={(e) => handleChange(activeDestination, 'country', e.target.value)}
//               className={`w-full border ${errors.country ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               required
//               onFocus={() => handleCountrySearch(destinations[activeDestination].country)}
//             />
//             {countrySuggestions.length > 0 && (
//               <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
//                 {countrySuggestions.map((country, idx) => (
//                   <div
//                     key={idx}
//                     className="px-3 py-2 hover:bg-green-100 cursor-pointer"
//                     onClick={() => {
//                       handleChange(activeDestination, 'country', country);
//                       setCountrySuggestions([]);
//                     }}
//                   >
//                     {country}
//                   </div>
//                 ))}
//               </div>
//             )}
//             {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Visa Type <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={destinations[activeDestination].visaType}
//               onChange={(e) => handleChange(activeDestination, 'visaType', e.target.value)}
//               className={`w-full border ${errors.visaType ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               required
//             >
//               <option value="">Select Visa Type</option>
//               <option value="STUDENT">Student</option>
//               <option value="WORK">Work</option>
//               <option value="TOURIST">Tourist</option>
//               <option value="BUSINESS">Business</option>
//               <option value="OTHER">Other</option>
//             </select>
//             {errors.visaType && <p className="text-red-500 text-xs mt-1">{errors.visaType}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Institution (if applicable)</label>
//             <input
//               type="text"
//               value={destinations[activeDestination].institution}
//               onChange={(e) => handleChange(activeDestination, 'institution', e.target.value)}
//               className="w-full border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="e.g., University of Example"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Program/Job Role (if applicable)</label>
//             <input
//               type="text"
//               value={destinations[activeDestination].program}
//               onChange={(e) => handleChange(activeDestination, 'program', e.target.value)}
//               className="w-full border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="e.g., Computer Science MS, Software Engineer"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Purpose of Visit <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               value={destinations[activeDestination].purpose}
//               onChange={(e) => handleChange(activeDestination, 'purpose', e.target.value)}
//               className={`w-full border ${errors.purpose ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               rows="4"
//               required
//             />
//             <div className="flex justify-between text-sm text-gray-500 mt-1">
//               <span>{errors.purpose && <span className="text-red-500">{errors.purpose}</span>}</span>
//               <span>{destinations[activeDestination].purpose.length}/500 characters</span>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Intended Arrival Date</label>
//             <input
//               type="date"
//               value={destinations[activeDestination].arrivalDate}
//               onChange={(e) => handleChange(activeDestination, 'arrivalDate', e.target.value)}
//               className={`w-full border ${errors.arrivalDate ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
//             />
//             {errors.arrivalDate && <p className="text-red-500 text-xs mt-1">{errors.arrivalDate}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Intended Duration of Stay (days)</label>
//             <input
//               type="number"
//               value={destinations[activeDestination].duration}
//               onChange={(e) => handleChange(activeDestination, 'duration', e.target.value)}
//               className={`w-full border ${errors.duration ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               min="1"
//             />
//             {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 pt-4">
//           <button
//             type="button"
//             onClick={() => setShowResetConfirm(true)}
//             className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//           >
//             Reset Form
//           </button>
//           <button
//             type="submit"
//             disabled={saving}
//             className={`px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:bg-green-400 flex items-center gap-2 ${saving ? 'cursor-not-allowed' : ''}`}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
//             </svg>
//             {saving ? 'Saving...' : 'Save Destinations'}
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

//       {/* Destination Summary */}
//       {destinations.length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Destination Summary</h3>
//           <div className="grid gap-4">
//             {destinations.map((dest, index) => (
//               <div key={index} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="font-medium text-gray-800">Destination {index + 1}: {dest.country || 'Not specified'}</p>
//                     <p className="text-sm text-gray-600">Visa: {dest.visaType || 'Not specified'}</p>
//                     <p className="text-sm text-gray-600">Arrival: {formatDate(dest.arrivalDate)}</p>
//                     <p className="text-sm text-gray-600">Duration: {dest.duration ? `${dest.duration} days` : 'Not specified'}</p>
//                     {dest.institution && <p className="text-sm text-gray-600">Institution: {dest.institution}</p>}
//                     {dest.program && <p className="text-sm text-gray-600">Program/Role: {dest.program}</p>}
//                   </div>
//                   <button
//                     onClick={() => setActiveDestination(index)}
//                     className="text-blue-600 hover:text-blue-800 text-sm"
//                   >
//                     Edit
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DestinationInfoTab;


import { useState } from 'react';
import { format, parseISO, isValid, addDays } from 'date-fns';

const DestinationInfoTab = ({ data, onSave, saving }) => {
  const [destinations, setDestinations] = useState(data.length > 0 ? data : [{
    country: '',
    visaType: '',
    purpose: '',
    arrivalDate: '',
    duration: '',
    institution: '',
    program: ''
  }]);
  const [errors, setErrors] = useState({});
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  const [activeDestination, setActiveDestination] = useState(0);

  // Sample country list for autocomplete
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Japan', 'China', 'India', 'Brazil', 'Other'
  ];

  // Validate form inputs
  const validateForm = (destination) => {
    const newErrors = {};
    if (!destination.country) newErrors.country = 'Country is required';
    if (!destination.visaType) newErrors.visaType = 'Visa type is required';
    if (!destination.purpose) newErrors.purpose = 'Purpose is required';
    if (destination.purpose.length > 500) newErrors.purpose = 'Purpose must be 500 characters or less';
    if (destination.arrivalDate && !isValid(parseISO(destination.arrivalDate))) {
      newErrors.arrivalDate = 'Invalid date format';
    }
    if (destination.duration && (isNaN(Number(destination.duration)) || Number(destination.duration) <= 0)) {
      newErrors.duration = 'Duration must be a positive number';
    }
    return newErrors;
  };

  // Handle country autocomplete
  const handleCountrySearch = (value) => {
    const filtered = countries.filter(country =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setCountrySuggestions(filtered);
  };

  const handleChange = (index, field, value) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = { ...updatedDestinations[index], [field]: value };

    if (field === 'country') {
      handleCountrySearch(value);
    }

    setDestinations(updatedDestinations);
    setErrors(validateForm(updatedDestinations[index]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = destinations.map(dest => validateForm(dest));

    if (formErrors.some(err => Object.keys(err).length > 0)) {
      setErrors(formErrors[activeDestination]);
      return;
    }

    onSave(destinations);
    setErrors({});
  };

  const addNewDestination = () => {
    setDestinations([...destinations, {
      country: '',
      visaType: '',
      purpose: '',
      arrivalDate: '',
      duration: '',
      institution: '',
      program: ''
    }]);
    setActiveDestination(destinations.length);
  };

  const removeDestination = (index) => {
    if (destinations.length <= 1) return;
    const updatedDestinations = destinations.filter((_, i) => i !== index);
    setDestinations(updatedDestinations);
    setActiveDestination(Math.min(activeDestination, updatedDestinations.length - 1));
  };

  const handleReset = () => {
    setDestinations([{
      country: '',
      visaType: '',
      purpose: '',
      arrivalDate: '',
      duration: '',
      institution: '',
      program: ''
    }]);
    setActiveDestination(0);
    setErrors({});
    setShowResetConfirm(false);
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

  return (
    <div className="bg-white p-8 rounded-md border border-green-200  border-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Destination Information</h2>
            <p className="text-sm text-gray-500">Add details about your intended destinations</p>
          </div>
        </div>
        <button
          onClick={addNewDestination}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Destination
        </button>
      </div>

      {/* Destination Tabs */}
      {destinations.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {destinations.map((_, index) => (
            <div key={index} className="relative flex-shrink-0">
              <button
                onClick={() => setActiveDestination(index)}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${activeDestination === index
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Destination {index + 1}
              </button>
              {destinations.length > 1 && (
                <button
                  onClick={() => removeDestination(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                  title="Remove Destination"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Form for Active Destination */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country Applying To <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={destinations[activeDestination].country}
              onChange={(e) => handleChange(activeDestination, 'country', e.target.value)}
              className={`w-full border ${errors.country ? 'border-red-500' : ' border-green-300'} rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
              required
              onFocus={() => handleCountrySearch(destinations[activeDestination].country)}
              placeholder="Enter country name"
            />
            {countrySuggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                {countrySuggestions.map((country, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-green-50 cursor-pointer transition-colors"
                    onClick={() => {
                      handleChange(activeDestination, 'country', country);
                      setCountrySuggestions([]);
                    }}
                  >
                    {country}
                  </div>
                ))}
              </div>
            )}
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visa Type <span className="text-red-500">*</span>
            </label>
            <select
              value={destinations[activeDestination].visaType}
              onChange={(e) => handleChange(activeDestination, 'visaType', e.target.value)}
              className={`w-full border ${errors.visaType ? 'border-red-500' : ' border-green-300'} rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
              required
            >
              <option value="">Select Visa Type</option>
              <option value="STUDENT">Student Visa</option>
              <option value="WORK">Work Visa</option>
              <option value="TOURIST">Tourist Visa</option>
              <option value="BUSINESS">Business Visa</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.visaType && <p className="text-red-500 text-xs mt-1">{errors.visaType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Institution (if applicable)</label>
            <input
              type="text"
              value={destinations[activeDestination].institution}
              onChange={(e) => handleChange(activeDestination, 'institution', e.target.value)}
              className="w-full border  border-green-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="e.g., University of Example"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program/Job Role (if applicable)</label>
            <input
              type="text"
              value={destinations[activeDestination].program}
              onChange={(e) => handleChange(activeDestination, 'program', e.target.value)}
              className="w-full border  border-green-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="e.g., Computer Science MS, Software Engineer"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purpose of Visit <span className="text-red-500">*</span>
            </label>
            <textarea
              value={destinations[activeDestination].purpose}
              onChange={(e) => handleChange(activeDestination, 'purpose', e.target.value)}
              className={`w-full border ${errors.purpose ? 'border-red-500' : ' border-green-300'} rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
              rows="4"
              required
              placeholder="Describe the purpose of your visit in detail"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>{errors.purpose && <span className="text-red-500">{errors.purpose}</span>}</span>
              <span className={`${destinations[activeDestination].purpose.length > 480 ? 'text-amber-500' : 'text-gray-500'}`}>
                {destinations[activeDestination].purpose.length}/500 characters
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intended Arrival Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={destinations[activeDestination].arrivalDate}
                onChange={(e) =>
                  handleChange(activeDestination, "arrivalDate", e.target.value)
                }
                className={`w-full border ${errors.arrivalDate ? "border-red-500 focus:ring-red-500 focus:border-red-500" : " border-green-300 focus:ring-green-500 focus:border-green-500"
                  } rounded-md px-4 py-2.5   text-gray-700 shadow-sm focus:outline-none transition-colors`}
                min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
              />
              
            </div>
            {errors.arrivalDate && (
              <p className="text-red-500 text-xs mt-1">{errors.arrivalDate}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Intended Duration of Stay (days)</label>
            <input
              type="number"
              value={destinations[activeDestination].duration}
              onChange={(e) => handleChange(activeDestination, 'duration', e.target.value)}
              className={`w-full border ${errors.duration ? 'border-red-500' : ' border-green-300'} rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
              min="1"
              placeholder="e.g., 90"
            />
            {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Form
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-2.5 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:bg-green-400 flex items-center justify-center gap-2 transition-colors ${saving ? 'cursor-not-allowed' : ''}`}
          >
            {saving ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Destinations
              </>
            )}
          </button>
        </div>
      </form>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Confirm Reset</h3>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to reset the form? All unsaved changes will be lost.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Destination Summary */}
      {destinations.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Destination Summary
          </h3>
          <div className="grid gap-4">
            {destinations.map((dest, index) => (
              <div key={index} className={`border ${activeDestination === index ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'} p-4 rounded-lg transition-colors`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-800">{dest.country || 'Not specified'}</span>
                      {dest.visaType && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {dest.visaType}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                      {dest.arrivalDate && (
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Arrival: {formatDate(dest.arrivalDate)}</span>
                        </div>
                      )}

                      {dest.duration && (
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Duration: {dest.duration} days</span>
                        </div>
                      )}

                      {dest.institution && (
                        <div className="flex items-center gap-1 sm:col-span-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>{dest.institution}</span>
                        </div>
                      )}

                      {dest.program && (
                        <div className="flex items-center gap-1 sm:col-span-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{dest.program}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveDestination(index)}
                    className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1 ml-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationInfoTab;