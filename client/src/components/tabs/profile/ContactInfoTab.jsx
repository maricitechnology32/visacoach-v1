import { useState } from 'react';

const ContactInfoTab = ({ data, onSave, saving }) => {
  const [formData, setFormData] = useState({
    email: data.email || '',
    phone: data.phone || { countryCode: '', number: '' },
    currentAddress: data.currentAddress || { street: '', city: '', state: '', postalCode: '', country: '' },
    sameAsPermanent: data.sameAsPermanent || false,
    permanentAddress: data.permanentAddress || { street: '', city: '', state: '', postalCode: '', country: '' },
    emergencyContact: data.emergencyContact || { fullName: '', relationship: '', phone: { countryCode: '', number: '' }, email: '' }
  });
  const [errors, setErrors] = useState({});
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  const [suggestionField, setSuggestionField] = useState(null);

  // Sample country list for autocomplete
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Japan', 'China', 'India', 'Brazil', 'Nepal', 'Other'
  ];

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.email.length > 100) newErrors.email = 'Email must be 100 characters or less';

    // Phone validation
    if (!formData.phone.countryCode) newErrors.phoneCountryCode = 'Country code is required';
    if (formData.phone.countryCode && !/^\+\d{1,3}$/.test(formData.phone.countryCode)) {
      newErrors.phoneCountryCode = 'Invalid country code (e.g., +977)';
    }
    if (!formData.phone.number) newErrors.phoneNumber = 'Phone number is required';
    if (formData.phone.number && !/^\d{7,15}$/.test(formData.phone.number)) {
      newErrors.phoneNumber = 'Phone number must be 7-15 digits';
    }

    // Current address validation
    if (!formData.currentAddress.street) newErrors.currentStreet = 'Street is required';
    if (formData.currentAddress.street.length > 100) newErrors.currentStreet = 'Street must be 100 characters or less';
    if (!formData.currentAddress.city) newErrors.currentCity = 'City is required';
    if (formData.currentAddress.city.length > 50) newErrors.currentCity = 'City must be 50 characters or less';
    if (!formData.currentAddress.state) newErrors.currentState = 'State/Province is required';
    if (formData.currentAddress.state.length > 50) newErrors.currentState = 'State/Province must be 50 characters or less';
    if (!formData.currentAddress.postalCode) newErrors.currentPostalCode = 'Postal code is required';
    if (formData.currentAddress.postalCode.length > 20) newErrors.currentPostalCode = 'Postal code must be 20 characters or less';
    if (!formData.currentAddress.country) newErrors.currentCountry = 'Country is required';
    if (formData.currentAddress.country.length > 50) newErrors.currentCountry = 'Country must be 50 characters or less';

    // Permanent address validation (if not same as current)
    if (!formData.sameAsPermanent) {
      if (!formData.permanentAddress.street) newErrors.permanentStreet = 'Street is required';
      if (formData.permanentAddress.street.length > 100) newErrors.permanentStreet = 'Street must be 100 characters or less';
      if (!formData.permanentAddress.city) newErrors.permanentCity = 'City is required';
      if (formData.permanentAddress.city.length > 50) newErrors.permanentCity = 'City must be 50 characters or less';
      if (!formData.permanentAddress.state) newErrors.permanentState = 'State/Province is required';
      if (formData.permanentAddress.state.length > 50) newErrors.permanentState = 'State/Province must be 50 characters or less';
      if (!formData.permanentAddress.postalCode) newErrors.permanentPostalCode = 'Postal code is required';
      if (formData.permanentAddress.postalCode.length > 20) newErrors.permanentPostalCode = 'Postal code must be 20 characters or less';
      if (!formData.permanentAddress.country) newErrors.permanentCountry = 'Country is required';
      if (formData.permanentAddress.country.length > 50) newErrors.permanentCountry = 'Country must be 50 characters or less';
    }

    // Emergency contact validation
    if (!formData.emergencyContact.fullName) newErrors.emergencyName = 'Full name is required';
    if (formData.emergencyContact.fullName.length > 100) newErrors.emergencyName = 'Full name must be 100 characters or less';
    if (!formData.emergencyContact.relationship) newErrors.emergencyRelationship = 'Relationship is required';
    if (formData.emergencyContact.relationship.length > 50) newErrors.emergencyRelationship = 'Relationship must be 50 characters or less';
    if (!formData.emergencyContact.phone.countryCode) newErrors.emergencyPhoneCountryCode = 'Country code is required';
    if (formData.emergencyContact.phone.countryCode && !/^\+\d{1,3}$/.test(formData.emergencyContact.phone.countryCode)) {
      newErrors.emergencyPhoneCountryCode = 'Invalid country code (e.g., +977)';
    }
    if (!formData.emergencyContact.phone.number) newErrors.emergencyPhoneNumber = 'Phone number is required';
    if (formData.emergencyContact.phone.number && !/^\d{7,15}$/.test(formData.emergencyContact.phone.number)) {
      newErrors.emergencyPhoneNumber = 'Phone number must be 7-15 digits';
    }
    if (formData.emergencyContact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emergencyContact.email)) {
      newErrors.emergencyEmail = 'Invalid email format';
    }
    if (formData.emergencyContact.email.length > 100) newErrors.emergencyEmail = 'Email must be 100 characters or less';

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
    let updatedData;
    if (field === 'phone' || field === 'emergencyContact') {
      updatedData = { ...formData, [field]: value };
    } else if (field === 'sameAsPermanent') {
      updatedData = {
        ...formData,
        sameAsPermanent: value,
        permanentAddress: value ? { ...formData.currentAddress } : formData.permanentAddress
      };
    } else {
      updatedData = { ...formData, [field]: value };
    }
    setFormData(updatedData);
    setErrors(validateForm());
  };

  const handleAddressChange = (addressType, field, value) => {
    const updatedData = {
      ...formData,
      [addressType]: {
        ...formData[addressType],
        [field]: value
      }
    };
    if (addressType === 'currentAddress' && formData.sameAsPermanent) {
      updatedData.permanentAddress = { ...updatedData.currentAddress };
    }
    if (field === 'country') {
      setSuggestionField(addressType);
      handleCountrySearch(value);
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
    setCountrySuggestions([]);
  };

  const handleReset = () => {
    setFormData({
      email: '',
      phone: { countryCode: '', number: '' },
      currentAddress: { street: '', city: '', state: '', postalCode: '', country: '' },
      sameAsPermanent: false,
      permanentAddress: { street: '', city: '', state: '', postalCode: '', country: '' },
      emergencyContact: { fullName: '', relationship: '', phone: { countryCode: '', number: '' }, email: '' }
    });
    setErrors({});
    setShowResetConfirm(false);
    setCountrySuggestions([]);
  };

  const isFormFilled = () => {
    return (
      formData.email ||
      formData.phone.countryCode ||
      formData.phone.number ||
      formData.currentAddress.street ||
      formData.currentAddress.city ||
      formData.currentAddress.state ||
      formData.currentAddress.postalCode ||
      formData.currentAddress.country ||
      formData.permanentAddress.street ||
      formData.permanentAddress.city ||
      formData.permanentAddress.state ||
      formData.permanentAddress.postalCode ||
      formData.permanentAddress.country ||
      formData.emergencyContact.fullName ||
      formData.emergencyContact.relationship ||
      formData.emergencyContact.phone.countryCode ||
      formData.emergencyContact.phone.number ||
      formData.emergencyContact.email
    );
  };

  return (
    <div className="border-3 p-8 rounded-md border border-green-200  ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4 0H7a2 2 0 01-2-2v-6a2 2 0 012-2h2m4 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m4 0h2" />
          </svg>
          Contact Information
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full border ${errors.email ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
              maxLength={100}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            <p className="text-sm text-gray-500 mt-1">{formData.email.length}/100 characters</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Country Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.phone.countryCode}
                onChange={(e) => handleChange('phone', { ...formData.phone, countryCode: e.target.value })}
                className={`w-full border ${errors.phoneCountryCode ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="+977"
                required
                maxLength={4}
              />
              {errors.phoneCountryCode && <p className="text-red-500 text-xs mt-1">{errors.phoneCountryCode}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone.number}
                onChange={(e) => handleChange('phone', { ...formData.phone, number: e.target.value })}
                className={`w-full border ${errors.phoneNumber ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
                maxLength={15}
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
          </div>
        </div>

        {/* Current Address */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.currentAddress.street}
                onChange={(e) => handleAddressChange('currentAddress', 'street', e.target.value)}
                className={`w-full border ${errors.currentStreet ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
                maxLength={100}
              />
              {errors.currentStreet && <p className="text-red-500 text-xs mt-1">{errors.currentStreet}</p>}
              <p className="text-sm text-gray-500 mt-1">{formData.currentAddress.street.length}/100 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.currentAddress.city}
                onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)}
                className={`w-full border ${errors.currentCity ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
                maxLength={50}
              />
              {errors.currentCity && <p className="text-red-500 text-xs mt-1">{errors.currentCity}</p>}
              <p className="text-sm text-gray-500 mt-1">{formData.currentAddress.city.length}/50 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State/Province <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.currentAddress.state}
                onChange={(e) => handleAddressChange('currentAddress', 'state', e.target.value)}
                className={`w-full border ${errors.currentState ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
                maxLength={50}
              />
              {errors.currentState && <p className="text-red-500 text-xs mt-1">{errors.currentState}</p>}
              <p className="text-sm text-gray-500 mt-1">{formData.currentAddress.state.length}/50 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.currentAddress.postalCode}
                onChange={(e) => handleAddressChange('currentAddress', 'postalCode', e.target.value)}
                className={`w-full border ${errors.currentPostalCode ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
                maxLength={20}
              />
              {errors.currentPostalCode && <p className="text-red-500 text-xs mt-1">{errors.currentPostalCode}</p>}
              <p className="text-sm text-gray-500 mt-1">{formData.currentAddress.postalCode.length}/20 characters</p>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.currentAddress.country}
                onChange={(e) => handleAddressChange('currentAddress', 'country', e.target.value)}
                className={`w-full border ${errors.currentCountry ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
                maxLength={50}
                onFocus={() => handleCountrySearch(formData.currentAddress.country)}
              />
              {suggestionField === 'currentAddress' && countrySuggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                  {countrySuggestions.map((country, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 hover:bg-green-100 cursor-pointer"
                      onClick={() => {
                        handleAddressChange('currentAddress', 'country', country);
                        setCountrySuggestions([]);
                        setSuggestionField(null);
                      }}
                    >
                      {country}
                    </div>
                  ))}
                </div>
              )}
              {errors.currentCountry && <p className="text-red-500 text-xs mt-1">{errors.currentCountry}</p>}
              <p className="text-sm text-gray-500 mt-1">{formData.currentAddress.country.length}/50 characters</p>
            </div>
          </div>
        </div>

        {/* Permanent Address Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="sameAsPermanent"
            checked={formData.sameAsPermanent}
            onChange={(e) => handleChange('sameAsPermanent', e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-500  border-green-300 rounded"
          />
          <label htmlFor="sameAsPermanent" className="ml-2 block text-sm text-gray-700">
            Permanent address is same as current address
          </label>
        </div>

        {/* Permanent Address */}
        {!formData.sameAsPermanent && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Permanent Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.permanentAddress.street}
                  onChange={(e) => handleAddressChange('permanentAddress', 'street', e.target.value)}
                  className={`w-full border ${errors.permanentStreet ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required
                  maxLength={100}
                />
                {errors.permanentStreet && <p className="text-red-500 text-xs mt-1">{errors.permanentStreet}</p>}
                <p className="text-sm text-gray-500 mt-1">{formData.permanentAddress.street.length}/100 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.permanentAddress.city}
                  onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)}
                  className={`w-full border ${errors.permanentCity ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required
                  maxLength={50}
                />
                {errors.permanentCity && <p className="text-red-500 text-xs mt-1">{errors.permanentCity}</p>}
                <p className="text-sm text-gray-500 mt-1">{formData.permanentAddress.city.length}/50 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.permanentAddress.state}
                  onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)}
                  className={`w-full border ${errors.permanentState ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required
                  maxLength={50}
                />
                {errors.permanentState && <p className="text-red-500 text-xs mt-1">{errors.permanentState}</p>}
                <p className="text-sm text-gray-500 mt-1">{formData.permanentAddress.state.length}/50 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.permanentAddress.postalCode}
                  onChange={(e) => handleAddressChange('permanentAddress', 'postalCode', e.target.value)}
                  className={`w-full border ${errors.permanentPostalCode ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required
                  maxLength={20}
                />
                {errors.permanentPostalCode && <p className="text-red-500 text-xs mt-1">{errors.permanentPostalCode}</p>}
                <p className="text-sm text-gray-500 mt-1">{formData.permanentAddress.postalCode.length}/20 characters</p>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.permanentAddress.country}
                  onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)}
                  className={`w-full border ${errors.permanentCountry ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required
                  maxLength={50}
                  onFocus={() => handleCountrySearch(formData.permanentAddress.country)}
                />
                {suggestionField === 'permanentAddress' && countrySuggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                    {countrySuggestions.map((country, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 hover:bg-green-100 cursor-pointer"
                        onClick={() => {
                          handleAddressChange('permanentAddress', 'country', country);
                          setCountrySuggestions([]);
                          setSuggestionField(null);
                        }}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                )}
                {errors.permanentCountry && <p className="text-red-500 text-xs mt-1">{errors.permanentCountry}</p>}
                <p className="text-sm text-gray-500 mt-1">{formData.permanentAddress.country.length}/50 characters</p>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.emergencyContact.fullName}
                onChange={(e) => handleChange('emergencyContact', { ...formData.emergencyContact, fullName: e.target.value })}
                className={`w-full border ${errors.emergencyName ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
                maxLength={100}
              />
              {errors.emergencyName && <p className="text-red-500 text-xs mt-1">{errors.emergencyName}</p>}
              <p className="text-sm text-gray-500 mt-1">{formData.emergencyContact.fullName.length}/100 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.emergencyContact.relationship}
                onChange={(e) => handleChange('emergencyContact', { ...formData.emergencyContact, relationship: e.target.value })}
                className={`w-full border ${errors.emergencyRelationship ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                required
                maxLength={50}
              />
              {errors.emergencyRelationship && <p className="text-red-500 text-xs mt-1">{errors.emergencyRelationship}</p>}
              <p className="text-sm text-gray-500 mt-1">{formData.emergencyContact.relationship.length}/50 characters</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Country Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact.phone.countryCode}
                  onChange={(e) => handleChange('emergencyContact', {
                    ...formData.emergencyContact,
                    phone: { ...formData.emergencyContact.phone, countryCode: e.target.value }
                  })}
                  className={`w-full border ${errors.emergencyPhoneCountryCode ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="+977"
                  required
                  maxLength={4}
                />
                {errors.emergencyPhoneCountryCode && <p className="text-red-500 text-xs mt-1">{errors.emergencyPhoneCountryCode}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContact.phone.number}
                  onChange={(e) => handleChange('emergencyContact', {
                    ...formData.emergencyContact,
                    phone: { ...formData.emergencyContact.phone, number: e.target.value }
                  })}
                  className={`w-full border ${errors.emergencyPhoneNumber ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required
                  maxLength={15}
                />
                {errors.emergencyPhoneNumber && <p className="text-red-500 text-xs mt-1">{errors.emergencyPhoneNumber}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.emergencyContact.email}
                onChange={(e) => handleChange('emergencyContact', { ...formData.emergencyContact, email: e.target.value })}
                className={`w-full border ${errors.emergencyEmail ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                maxLength={100}
              />
              {errors.emergencyEmail && <p className="text-red-500 text-xs mt-1">{errors.emergencyEmail}</p>}
              <p className="text-sm text-gray-500 mt-1">{formData.emergencyContact.email.length}/100 characters</p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6">
          {isFormFilled() && (
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
            {saving ? 'Saving...' : 'Save Contact Information'}
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
      {isFormFilled() && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Contact Information Summary
          </h3>

          <div className="border border-gray-200 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                    <p className="text-lg font-semibold text-gray-800">{formData.email || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone Number</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {formData.phone.countryCode || formData.phone.number
                        ? `${formData.phone.countryCode} ${formData.phone.number}`
                        : 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Emergency Contact</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {formData.emergencyContact.fullName || 'Not provided'}
                    </p>
                    {formData.emergencyContact.relationship && (
                      <p className="text-sm text-gray-600">({formData.emergencyContact.relationship})</p>
                    )}
                  </div>
                </div>

                {formData.emergencyContact.phone.countryCode || formData.emergencyContact.phone.number ? (
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Emergency Phone</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formData.emergencyContact.phone.countryCode} {formData.emergencyContact.phone.number}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 极速赛车开奖直播 极速赛车开奖结果 幸运飞艇开奖直播 幸运飞艇开奖结果 极速飞艇开奖直播 极速飞艇开奖结果 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 极速赛车开奖直播 极速赛车开奖结果 幸运飞艇开奖直播 幸运飞艇开奖结果 极速飞艇开奖直播 极速飞艇开奖结果 016 0z" />
                </svg>
                Address Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Address */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Current Address
                  </p>
                  {formData.currentAddress.street || formData.currentAddress.city || formData.currentAddress.state ||
                    formData.currentAddress.postalCode || formData.currentAddress.country ? (
                    <>
                      {formData.currentAddress.street && <p className="text-sm text-gray-800 font-medium">{formData.currentAddress.street}</p>}
                      <p className="text-sm text-gray-600">
                        {formData.currentAddress.city}{formData.currentAddress.city && formData.currentAddress.state ? ', ' : ''}
                        {formData.currentAddress.state}
                        {formData.currentAddress.postalCode ? ` ${formData.currentAddress.postalCode}` : ''}
                      </p>
                      {formData.currentAddress.country && <p className="text-sm text-gray-600">{formData.currentAddress.country}</p>}
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">Not provided</p>
                  )}
                </div>

                {/* Permanent Address */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 极速赛车开奖直播 极速赛车开奖结果 幸运飞艇开奖直播 幸运飞艇开奖结果 极速飞艇开奖直播 极速飞艇开奖结果 01 1h4a1 1 0 001-1v-4a1 1 0 011-1h3" />
                    </svg>
                    Permanent Address
                    {formData.sameAsPermanent && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">Same as current</span>
                    )}
                  </p>
                  {formData.sameAsPermanent ? (
                    <>
                      {formData.currentAddress.street && <p className="text-sm text-gray-800 font-medium">{formData.currentAddress.street}</p>}
                      <p className="text-sm text-gray-600">
                        {formData.currentAddress.city}{formData.currentAddress.city && formData.currentAddress.state ? ', ' : ''}
                        {formData.currentAddress.state}
                        {formData.currentAddress.postalCode ? ` ${formData.currentAddress.postalCode}` : ''}
                      </p>
                      {formData.currentAddress.country && <p className="text-sm text-gray-600">{formData.currentAddress.country}</p>}
                    </>
                  ) : (
                    <>
                      {formData.permanentAddress.street || formData.permanentAddress.city || formData.permanentAddress.state ||
                        formData.permanentAddress.postalCode || formData.permanentAddress.country ? (
                        <>
                          {formData.permanentAddress.street && <p className="text-sm text-gray-800 font-medium">{formData.permanentAddress.street}</p>}
                          <p className="text-sm text-gray-600">
                            {formData.permanentAddress.city}{formData.permanentAddress.city && formData.permanentAddress.state ? ', ' : ''}
                            {formData.permanentAddress.state}
                            {formData.permanentAddress.postalCode ? ` ${formData.permanentAddress.postalCode}` : ''}
                          </p>
                          {formData.permanentAddress.country && <p className="text-sm text-gray-600">{formData.permanentAddress.country}</p>}
                        </>
                      ) : (
                        <p className="text-sm text-gray-500">Not provided</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfoTab;