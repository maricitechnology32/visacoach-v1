import { useState } from 'react';
import { format, parseISO, isValid, isAfter, isFuture } from 'date-fns';
import ReactMarkdown from 'react-markdown';

const EmploymentTab = ({ data, onAdd, onRemove, onUpdate }) => {
  const [newEntry, setNewEntry] = useState({
    employer: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    isCurrent: false
  });
  const [editEntry, setEditEntry] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [sortBy, setSortBy] = useState('startDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterEmployer, setFilterEmployer] = useState('');

  // Validate form inputs
  const validateForm = (entry) => {
    const newErrors = {};
    if (!entry.employer) newErrors.employer = 'Employer is required';
    if (entry.employer.length > 100) newErrors.employer = 'Employer must be 100 characters or less';
    if (!entry.position) newErrors.position = 'Position is required';
    if (entry.position.length > 50) newErrors.position = 'Position must be 50 characters or less';
    if (!entry.startDate) newErrors.startDate = 'Start date is required';
    if (entry.startDate && (!isValid(parseISO(entry.startDate)) || isFuture(parseISO(entry.startDate)))) {
      newErrors.startDate = 'Invalid or future start date';
    }
    if (!entry.isCurrent && entry.endDate && (!isValid(parseISO(entry.endDate)) || isFuture(parseISO(entry.endDate)))) {
      newErrors.endDate = 'Invalid or future end date';
    }
    if (!entry.isCurrent && entry.endDate && entry.startDate && !isAfter(parseISO(entry.endDate), parseISO(entry.startDate))) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (entry.description.length > 1000) newErrors.description = 'Description must be 1000 characters or less';
    return newErrors;
  };

  const handleChange = (field, value) => {
    const updatedEntry = {
      ...newEntry,
      [field]: value,
      ...(field === 'isCurrent' && value ? { endDate: '' } : {})
    };
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

    const processedEntry = {
      ...newEntry,
      endDate: newEntry.isCurrent ? null : newEntry.endDate
    };

    if (editEntry) {
      onUpdate({ ...processedEntry, _id: editEntry._id });
      setEditEntry(null);
    } else {
      onAdd(processedEntry);
    }

    setNewEntry({
      employer: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrent: false
    });
    setErrors({});
  };

  const handleEdit = (entry) => {
    setEditEntry(entry);
    setNewEntry({
      employer: entry.employer || '',
      position: entry.position || '',
      startDate: entry.startDate || '',
      endDate: entry.endDate || '',
      description: entry.description || '',
      isCurrent: !entry.endDate
    });
  };

  const handleCancelEdit = () => {
    setEditEntry(null);
    setNewEntry({
      employer: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrent: false
    });
    setErrors({});
  };

  const handleReset = () => {
    handleCancelEdit();
    setShowResetConfirm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'MMM yyyy') : 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  };

  // Sort and filter data
  const sortedAndFilteredData = [...data]
    .filter(entry => filterEmployer ? entry.employer.toLowerCase().includes(filterEmployer.toLowerCase()) : true)
    .sort((a, b) => {
      const valueA = a[sortBy] || '';
      const valueB = b[sortBy] || '';
      if (sortBy === 'startDate' || sortBy === 'endDate') {
        return sortOrder === 'desc'
          ? new Date(valueB || '9999-12-31') - new Date(valueA || '9999-12-31')
          : new Date(valueA || '9999-12-31') - new Date(valueB || '9999-12-31');
      }
      return sortOrder === 'desc'
        ? valueB.localeCompare(valueA)
        : valueA.localeCompare(valueB);
    });

  return (
    <div className="bg-white p-8 rounded-md border border-3 border-green-300">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Employment History
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border  border-green-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="startDate">Start Date</option>
              <option value="employer">Employer</option>
              <option value="position">Position</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border  border-green-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
          <input
            type="text"
            value={filterEmployer}
            onChange={(e) => setFilterEmployer(e.target.value)}
            placeholder="Filter by employer"
            className="border  border-green-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      {/* Employment Entries List */}
      <div className="space-y-4 mb-8">
        {sortedAndFilteredData.length > 0 ? (
          sortedAndFilteredData.map((entry) => (
            <div
              key={entry._id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-5 flex justify-between items-start transition-colors duration-200 hover:bg-gray-100"
            >
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {entry.position}
                  </h3>
                  <span className="hidden sm:block text-gray-400">•</span>
                  <p className="text-green-700 font-medium">
                    {entry.employer}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
                </p>
                {entry.description && (
                  <div className="mt-2 text-gray-700 text-sm prose prose-sm max-w-none">
                    <ReactMarkdown>{entry.description}</ReactMarkdown>
                  </div>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(entry)}
                  className="text-gray-500 hover:text-green-600 transition-colors p-1 rounded-md hover:bg-green-50"
                  title="Edit employment entry"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(entry._id)}
                  className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
                  title="Remove employment entry"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border border-dashed  border-green-300 rounded-lg bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 mt-3">No employment history matches the current filter.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this employment entry? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onRemove(showDeleteConfirm);
                  setShowDeleteConfirm(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
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
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Reset</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to reset the form? All unsaved changes will be lost.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Employment Form */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {editEntry ? 'Edit Employment Entry' : 'Add New Employment'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newEntry.employer}
                onChange={(e) => handleChange('employer', e.target.value)}
                className={`w-full border ${errors.employer ? 'border-red-500' : ' border-green-300'} rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                required
                maxLength={100}
              />
              {errors.employer && <p className="text-red-500 text-xs mt-1.5">{errors.employer}</p>}
              <p className="text-xs text-gray-500 mt-1.5">{newEntry.employer.length}/100 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newEntry.position}
                onChange={(e) => handleChange('position', e.target.value)}
                className={`w-full border ${errors.position ? 'border-red-500' : ' border-green-300'} rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                required
                maxLength={50}
              />
              {errors.position && <p className="text-red-500 text-xs mt-1.5">{errors.position}</p>}
              <p className="text-xs text-gray-500 mt-1.5">{newEntry.position.length}/50 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={newEntry.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className={`w-full border ${errors.startDate ? 'border-red-500' : ' border-green-300'} rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                required
                max={format(new Date(), 'yyyy-MM-dd')}
              />
              {errors.startDate && <p className="text-red-500 text-xs mt-1.5">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={newEntry.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className={`w-full border ${errors.endDate ? 'border-red-500' : ' border-green-300'} rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                min={newEntry.startDate}
                disabled={newEntry.isCurrent}
              />
              {errors.endDate && <p className="text-red-500 text-xs mt-1.5">{errors.endDate}</p>}
              <div className="flex items-center mt-3">
                <input
                  type="checkbox"
                  id="currentJob"
                  checked={newEntry.isCurrent}
                  onChange={(e) => handleChange('isCurrent', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500  border-green-300 rounded"
                />
                <label htmlFor="currentJob" className="ml-2 block text-sm text-gray-700">
                  I currently work here
                </label>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newEntry.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className={`w-full border ${errors.description ? 'border-red-500' : ' border-green-300'} rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                rows="4"
                placeholder="Describe your responsibilities and achievements (supports Markdown)..."
                maxLength={1000}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1.5">{errors.description}</p>}
              <p className="text-xs text-gray-500 mt-1.5">{newEntry.description.length}/1000 characters</p>
              {newEntry.description && (
                <div className="mt-3 p-4 border border-gray-200 rounded-md bg-gray-50">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="prose prose-sm max-w-none text-gray-600">
                    <ReactMarkdown>{newEntry.description}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            {(editEntry || newEntry.employer || newEntry.position || newEntry.startDate || newEntry.endDate || newEntry.description) && (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
              >
                {editEntry ? 'Cancel Edit' : 'Reset Form'}
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 flex items-center gap-2 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {editEntry ? 'Update Employment' : 'Add Employment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmploymentTab;