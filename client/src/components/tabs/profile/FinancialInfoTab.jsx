// import { useState } from 'react';

// const FinancialInfoTab = ({ data, onSave, saving }) => {
//   const [formData, setFormData] = useState({
//     currency: data.currency || 'USD',
//     annualIncome: data.annualIncome || '',
//     bankBalance: data.bankBalance || '',
//     sponsors: data.sponsors?.length > 0 ? data.sponsors : [{
//       name: '',
//       relationship: '',
//       annualIncome: ''
//     }],
//     notes: data.notes || ''
//   });
//   const [errors, setErrors] = useState({});
//   const [showResetConfirm, setShowResetConfirm] = useState(false);
//   const [activeSponsor, setActiveSponsor] = useState(0);

//   // Currency options
//   const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'Other'];

//   // Validate form inputs
//   const validateForm = () => {
//     const newErrors = {};
//     if (formData.annualIncome && (isNaN(Number(formData.annualIncome)) || Number(formData.annualIncome) < 0)) {
//       newErrors.annualIncome = 'Annual income must be a positive number';
//     }
//     if (formData.bankBalance && (isNaN(Number(formData.bankBalance)) || Number(formData.bankBalance) < 0)) {
//       newErrors.bankBalance = 'Bank balance must be a positive number';
//     }
//     if (formData.notes.length > 1000) {
//       newErrors.notes = 'Notes must be 1000 characters or less';
//     }

//     formData.sponsors.forEach((sponsor, index) => {
//       if (sponsor.annualIncome && (isNaN(Number(sponsor.annualIncome)) || Number(sponsor.annualIncome) < 0)) {
//         newErrors[`sponsorIncome${index}`] = 'Sponsor income must be a positive number';
//       }
//     });

//     return newErrors;
//   };

//   const handleChange = (field, value, sponsorIndex = null) => {
//     if (sponsorIndex !== null) {
//       const updatedSponsors = [...formData.sponsors];
//       updatedSponsors[sponsorIndex] = { ...updatedSponsors[sponsorIndex], [field]: value };
//       setFormData({ ...formData, sponsors: updatedSponsors });
//     } else {
//       setFormData({ ...formData, [field]: value });
//     }
//     setErrors(validateForm());
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();

//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     // Convert numeric values
//     const processedData = {
//       ...formData,
//       annualIncome: formData.annualIncome ? Number(formData.annualIncome) : undefined,
//       bankBalance: formData.bankBalance ? Number(formData.bankBalance) : undefined,
//       sponsors: formData.sponsors.map(sponsor => ({
//         ...sponsor,
//         annualIncome: sponsor.annualIncome ? Number(sponsor.annualIncome) : undefined
//       }))
//     };

//     onSave(processedData);
//     setErrors({});
//   };

//   const addNewSponsor = () => {
//     setFormData({
//       ...formData,
//       sponsors: [...formData.sponsors, { name: '', relationship: '', annualIncome: '' }]
//     });
//     setActiveSponsor(formData.sponsors.length);
//   };

//   const removeSponsor = (index) => {
//     const updatedSponsors = formData.sponsors.filter((_, i) => i !== index);
//     setFormData({ ...formData, sponsors: updatedSponsors });
//     setActiveSponsor(Math.min(activeSponsor, updatedSponsors.length - 1));
//   };

//   const handleReset = () => {
//     setFormData({
//       currency: 'USD',
//       annualIncome: '',
//       bankBalance: '',
//       sponsors: [{ name: '', relationship: '', annualIncome: '' }],
//       notes: ''
//     });
//     setActiveSponsor(0);
//     setErrors({});
//     setShowResetConfirm(false);
//   };

//   // Format number as currency
//   const formatCurrency = (value) => {
//     if (!value && value !== 0) return '';
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: formData.currency,
//       minimumFractionDigits: 0
//     }).format(value);
//   };

