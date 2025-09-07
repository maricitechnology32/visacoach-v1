// client/src/pages/ds160/SevisInfo.jsx
import React from 'react';

const SevisInfo = ({ data, onChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">SEVIS Information</h2>

      {/* SEVIS ID */}
      <label className="block mb-3">
        SEVIS ID
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={data?.sevisId || ''}
          onChange={e => onChange('sevisId', e.target.value)}
        />
      </label>

      {/* School Name */}
      <label className="block mb-3">
        School Name
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={data?.schoolName || ''}
          onChange={e => onChange('schoolName', e.target.value)}
        />
      </label>

      {/* Course of Study */}
      <label className="block mb-3">
        Course of Study
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={data?.courseOfStudy || ''}
          onChange={e => onChange('courseOfStudy', e.target.value)}
        />
      </label>

      {/* School Address */}
      <label className="block mb-3">
        School Address
        <textarea
          className="w-full border p-2 rounded"
          value={data?.schoolAddress || ''}
          onChange={e => onChange('schoolAddress', e.target.value)}
        />
      </label>
    </div>
  );
};

export default SevisInfo;
