// client/src/pages/ds160/WorkEducationInfo.jsx
import React from 'react';

const WorkEducationInfo = ({ data, onChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Work & Education Information</h2>

      {/* Primary Occupation */}
      <label className="block mb-3">
        Primary Occupation
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={data?.primaryOccupation || ''}
          onChange={e => onChange('primaryOccupation', e.target.value)}
        />
      </label>

      {/* Employer/School Name */}
      <label className="block mb-3">
        Current Employer/School Name
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={data?.presentEmployerOrSchoolName || ''}
          onChange={e => onChange('presentEmployerOrSchoolName', e.target.value)}
        />
      </label>

      {/* Employer/School Address */}
      <label className="block mb-3">
        Employer/School Address
        <textarea
          className="w-full border p-2 rounded"
          value={data?.presentEmployerOrSchoolAddress || ''}
          onChange={e => onChange('presentEmployerOrSchoolAddress', e.target.value)}
        />
      </label>

      {/* Monthly Salary */}
      <label className="block mb-3">
        Monthly Salary (optional)
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={data?.monthlySalary || ''}
          onChange={e => onChange('monthlySalary', e.target.value)}
        />
      </label>

      {/* Duties Description */}
      <label className="block mb-3">
        Duties Description
        <textarea
          className="w-full border p-2 rounded"
          value={data?.dutiesDescription || ''}
          onChange={e => onChange('dutiesDescription', e.target.value)}
        />
      </label>
    </div>
  );
};

export default WorkEducationInfo;