//   return (
//     <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           Financial Information
//         </h2>
//         <button
//           onClick={addNewSponsor}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//           </svg>
//           Add Sponsor
//         </button>
//       </div>

//       {/* Sponsor Tabs */}
//       {formData.sponsors.length > 1 && (
//         <div className="flex gap-2 mb-6 overflow-x-auto">
//           {formData.sponsors.map((_, index) => (
//             <div key={index} className="relative">
//               <button
//                 onClick={() => setActiveSponsor(index)}
//                 className={`px-4 py-2 rounded-t-md ${activeSponsor === index ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-green-500 hover:text-white transition-colors`}
//               >
//                 Sponsor {index + 1}
//               </button>
//               {formData.sponsors.length > 1 && (
//                 <button
//                   onClick={() => removeSponsor(index)}
//                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700"
//                   title="Remove Sponsor"
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Currency
//             </label>
//             <select
//               value={formData.currency}
//               onChange={(e) => handleChange('currency', e.target.value)}
//               className="w-full border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               {currencies.map(currency => (
//                 <option key={currency} value={currency}>{currency}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
//             <input
//               type="number"
//               value={formData.annualIncome}
//               onChange={(e) => handleChange('annualIncome', e.target.value)}
//               className={`w-full border ${errors.annualIncome ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               placeholder={`e.g., ${formatCurrency(50000)}`}
//               min="0"
//               step="0.01"
//             />
//             {errors.annualIncome && <p className="text-red-500 text-xs mt-1">{errors.annualIncome}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Bank Balance</label>
//             <input
//               type="number"
//               value={formData.bankBalance}
//               onChange={(e) => handleChange('bankBalance', e.target.value)}
//               className={`w-full border ${errors.bankBalance ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               placeholder={`e.g., ${formatCurrency(10000)}`}
//               min="0"
//               step="0.01"
//             />
//             {errors.bankBalance && <p className="text-red-500 text-xs mt-1">{errors.bankBalance}</p>}
//           </div>

//           <div className="md:col-span-2">
//             <h4 className="text-md font-medium text-gray-700 mb-4">Sponsor {activeSponsor + 1} Details</h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor Name</label>
//                 <input
//                   type="text"
//                   value={formData.sponsors[activeSponsor].name}
//                   onChange={(e) => handleChange('name', e.target.value, activeSponsor)}
//                   className="w-full border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="e.g., John Doe"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor Relationship</label>
//                 <input
//                   type="text"
//                   value={formData.sponsors[activeSponsor].relationship}
//                   onChange={(e) => handleChange('relationship', e.target.value, activeSponsor)}
//                   className="w-full border  border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="e.g., Parent, Employer"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor Annual Income</label>
//                 <input
//                   type="number"
//                   value={formData.sponsors[activeSponsor].annualIncome}
//                   onChange={(e) => handleChange('annualIncome', e.target.value, activeSponsor)}
//                   className={`w-full border ${errors[`sponsorIncome${activeSponsor}`] ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//                   placeholder={`e.g., ${formatCurrency(60000)}`}
//                   min="0"
//                   step="0.01"
//                 />
//                 {errors[`sponsorIncome${activeSponsor}`] && <p className="text-red-500 text-xs mt-1">{errors[`sponsorIncome${activeSponsor}`]}</p>}
//               </div>
//             </div>
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Additional Financial Notes</label>
//             <textarea
//               value={formData.notes}
//               onChange={(e) => handleChange('notes', e.target.value)}
//               className={`w-full border ${errors.notes ? 'border-red-500' : ' border-green-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
//               rows="4"
//               placeholder="Any additional financial information or funding sources"
//             />
//             <div className="flex justify-between text-sm text-gray-500 mt-1">
//               <span>{errors.notes && <span className="text-red-500">{errors.notes}</span>}</span>
//               <span>{formData.notes.length}/1000 characters</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 pt-4">
//           <button
//             type="button"
//             onClick={() => setShowResetConfirm(true)}
//             className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//           >
//             Reset Form
//           </button>
//           <button
//             type="submit"
//             disabled={saving}
//             className={`px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:bg-green-400 flex items-center gap-2 ${saving ? 'cursor-not-allowed' : ''}`}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
//             </svg>
//             {saving ? 'Saving...' : 'Save Financial Information'}
//           </button>
//         </div>
//       </form>

//       {/* Reset Confirmation Dialog */}
//       {showResetConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Reset</h3>
//             <p className="text-gray-600 mb-6">Are you sure you want to reset the form? All unsaved changes will be lost.</p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setShowResetConfirm(false)}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleReset}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//               >
//                 Reset
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Financial Summary */}
//       {(formData.annualIncome || formData.bankBalance || formData.sponsors.some(s => s.name || s.relationship || s.annualIncome)) && (
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Summary</h3>
//           <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
//             {formData.annualIncome && (
//               <p className="text-sm text-gray-600">Annual Income: {formatCurrency(formData.annualIncome)}</p>
//             )}
//             {formData.bankBalance && (
//               <p className="text-sm text-gray-600">Bank Balance: {formatCurrency(formData.bankBalance)}</p>
//             )}
//             {formData.sponsors.map((sponsor, index) => (
//               (sponsor.name || sponsor.relationship || sponsor.annualIncome) && (
//                 <div key={index} className="mt-2">
//                   <p className="text-sm font-medium text-gray-800">Sponsor {index + 1}</p>
//                   {sponsor.name && <p className="text-sm text-gray-600">Name: {sponsor.name}</p>}
//                   {sponsor.relationship && <p className="text-sm text-gray-600">Relationship: {sponsor.relationship}</p>}
//                   {sponsor.annualIncome && <p className="text-sm text-gray-600">Income: {formatCurrency(sponsor.annualIncome)}</p>}
//                 </div>
//               )
//             ))}
//             {formData.notes && (
//               <p className="text-sm text-gray-600 mt-2">Notes: {formData.notes}</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FinancialInfoTab;


import { useState } from "react";

const FinancialInfoTab = ({ data, onSave, saving }) => {
  const [formData, setFormData] = useState({
    currency: data.currency || "USD",
    annualIncome: data.annualIncome || "",
    bankBalance: data.bankBalance || "",
    sponsors: data.sponsors?.length
      ? data.sponsors
      : [{ name: "", relationship: "", annualIncome: "" }],
    assets: data.assets?.length ? data.assets : [{ type: "", value: "" }],
    liabilities: data.liabilities?.length
      ? data.liabilities
      : [{ type: "", amount: "" }],
    fundingSources: data.fundingSources?.length
      ? data.fundingSources
      : [""],
    scholarships: data.scholarships?.length
      ? data.scholarships
      : [{ name: "", amount: "" }],
    notes: data.notes || "",
  });

  const [errors, setErrors] = useState({});
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "Other"];

  // ---------------------- VALIDATION ----------------------
  const validateForm = () => {
    const newErrors = {};

    if (formData.annualIncome && Number(formData.annualIncome) < 0)
      newErrors.annualIncome = "Annual income must be a positive number";

    if (formData.bankBalance && Number(formData.bankBalance) < 0)
      newErrors.bankBalance = "Bank balance must be a positive number";

    if (formData.notes.length > 1000)
      newErrors.notes = "Notes must be 1000 characters or less";

    formData.sponsors.forEach((s, i) => {
      if (s.annualIncome && Number(s.annualIncome) < 0)
        newErrors[`sponsorIncome${i}`] =
          "Sponsor income must be a positive number";
    });

    formData.assets.forEach((a, i) => {
      if (a.value && Number(a.value) < 0)
        newErrors[`assetValue${i}`] = "Asset value must be positive";
    });

    formData.liabilities.forEach((l, i) => {
      if (l.amount && Number(l.amount) < 0)
        newErrors[`liabilityAmount${i}`] = "Liability must be positive";
    });

    formData.scholarships.forEach((sch, i) => {
      if (sch.amount && Number(sch.amount) < 0)
        newErrors[`scholarshipAmount${i}`] =
          "Scholarship amount must be positive";
    });

    return newErrors;
  };

  // ---------------------- FORM HANDLERS ----------------------
  const handleChange = (field, value, index = null, section = null) => {
    if (section) {
      const updated = [...formData[section]];
      updated[index] = { ...updated[index], [field]: value };
      setFormData({ ...formData, [section]: updated });
    } else {
      setFormData({ ...formData, [field]: value });
    }
    setErrors(validateForm());
  };

  const addItem = (section, item) => {
    setFormData({ ...formData, [section]: [...formData[section], item] });
  };

  const removeItem = (section, index) => {
    const updated = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const processedData = {
      ...formData,
      annualIncome: formData.annualIncome
        ? Number(formData.annualIncome)
        : undefined,
      bankBalance: formData.bankBalance
        ? Number(formData.bankBalance)
        : undefined,
      sponsors: formData.sponsors.map((s) => ({
        ...s,
        annualIncome: s.annualIncome ? Number(s.annualIncome) : undefined,
      })),
      assets: formData.assets.map((a) => ({
        ...a,
        value: a.value ? Number(a.value) : undefined,
      })),
      liabilities: formData.liabilities.map((l) => ({
        ...l,
        amount: l.amount ? Number(l.amount) : undefined,
      })),
      scholarships: formData.scholarships.map((sch) => ({
        ...sch,
        amount: sch.amount ? Number(sch.amount) : undefined,
      })),
    };

    onSave(processedData);
    setErrors({});
  };

  const handleReset = () => {
    setFormData({
      currency: "USD",
      annualIncome: "",
      bankBalance: "",
      sponsors: [{ name: "", relationship: "", annualIncome: "" }],
      assets: [{ type: "", value: "" }],
      liabilities: [{ type: "", amount: "" }],
      fundingSources: [""],
      scholarships: [{ name: "", amount: "" }],
      notes: "",
    });
    setErrors({});
    setShowResetConfirm(false);
  };

  // ---------------------- UI HELPERS ----------------------
  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: formData.currency,
      minimumFractionDigits: 0,
    }).format(value);
  };

  // ---------------------- RENDER ----------------------
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Financial Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Currency & Income */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Currency</label>
            <select
              value={formData.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              {currencies.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Annual Income
            </label>
            <input
              type="number"
              value={formData.annualIncome}
              onChange={(e) => handleChange("annualIncome", e.target.value)}
              className={`w-full border rounded-md px-3 py-2 ${errors.annualIncome ? "border-red-500" : " border-green-300"
                }`}
              placeholder={`e.g. ${formatCurrency(50000)}`}
            />
            {errors.annualIncome && (
              <p className="text-red-500 text-xs">{errors.annualIncome}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Bank Balance
            </label>
            <input
              type="number"
              value={formData.bankBalance}
              onChange={(e) => handleChange("bankBalance", e.target.value)}
              className={`w-full border rounded-md px-3 py-2 ${errors.bankBalance ? "border-red-500" : " border-green-300"
                }`}
              placeholder={`e.g. ${formatCurrency(10000)}`}
            />
            {errors.bankBalance && (
              <p className="text-red-500 text-xs">{errors.bankBalance}</p>
            )}
          </div>
        </div>

        {/* Sponsors */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Sponsors</h3>
          {formData.sponsors.map((s, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <input
                type="text"
                value={s.name}
                placeholder="Sponsor Name"
                onChange={(e) =>
                  handleChange("name", e.target.value, i, "sponsors")
                }
                className="border rounded-md px-3 py-2"
              />
              <input
                type="text"
                value={s.relationship}
                placeholder="Relationship"
                onChange={(e) =>
                  handleChange("relationship", e.target.value, i, "sponsors")
                }
                className="border rounded-md px-3 py-2"
              />
              <input
                type="number"
                value={s.annualIncome}
                placeholder="Annual Income"
                onChange={(e) =>
                  handleChange("annualIncome", e.target.value, i, "sponsors")
                }
                className={`border rounded-md px-3 py-2 ${errors[`sponsorIncome${i}`] ? "border-red-500" : ""
                  }`}
              />
              {errors[`sponsorIncome${i}`] && (
                <p className="text-red-500 text-xs">{errors[`sponsorIncome${i}`]}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addItem("sponsors", { name: "", relationship: "", annualIncome: "" })
            }
            className="text-green-600"
          >
            + Add Sponsor
          </button>
        </div>

        {/* Assets */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Assets</h3>
          {formData.assets.map((a, i) => (
            <div key={i} className="grid grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                value={a.type}
                placeholder="Asset Type (e.g. Property)"
                onChange={(e) => handleChange("type", e.target.value, i, "assets")}
                className="border rounded-md px-3 py-2"
              />
              <input
                type="number"
                value={a.value}
                placeholder="Value"
                onChange={(e) =>
                  handleChange("value", e.target.value, i, "assets")
                }
                className={`border rounded-md px-3 py-2 ${errors[`assetValue${i}`] ? "border-red-500" : ""
                  }`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("assets", { type: "", value: "" })}
            className="text-green-600"
          >
            + Add Asset
          </button>
        </div>

        {/* Liabilities */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Liabilities</h3>
          {formData.liabilities.map((l, i) => (
            <div key={i} className="grid grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                value={l.type}
                placeholder="Liability Type (e.g. Loan)"
                onChange={(e) =>
                  handleChange("type", e.target.value, i, "liabilities")
                }
                className="border rounded-md px-3 py-2"
              />
              <input
                type="number"
                value={l.amount}
                placeholder="Amount"
                onChange={(e) =>
                  handleChange("amount", e.target.value, i, "liabilities")
                }
                className={`border rounded-md px-3 py-2 ${errors[`liabilityAmount${i}`] ? "border-red-500" : ""
                  }`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("liabilities", { type: "", amount: "" })}
            className="text-green-600"
          >
            + Add Liability
          </button>
        </div>

        {/* Funding Sources */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Funding Sources</h3>
          {formData.fundingSources.map((f, i) => (
            <div key={i} className="flex gap-3 mb-3">
              <input
                type="text"
                value={f}
                placeholder="Funding Source (e.g. Savings)"
                onChange={(e) =>
                  handleChange(null, e.target.value, i, "fundingSources")
                }
                className="border rounded-md px-3 py-2 flex-1"
              />
              <button
                type="button"
                onClick={() => removeItem("fundingSources", i)}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("fundingSources", "")}
            className="text-green-600"
          >
            + Add Funding Source
          </button>
        </div>

        {/* Scholarships */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Scholarships</h3>
          {formData.scholarships.map((sch, i) => (
            <div key={i} className="grid grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                value={sch.name}
                placeholder="Scholarship Name"
                onChange={(e) =>
                  handleChange("name", e.target.value, i, "scholarships")
                }
                className="border rounded-md px-3 py-2"
              />
              <input
                type="number"
                value={sch.amount}
                placeholder="Amount"
                onChange={(e) =>
                  handleChange("amount", e.target.value, i, "scholarships")
                }
                className={`border rounded-md px-3 py-2 ${errors[`scholarshipAmount${i}`] ? "border-red-500" : ""
                  }`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem("scholarships", { name: "", amount: "" })}
            className="text-green-600"
          >
            + Add Scholarship
          </button>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            rows={4}
            className={`w-full border rounded-md px-3 py-2 ${errors.notes ? "border-red-500" : " border-green-300"
              }`}
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>{errors.notes && <span className="text-red-500">{errors.notes}</span>}</span>
            <span>{formData.notes.length}/1000 characters</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      {/* Reset Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <p className="mb-4">Are you sure you want to reset?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
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

export default FinancialInfoTab;
