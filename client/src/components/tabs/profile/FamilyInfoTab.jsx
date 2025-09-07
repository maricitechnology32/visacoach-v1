import { useState } from "react";
import { format, parseISO, isValid, isFuture } from "date-fns";

const FamilyInfoTab = ({ data, onSave, saving }) => {
  const [formData, setFormData] = useState({
    father: data.father || { fullName: "", dateOfBirth: "", nationality: "", occupation: "" },
    mother: data.mother || { fullName: "", dateOfBirth: "", nationality: "", occupation: "" },
    spouse: data.spouse || { fullName: "", dateOfBirth: "", nationality: "", dateOfMarriage: "" },
    children: data.children?.length > 0 ? data.children : [],
  });
  const [errors, setErrors] = useState({});
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeChild, setActiveChild] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [suggestionField, setSuggestionField] = useState(null);

  // Country list
  const countries = [
    "United States", "Canada", "United Kingdom", "Australia", "Germany",
    "France", "Japan", "China", "India", "Brazil", "Other"
  ];

  // Validation
  const validateForm = () => {
    const newErrors = {};

    // Father validation
    if (!formData.father.fullName) newErrors.fatherName = "Father's name is required";
    if (formData.father.fullName.length > 100) newErrors.fatherName = "Max 100 characters";
    if (formData.father.dateOfBirth && (!isValid(parseISO(formData.father.dateOfBirth)) || isFuture(parseISO(formData.father.dateOfBirth)))) {
      newErrors.fatherDateOfBirth = "Invalid or future date";
    }

    // Mother validation
    if (!formData.mother.fullName) newErrors.motherName = "Mother's name is required";
    if (formData.mother.fullName.length > 100) newErrors.motherName = "Max 100 characters";
    if (formData.mother.dateOfBirth && (!isValid(parseISO(formData.mother.dateOfBirth)) || isFuture(parseISO(formData.mother.dateOfBirth)))) {
      newErrors.motherDateOfBirth = "Invalid or future date";
    }

    // Spouse validation
    if (formData.spouse.fullName.length > 100) newErrors.spouseName = "Max 100 characters";
    if (formData.spouse.dateOfBirth && (!isValid(parseISO(formData.spouse.dateOfBirth)) || isFuture(parseISO(formData.spouse.dateOfBirth)))) {
      newErrors.spouseDateOfBirth = "Invalid or future date";
    }
    if (formData.spouse.dateOfMarriage && (!isValid(parseISO(formData.spouse.dateOfMarriage)) || isFuture(parseISO(formData.spouse.dateOfMarriage)))) {
      newErrors.spouseDateOfMarriage = "Invalid or future date";
    }

    // Children validation
    formData.children.forEach((child, i) => {
      if (child.fullName.length > 100) newErrors[`childName${i}`] = "Max 100 characters";
      if (child.dateOfBirth && (!isValid(parseISO(child.dateOfBirth)) || isFuture(parseISO(child.dateOfBirth)))) {
        newErrors[`childDateOfBirth${i}`] = "Invalid or future date";
      }
    });

    return newErrors;
  };

  // Country search
  const handleCountrySearch = (value) => {
    const filtered = countries.filter((c) => c.toLowerCase().includes(value.toLowerCase()));
    setCountrySuggestions(filtered);
  };

  const handleChange = (section, field, value, index = null) => {
    let updatedData;

    if (section === "children" && index !== null) {
      const updatedChildren = [...formData.children];
      updatedChildren[index] = { ...updatedChildren[index], [field]: value };
      updatedData = { ...formData, children: updatedChildren };

      if (field === "nationality") {
        setSuggestionField(`child${index}`);
        handleCountrySearch(value);
      }
    } else {
      updatedData = { ...formData, [section]: { ...formData[section], [field]: value } };

      if (field === "nationality") {
        setSuggestionField(section);
        handleCountrySearch(value);
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
    setCountrySuggestions([]);
  };

  const addChild = () => {
    setFormData({
      ...formData,
      children: [...formData.children, { fullName: "", dateOfBirth: "", nationality: "" }],
    });
    setActiveChild(formData.children.length);
  };

  const removeChild = (index) => {
    const updatedChildren = formData.children.filter((_, i) => i !== index);
    setFormData({ ...formData, children: updatedChildren });
    setActiveChild(Math.min(activeChild, updatedChildren.length - 1));
  };

  const handleReset = () => {
    setFormData({
      father: { fullName: "", dateOfBirth: "", nationality: "", occupation: "" },
      mother: { fullName: "", dateOfBirth: "", nationality: "", occupation: "" },
      spouse: { fullName: "", dateOfBirth: "", nationality: "", dateOfMarriage: "" },
      children: [],
    });
    setActiveChild(0);
    setErrors({});
    setShowResetConfirm(false);
    setCountrySuggestions([]);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, "MMMM d, yyyy") : "Invalid date";
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="bg-white p-6 rounded-sm shadow-sm border-2 border-green-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="bg-green-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </span>
          Family Information
        </h2>
        <button
          type="button"
          onClick={addChild}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Child
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Father's Information */}
        <div className="bg-gray-50 p-5 rounded-sm border border-green-300">
          <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Father's Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={formData.father.fullName}
                onChange={(e) => handleChange("father", "fullName", e.target.value)}
                placeholder="Father's full name"
                className={`w-full border ${errors.fatherName ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              {errors.fatherName && <p className="text-red-500 text-xs mt-1">{errors.fatherName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={formData.father.dateOfBirth}
                onChange={(e) => handleChange("father", "dateOfBirth", e.target.value)}
                className={`w-full border ${errors.fatherDateOfBirth ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                max={format(new Date(), "yyyy-MM-dd")}
              />
              {errors.fatherDateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.fatherDateOfBirth}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <input
                type="text"
                value={formData.father.nationality}
                onChange={(e) => handleChange("father", "nationality", e.target.value)}
                placeholder="Nationality"
                className="w-full border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
              <input
                type="text"
                value={formData.father.occupation}
                onChange={(e) => handleChange("father", "occupation", e.target.value)}
                placeholder="Occupation"
                className="w-full border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Mother's Information */}
        <div className="bg-gray-50 p-5 rounded-sm border border-green-300">
          <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Mother's Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={formData.mother.fullName}
                onChange={(e) => handleChange("mother", "fullName", e.target.value)}
                placeholder="Mother's full name"
                className={`w-full border ${errors.motherName ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              {errors.motherName && <p className="text-red-500 text-xs mt-1">{errors.motherName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={formData.mother.dateOfBirth}
                onChange={(e) => handleChange("mother", "dateOfBirth", e.target.value)}
                className={`w-full border ${errors.motherDateOfBirth ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                max={format(new Date(), "yyyy-MM-dd")}
              />
              {errors.motherDateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.motherDateOfBirth}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <input
                type="text"
                value={formData.mother.nationality}
                onChange={(e) => handleChange("mother", "nationality", e.target.value)}
                placeholder="Nationality"
                className="w-full border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
              <input
                type="text"
                value={formData.mother.occupation}
                onChange={(e) => handleChange("mother", "occupation", e.target.value)}
                placeholder="Occupation"
                className="w-full border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Spouse's Information */}
        <div className="bg-gray-50 p-5 rounded-sm border border-green-300">
          <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Spouse's Information (if applicable)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.spouse.fullName}
                onChange={(e) => handleChange("spouse", "fullName", e.target.value)}
                placeholder="Spouse's full name"
                className={`w-full border ${errors.spouseName ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              {errors.spouseName && <p className="text-red-500 text-xs mt-1">{errors.spouseName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={formData.spouse.dateOfBirth}
                onChange={(e) => handleChange("spouse", "dateOfBirth", e.target.value)}
                className={`w-full border ${errors.spouseDateOfBirth ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                max={format(new Date(), "yyyy-MM-dd")}
              />
              {errors.spouseDateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.spouseDateOfBirth}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <input
                type="text"
                value={formData.spouse.nationality}
                onChange={(e) => handleChange("spouse", "nationality", e.target.value)}
                placeholder="Nationality"
                className="w-full border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Marriage</label>
              <input
                type="date"
                value={formData.spouse.dateOfMarriage}
                onChange={(e) => handleChange("spouse", "dateOfMarriage", e.target.value)}
                className={`w-full border ${errors.spouseDateOfMarriage ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                max={format(new Date(), "yyyy-MM-dd")}
              />
              {errors.spouseDateOfMarriage && <p className="text-red-500 text-xs mt-1">{errors.spouseDateOfMarriage}</p>}
            </div>
          </div>
        </div>

        {/* Children */}
        {formData.children.length > 0 && (
          <div className="bg-gray-50 p-5 rounded-lg border border-green-200">
            <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Children Information
            </h3>
            {formData.children.map((child, i) => (
              <div key={i} className="mb-4 p-4 bg-white rounded-md border border-green-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-700">Child #{i + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeChild(i)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Child's full name"
                      value={child.fullName}
                      onChange={(e) => handleChange("children", "fullName", e.target.value, i)}
                      className={`w-full border ${errors[`childName${i}`] ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                    {errors[`childName${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`childName${i}`]}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={child.dateOfBirth}
                      onChange={(e) => handleChange("children", "dateOfBirth", e.target.value, i)}
                      className={`w-full border ${errors[`childDateOfBirth${i}`] ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                      max={format(new Date(), "yyyy-MM-dd")}
                    />
                    {errors[`childDateOfBirth${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`childDateOfBirth${i}`]}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    <input
                      type="text"
                      value={child.nationality}
                      onChange={(e) => handleChange("children", "nationality", e.target.value, i)}
                      placeholder="Nationality"
                      className="w-full border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Form
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 transition-colors flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                Save Family Information
              </>
            )}
          </button>
        </div>
      </form>

      {/* Family Summary */}
      {(formData.father.fullName || formData.mother.fullName || formData.spouse.fullName || formData.children.length > 0) && (
        <div className="mt-8 p-5 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-lg text-green-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Family Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.father.fullName && (
              <div className="bg-white p-3 rounded border border-green-200">
                <h4 className="font-medium text-gray-700 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Father
                </h4>
                <p className="text-gray-800">{formData.father.fullName}</p>
                {formData.father.dateOfBirth && <p className="text-sm text-gray-600">DOB: {formatDate(formData.father.dateOfBirth)}</p>}
                {formData.father.nationality && <p className="text-sm text-gray-600">Nationality: {formData.father.nationality}</p>}
                {formData.father.occupation && <p className="text-sm text-gray-600">Occupation: {formData.father.occupation}</p>}
              </div>
            )}

            {formData.mother.fullName && (
              <div className="bg-white p-3 rounded border border-green-200">
                <h4 className="font-medium text-gray-700 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Mother
                </h4>
                <p className="text-gray-800">{formData.mother.fullName}</p>
                {formData.mother.dateOfBirth && <p className="text-sm text-gray-600">DOB: {formatDate(formData.mother.dateOfBirth)}</p>}
                {formData.mother.nationality && <p className="text-sm text-gray-600">Nationality: {formData.mother.nationality}</p>}
                {formData.mother.occupation && <p className="text-sm text-gray-600">Occupation: {formData.mother.occupation}</p>}
              </div>
            )}

            {formData.spouse.fullName && (
              <div className="bg-white p-3 rounded border border-green-200">
                <h4 className="font-medium text-gray-700 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Spouse
                </h4>
                <p className="text-gray-800">{formData.spouse.fullName}</p>
                {formData.spouse.dateOfBirth && <p className="text-sm text-gray-600">DOB: {formatDate(formData.spouse.dateOfBirth)}</p>}
                {formData.spouse.nationality && <p className="text-sm text-gray-600">Nationality: {formData.spouse.nationality}</p>}
                {formData.spouse.dateOfMarriage && <p className="text-sm text-gray-600">Married: {formatDate(formData.spouse.dateOfMarriage)}</p>}
              </div>
            )}

            {formData.children.length > 0 && (
              <div className="bg-white p-3 rounded border border-green-200 md:col-span-2">
                <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Children
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formData.children.map((child, i) => (
                    <div key={i} className="border border-gray-200 rounded p-2">
                      <p className="text-gray-800 font-medium">Child {i + 1}: {child.fullName}</p>
                      {child.dateOfBirth && <p className="text-sm text-gray-600">DOB: {formatDate(child.dateOfBirth)}</p>}
                      {child.nationality && <p className="text-sm text-gray-600">Nationality: {child.nationality}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Reset</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to reset all family information? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyInfoTab;