// client/src/components/tabs/profile/PersonalInfoTab.jsx
import React from 'react';

const PersonalInfoTab = ({ data = {}, onChange }) => {
  const {
    surname = '',
    givenNames = '',
    fullNameNative = '',
    telecode = '',
    otherNamesUsed = false,
    otherNamesList = [],
    sex = '',
    maritalStatus = '',
    dateOfBirth = '',
    birthCity = '',
    birthState = '',
    birthCountry = '',
    nationality = '',
    otherNationality = false,
    otherNationalities = [],
    nationalIdNumber = '',
    usSocialSecurityNumber = '',
    usTaxpayerIdNumber = '',
  } = data;

  // Handle array input for other names / other nationalities
  const handleArrayChange = (field, index, value) => {
    const updated = [...(data[field] || [])];
    updated[index] = value;
    onChange(field, updated);
  };

  const addArrayItem = (field) => {
    onChange(field, [...(data[field] || []), '']);
  };

  const removeArrayItem = (field, index) => {
    const updated = [...(data[field] || [])];
    updated.splice(index, 1);
    onChange(field, updated);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

      <label className="block mb-3">
        Surname
        <input
          type="text"
          value={surname}
          onChange={e => onChange('surname', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-3">
        Given Names
        <input
          type="text"
          value={givenNames}
          onChange={e => onChange('givenNames', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-3">
        Full Name in Native Alphabet
        <input
          type="text"
          value={fullNameNative}
          onChange={e => onChange('fullNameNative', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-3">
        Telecode
        <input
          type="text"
          value={telecode}
          onChange={e => onChange('telecode', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-3 flex items-center gap-2">
        <input
          type="checkbox"
          checked={otherNamesUsed}
          onChange={e => onChange('otherNamesUsed', e.target.checked)}
        />
        Have you used other names?
      </label>

      {otherNamesUsed && (
        <div className="mb-3">
          <label className="block font-semibold">Other Names / Aliases</label>
          {otherNamesList.map((name, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={name}
                onChange={e => handleArrayChange('otherNamesList', idx, e.target.value)}
                className="w-full border p-2 rounded"
              />
              <button type="button" onClick={() => removeArrayItem('otherNamesList', idx)} className="px-2 bg-red-500 text-white rounded">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('otherNamesList')} className="px-3 py-1 bg-blue-600 text-white rounded">Add Name</button>
        </div>
      )}

      <label className="block mb-3">
        Sex
        <select value={sex} onChange={e => onChange('sex', e.target.value)} className="w-full border p-2 rounded">
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </label>

      <label className="block mb-3">
        Marital Status
        <input
          type="text"
          value={maritalStatus}
          onChange={e => onChange('maritalStatus', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-3">
        Date of Birth
        <input
          type="date"
          value={dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : ''}
          onChange={e => onChange('dateOfBirth', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-3">
        Birth City
        <input
          type="text"
          value={birthCity}
          onChange={e => onChange('birthCity', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-3">
        Birth State / Province
        <input
          type="text"
          value={birthState}
          onChange={e => onChange('birthState', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-3">
        Birth Country
        <input
          type="text"
          value={birthCountry}
          onChange={e => onChange('birthCountry', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-3">
        Nationality
        <input
          type="text"
          value={nationality}
          onChange={e => onChange('nationality', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-3 flex items-center gap-2">
        <input
          type="checkbox"
          checked={otherNationality}
          onChange={e => onChange('otherNationality', e.target.checked)}
        />
        Do you hold other nationalities?
      </label>

      {otherNationality && (
        <div className="mb-3">
          <label className="block font-semibold">Other Nationalities</label>
          {otherNationalities.map((nat, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={nat}
                onChange={e => handleArrayChange('otherNationalities', idx, e.target.value)}
                className="w-full border p-2 rounded"
              />
              <button type="button" onClick={() => removeArrayItem('otherNationalities', idx)} className="px-2 bg-red-500 text-white rounded">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('otherNationalities')} className="px-3 py-1 bg-blue-600 text-white rounded">Add Nationality</button>
        </div>
      )}

      <label className="block mb-3">
        National ID Number
        <input
          type="text"
          value={nationalIdNumber}
          onChange={e => onChange('nationalIdNumber', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-3">
        US Social Security Number
        <input
          type="text"
          value={usSocialSecurityNumber}
          onChange={e => onChange('usSocialSecurityNumber', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>

      <label className="block mb-3">
        US Taxpayer ID Number
        <input
          type="text"
          value={usTaxpayerIdNumber}
          onChange={e => onChange('usTaxpayerIdNumber', e.target.value)}
          className="w-full border p-2 rounded"
        />
      </label>
    </div>
  );
};

export default PersonalInfoTab;
