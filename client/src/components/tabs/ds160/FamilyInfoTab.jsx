// client/src/pages/ds160/FamilyInfo.jsx
import React from 'react';

const FamilyInfoTab = ({ data, onChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Family Information</h2>

      {/* Father's Name */}
      <label className="block mb-3">
        Father's Surname
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={data?.fatherSurname || ''}
          onChange={e => onChange('fatherSurname', e.target.value)}
        />
      </label>
      <label className="block mb-3">
        Father's Given Name
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={data?.fatherGivenName || ''}
          onChange={e => onChange('fatherGivenName', e.target.value)}
        />
      </label>
      <label className="block mb-3">
        Father's Date of Birth
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={data?.fatherDob || ''}
          onChange={e => onChange('fatherDob', e.target.value)}
        />
      </label>

      {/* Mother's Name */}
      <label className="block mb-3">
        Mother's Surname
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={data?.motherSurname || ''}
          onChange={e => onChange('motherSurname', e.target.value)}
        />
      </label>
      <label className="block mb-3">
        Mother's Given Name
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={data?.motherGivenName || ''}
          onChange={e => onChange('motherGivenName', e.target.value)}
        />
      </label>
      <label className="block mb-3">
        Mother's Date of Birth
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={data?.motherDob || ''}
          onChange={e => onChange('motherDob', e.target.value)}
        />
      </label>

      {/* Spouse */}
      <label className="block mb-3">
        Spouse Full Name
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={data?.spouseFullName || ''}
          onChange={e => onChange('spouseFullName', e.target.value)}
        />
      </label>

      <label className="block mb-3">
        Spouse Date of Birth
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={data?.spouseDob || ''}
          onChange={e => onChange('spouseDob', e.target.value)}
        />
      </label>
    </div>
  );
};

export default FamilyInfoTab;
