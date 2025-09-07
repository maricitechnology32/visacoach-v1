import { useState } from 'react';
import { format, parseISO, isValid, isFuture, subYears } from 'date-fns';

const PersonalInfoTab = ({ data, onSave, saving }) => {
  const [formData, setFormData] = useState({
    firstName: data.firstName || '',
    middleName: data.middleName || '',
    lastName: data.lastName || '',
    dateOfBirth: data.dateOfBirth || '',
    placeOfBirth: {
      city: data.placeOfBirth?.city || '',
      country: data.placeOfBirth?.country || ''
    },
    gender: data.gender || '',
    maritalStatus: data.maritalStatus || '',
    nationality: data.nationality || '',
    otherNationalities: data.otherNationalities || []
  });
  const [errors, setErrors] = useState({});
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  const [activeSuggestions, setActiveSuggestions] = useState(null);

  // Sample country list for autocomplete
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Spain',
    'Italy', 'South Korea', 'Russia', 'South Africa', 'Egypt', 'Other'
  ];

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (formData.firstName.length > 50) newErrors.firstName = 'First name must be 50 characters or less';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (formData.lastName.length > 50) newErrors.lastName = 'Last name must be 50 characters or less';
    if (formData.middleName.length > 50) newErrors.middleName = 'Middle name must be 50 characters or less';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (formData.dateOfBirth && (!isValid(parseISO(formData.dateOfBirth)) || isFuture(parseISO(formData.dateOfBirth)))) {
      newErrors.dateOfBirth = 'Invalid or future date of birth';
    }
    if (formData.dateOfBirth && isValid(parseISO(formData.dateOfBirth)) && isFuture(subYears(parseISO(formData.dateOfBirth), 16))) {
      newErrors.dateOfBirth = 'You must be at least 16 years old';
    }
    if (!formData.placeOfBirth.city) newErrors.city = 'City of birth is required';
    if (!formData.placeOfBirth.country) newErrors.country = 'Country of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (formData.otherNationalities.some(n => n.length > 50)) {
      newErrors.otherNationalities = 'Each nationality must be 50 characters or less';
    }
    return newErrors;
  };

  // Handle country autocomplete
  const handleCountrySearch = (value, field) => {
    const filtered = countries.filter(country =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setCountrySuggestions(filtered);
    setActiveSuggestions(field);
    return filtered;
  };

  const handleChange = (field, value, subField = null) => {
    let updatedData;
    if (subField) {
      updatedData = {
        ...formData,
        [field]: { ...formData[field], [subField]: value }
      };
      if (subField === 'country') {
        handleCountrySearch(value, 'placeOfBirth');
      }
    } else if (field === 'otherNationalities') {
      updatedData = {
        ...formData,
        [field]: value.split(',').map(n => n.trim()).filter(n => n)
      };
    } else {
      updatedData = { ...formData, [field]: value };
      if (field === 'nationality') {
        handleCountrySearch(value, 'nationality');
      }
    }

    setFormData(updatedData);
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
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      placeOfBirth: { city: '', country: '' },
      gender: '',
      maritalStatus: '',
      nationality: '',
      otherNationalities: []
    });
    setErrors({});
    setShowResetConfirm(false);
    setCountrySuggestions([]);
    setActiveSuggestions(null);
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
    <div className="border-3 p-8 rounded-sm border border-green-300 ">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-green-100 to-purple-100 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
          <p className="text-gray-500 mt-1">Update your personal details and identification information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full border ${errors.firstName ? 'border-red-400' : ' border-green-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
              required
              maxLength={50}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.firstName}
            </p>}
            <p className="text-xs text-gray-500">{formData.firstName.length}/50 characters</p>
          </div>

          {/* Middle Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Middle Name
            </label>
            <input
              type="text"
              value={formData.middleName}
              onChange={(e) => handleChange('middleName', e.target.value)}
              className="w-full border  border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              maxLength={50}
              placeholder="Enter your middle name"
            />
            {errors.middleName && <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.middleName}
            </p>}
            <p className="text-xs text-gray-500">{formData.middleName.length}/50 characters</p>
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`w-full border ${errors.lastName ? 'border-red-400' : ' border-green-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
              required
              maxLength={50}
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.lastName}
            </p>}
            <p className="text-xs text-gray-500">{formData.lastName.length}/50 characters</p>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              className={`w-full border ${errors.dateOfBirth ? 'border-red-400' : ' border-green-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
              required
              max={format(new Date(), 'yyyy-MM-dd')}
            />
            {errors.dateOfBirth && <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.dateOfBirth}
            </p>}
          </div>

          {/* Place of Birth - City */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Place of Birth (City) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.placeOfBirth.city}
              onChange={(e) => handleChange('placeOfBirth', e.target.value, 'city')}
              className={`w-full border ${errors.city ? 'border-red-400' : ' border-green-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
              required
              maxLength={50}
              placeholder="Enter city of birth"
            />
            {errors.city && <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.city}
            </p>}
            <p className="text-xs text-gray-500">{formData.placeOfBirth.city.length}/50 characters</p>
          </div>

          {/* Place of Birth - Country */}
          <div className="space-y-2 relative">
            <label className="block text-sm font-medium text-gray-700">
              Place of Birth (Country) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.placeOfBirth.country}
              onChange={(e) => handleChange('placeOfBirth', e.target.value, 'country')}
              className={`w-full border ${errors.country ? 'border-red-400' : ' border-green-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
              required
              maxLength={50}
              placeholder="Enter country of birth"
              onFocus={() => handleCountrySearch(formData.placeOfBirth.country, 'placeOfBirth')}
            />
            {activeSuggestions === 'placeOfBirth' && countrySuggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                {countrySuggestions.map((country, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-green-50 cursor-pointer transition-colors"
                    onClick={() => {
                      handleChange('placeOfBirth', country, 'country');
                      setCountrySuggestions([]);
                      setActiveSuggestions(null);
                    }}
                  >
                    {country}
                  </div>
                ))}
              </div>
            )}
            {errors.country && <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.country}
            </p>}
            <p className="text-xs text-gray-500">{formData.placeOfBirth.country.length}/50 characters</p>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className={`w-full border ${errors.gender ? 'border-red-400' : ' border-green-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors appearance-none bg-white`}
              required
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
              <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.gender}
            </p>}
          </div>

          {/* Marital Status */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Marital Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.maritalStatus}
              onChange={(e) => handleChange('maritalStatus', e.target.value)}
              className={`w-full border ${errors.maritalStatus ? 'border-red-400' : ' border-green-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors appearance-none bg-white`}
              required
            >
              <option value="">Select Status</option>
              <option value="SINGLE">Single</option>
              <option value="MARRIED">Married</option>
              <option value="DIVORCED">Divorced</option>
              <option value="WIDOWED">Widowed</option>
              <option value="SEPARATED">Separated</option>
            </select>
            {errors.maritalStatus && <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.maritalStatus}
            </p>}
          </div>

          {/* Nationality */}
          <div className="space-y-2 relative">
            <label className="block text-sm font-medium text-gray-700">
              Nationality <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.nationality}
              onChange={(e) => handleChange('nationality', e.target.value)}
              className={`w-full border ${errors.nationality ? 'border-red-400' : ' border-green-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
              required
              maxLength={50}
              placeholder="Enter your nationality"
              onFocus={() => handleCountrySearch(formData.nationality, 'nationality')}
            />
            {activeSuggestions === 'nationality' && countrySuggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                {countrySuggestions.map((country, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-green-50 cursor-pointer transition-colors"
                    onClick={() => {
                      handleChange('nationality', country);
                      setCountrySuggestions([]);
                      setActiveSuggestions(null);
                    }}
                  >
                    {country}
                  </div>
                ))}
              </div>
            )}
            {errors.nationality && <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.nationality}
            </p>}
            <p className="text-xs text-gray-500">{formData.nationality.length}/50 characters</p>
          </div>

          {/* Other Nationalities */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Other Nationalities
            </label>
            <input
              type="text"
              value={formData.otherNationalities.join(', ')}
              onChange={(e) => handleChange('otherNationalities', e.target.value)}
              className={`w-full border ${errors.otherNationalities ? 'border-red-400' : ' border-green-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
              placeholder="Separate with commas (e.g., Canadian, British)"
            />
            {errors.otherNationalities && <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.otherNationalities}
            </p>}
            <p className="text-xs text-gray-500">Enter multiple nationalities separated by commas</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Form
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-3 bg-gradient-to-r from-green-600 to-green-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-700 transition-all flex items-center gap-2 ${saving ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {saving ? 'Saving...' : 'Save Information'}
          </button>
        </div>
      </form>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Confirm Reset</h3>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to reset the form? All unsaved changes will be lost.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Section */}
      {(formData.firstName || formData.lastName || formData.dateOfBirth || formData.placeOfBirth.city || formData.placeOfBirth.country || formData.gender || formData.maritalStatus || formData.nationality || formData.otherNationalities.length > 0) && (
        <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-100">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Information Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.firstName && (
              <div>
                <p className="text-xs text-green-600 font-medium">First Name</p>
                <p className="text-sm text-gray-800">{formData.firstName}</p>
              </div>
            )}
            {formData.middleName && (
              <div>
                <p className="text-xs text-green-600 font-medium">Middle Name</p>
                <p className="text-sm text-gray-800">{formData.middleName}</p>
              </div>
            )}
            {formData.lastName && (
              <div>
                <p className="text-xs text-green-600 font-medium">Last Name</p>
                <p className="text-sm text-gray-800">{formData.lastName}</p>
              </div>
            )}
            {formData.dateOfBirth && (
              <div>
                <p className="text-xs text-green-600 font-medium">Date of Birth</p>
                <p className="text-sm text-gray-800">{formatDate(formData.dateOfBirth)}</p>
              </div>
            )}
            {(formData.placeOfBirth.city || formData.placeOfBirth.country) && (
              <div>
                <p className="text-xs text-green-600 font-medium">Place of Birth</p>
                <p className="text-sm text-gray-800">{formData.placeOfBirth.city || 'Not specified'}, {formData.placeOfBirth.country || 'Not specified'}</p>
              </div>
            )}
            {formData.gender && (
              <div>
                <p className="text-xs text-green-600 font-medium">Gender</p>
                <p className="text-sm text-gray-800">{formData.gender}</p>
              </div>
            )}
            {formData.maritalStatus && (
              <div>
                <p className="text-xs text-green-600 font-medium">Marital Status</p>
                <p className="text-sm text-gray-800">{formData.maritalStatus}</p>
              </div>
            )}
            {formData.nationality && (
              <div>
                <p className="text-xs text-green-600 font-medium">Nationality</p>
                <p className="text-sm text-gray-800">{formData.nationality}</p>
              </div>
            )}
            {formData.otherNationalities.length > 0 && (
              <div className="md:col-span-2">
                <p className="text-xs text-green-600 font-medium">Other Nationalities</p>
                <p className="text-sm text-gray-800">{formData.otherNationalities.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoTab;