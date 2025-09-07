import { useState } from 'react';
import { format, parseISO, isValid, isAfter } from 'date-fns';

const TravelHistoryTab = ({ data, onAdd, onRemove, onUpdate }) => {
  const [newEntry, setNewEntry] = useState({
    country: '',
    entryDate: '',
    exitDate: '',
    purpose: ''
  });
  const [editEntry, setEditEntry] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [sortBy, setSortBy] = useState('entryDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterCountry, setFilterCountry] = useState('');
  const [countrySuggestions, setCountrySuggestions] = useState([]);

  // Sample country list for autocomplete
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Japan', 'China', 'India', 'Brazil', 'Other'
  ];

  // Validate form inputs
  const validateForm = (entry) => {
    const newErrors = {};
    if (!entry.country) newErrors.country = 'Country is required';
    if (!entry.entryDate) newErrors.entryDate = 'Entry date is required';
    if (!entry.purpose) newErrors.purpose = 'Purpose is required';
    if (entry.purpose.length > 500) newErrors.purpose = 'Purpose must be 500 characters or less';
    if (entry.entryDate && !isValid(parseISO(entry.entryDate))) {
      newErrors.entryDate = 'Invalid entry date';
    }
    if (entry.exitDate && !isValid(parseISO(entry.exitDate))) {
      newErrors.exitDate = 'Invalid exit date';
    }
    if (entry.entryDate && entry.exitDate && !isAfter(parseISO(entry.exitDate), parseISO(entry.entryDate))) {
      newErrors.exitDate = 'Exit date must be after entry date';
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

  const handleChange = (field, value) => {
    const updatedEntry = { ...newEntry, [field]: value };
    if (field === 'country') {
      handleCountrySearch(value);
    }
    setNewEntry(updatedEntry);
    setErrors(validateForm(updatedEntry));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(newEntry);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (editEntry) {
      onUpdate({ ...newEntry, _id: editEntry._id });
      setEditEntry(null);
    } else {
      onAdd(newEntry);
    }

    setNewEntry({
      country: '',
      entryDate: '',
      exitDate: '',
      purpose: ''
    });
    setCountrySuggestions([]);
    setErrors({});
  };

  const handleEdit = (entry) => {
    setEditEntry(entry);
    setNewEntry({
      country: entry.country || '',
      entryDate: entry.entryDate || '',
      exitDate: entry.exitDate || '',
      purpose: entry.purpose || ''
    });
  };

  const handleCancelEdit = () => {
    setEditEntry(null);
    setNewEntry({
      country: '',
      entryDate: '',
      exitDate: '',
      purpose: ''
    });
    setCountrySuggestions([]);
    setErrors({});
  };

  const handleReset = () => {
    handleCancelEdit();
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

  // Sort and filter data
  const sortedAndFilteredData = [...data]
    .filter(entry => filterCountry ? entry.country.toLowerCase().includes(filterCountry.toLowerCase()) : true)
    .sort((a, b) => {
      const valueA = a[sortBy] || '';
      const valueB = b[sortBy] || '';
      if (sortBy === 'entryDate' || sortBy === 'exitDate') {
        return sortOrder === 'desc'
          ? new Date(valueB) - new Date(valueA)
          : new Date(valueA) - new Date(valueB);
      }
      return sortOrder === 'desc'
        ? valueB.localeCompare(valueA)
        : valueA.localeCompare(valueB);
    });

  return (
    <div className="  p-6 border rounded-md border-3 border-green-400">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          Travel History
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
            >
              <option value="entryDate">Entry Date</option>
              <option value="country">Country</option>
              <option value="purpose">Purpose</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              placeholder="Filter by country"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm w-full"
            />
            {filterCountry && (
              <button
                onClick={() => setFilterCountry('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Travel Entries List */}
      <div className="space-y-3 mb-8">
        {sortedAndFilteredData.length > 0 ? (
          sortedAndFilteredData.map((entry) => (
            <div
              key={entry._id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center transition-all duration-200 hover:shadow-sm hover: border-green-300"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="font-medium text-gray-800">{entry.country}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(entry.entryDate)} → {entry.exitDate ? formatDate(entry.exitDate) : 'Present'}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {entry.purpose}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(entry)}
                  className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Edit travel entry"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(entry._id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove travel entry"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 border border-dashed  border-green-300 rounded-xl bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 mt-3 font-medium">No travel history matches the current filter.</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or add a new entry.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this travel entry? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onRemove(showDeleteConfirm);
                  setShowDeleteConfirm(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Reset</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to reset the form? All unsaved changes will be lost.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Travel Entry */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <div className="p-1.5 bg-green-50 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          {editEntry ? 'Edit Travel Entry' : 'Add New Travel Entry'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newEntry.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className={`w-full border ${errors.country ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm`}
                required
                onFocus={() => handleCountrySearch(newEntry.country)}
                placeholder="Enter country name"
              />
              {countrySuggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                  {countrySuggestions.map((country, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 hover:bg-green-50 cursor-pointer text-sm"
                      onClick={() => {
                        handleChange('country', country);
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={newEntry.entryDate}
                onChange={(e) => handleChange('entryDate', e.target.value)}
                className={`w-full border ${errors.entryDate ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm`}
                required
                max={format(new Date(), 'yyyy-MM-dd')}
              />
              {errors.entryDate && <p className="text-red-500 text-xs mt-1">{errors.entryDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exit Date</label>
              <input
                type="date"
                value={newEntry.exitDate}
                onChange={(e) => handleChange('exitDate', e.target.value)}
                className={`w-full border ${errors.exitDate ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm`}
                min={newEntry.entryDate}
                placeholder="Select exit date"
              />
              {errors.exitDate && <p className="text-red-500 text-xs mt-1">{errors.exitDate}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purpose <span className="text-red-500">*</span>
              </label>
              <textarea
                value={newEntry.purpose}
                onChange={(e) => handleChange('purpose', e.target.value)}
                className={`w-full border ${errors.purpose ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm`}
                rows="3"
                required
                placeholder="Describe the purpose of your visit"
              />
              <div className="flex justify-between text-sm mt-1">
                <span>{errors.purpose && <span className="text-red-500">{errors.purpose}</span>}</span>
                <span className={`${newEntry.purpose.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                  {newEntry.purpose.length}/500
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {(editEntry || newEntry.country || newEntry.entryDate || newEntry.exitDate || newEntry.purpose) && (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                {editEntry ? 'Cancel Edit' : 'Reset Form'}
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {editEntry ? 'Update Travel Entry' : 'Add Travel Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravelHistoryTab;