// client/src/pages/ds160/TravelInfo.jsx
import React from 'react';

const TravelInfoTab = ({ data, onChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Travel Information</h2>

      {/* Purpose of Trip */}
      <label className="block mb-3">
        Purpose of Trip
        <select
          className="w-full border p-2 rounded"
          value={data?.purposeOfTrip || ''}
          onChange={e => onChange('purposeOfTrip', e.target.value)}
        >
          <option value="">Select</option>
          <option value="tourism">Tourism</option>
          <option value="business">Business</option>
          <option value="study">Study</option>
          <option value="transit">Transit</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>
      </label>

      {/* Intended Arrival Date */}
      <label className="block mb-3">
        Intended Arrival Date
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={data?.intendedArrivalDate || ''}
          onChange={e => onChange('intendedArrivalDate', e.target.value)}
        />
      </label>

      {/* Intended Stay Duration */}
      <label className="block mb-3">
        Intended Stay Duration
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="e.g. 6 months"
          value={data?.intendedStayDuration || ''}
          onChange={e => onChange('intendedStayDuration', e.target.value)}
        />
      </label>

      {/* US Contact Person / Organization */}
      <label className="block mb-3">
        U.S. Contact (Person/Organization)
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={data?.usContact || ''}
          onChange={e => onChange('usContact', e.target.value)}
        />
      </label>

      {/* US Contact Address */}
      <label className="block mb-3">
        U.S. Contact Address
        <textarea
          className="w-full border p-2 rounded"
          value={data?.usContactAddress || ''}
          onChange={e => onChange('usContactAddress', e.target.value)}
        />
      </label>

      {/* US Contact Phone */}
      <label className="block mb-3">
        U.S. Contact Phone
        <input
          type="tel"
          className="w-full border p-2 rounded"
          value={data?.usContactPhone || ''}
          onChange={e => onChange('usContactPhone', e.target.value)}
        />
      </label>

      {/* Paying for Trip */}
      <label className="block mb-3">
        Who is Paying for Your Trip?
        <select
          className="w-full border p-2 rounded"
          value={data?.payingForTrip || ''}
          onChange={e => onChange('payingForTrip', e.target.value)}
        >
          <option value="">Select</option>
          <option value="self">Self</option>
          <option value="parents">Parents</option>
          <option value="sponsor">Sponsor</option>
          <option value="organization">Organization</option>
          <option value="other">Other</option>
        </select>
      </label>

      {/* Previous US Travel */}
      <label className="block mb-3">
        Have you previously traveled to the U.S.?
        <select
          className="w-full border p-2 rounded"
          value={data?.previousUSTravel || ''}
          onChange={e => onChange('previousUSTravel', e.target.value)}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
    </div>
  );
};

export default TravelInfoTab;
