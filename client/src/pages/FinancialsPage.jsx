// // client/src/pages/FinancialsPage.jsx
// import { useState, useEffect, useMemo } from 'react';
// import { getFinancialProfile, updateFinancialProfile, downloadFinancialReport } from '../services/financialsService';

// const FinancialsPage = () => {
//   const [profile, setProfile] = useState({ estimatedExpenses: {}, assets: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const data = await getFinancialProfile();
//         setProfile(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleExpenseChange = (e) => {
//     setProfile(prev => ({
//       ...prev,
//       estimatedExpenses: { ...prev.estimatedExpenses, [e.target.name]: Number(e.target.value) }
//     }));
//   };

//   const handleAssetChange = (index, e) => {
//     const updatedAssets = [...profile.assets];
//     updatedAssets[index][e.target.name] = e.target.name === 'amount' ? Number(e.target.value) : e.target.value;
//     setProfile(prev => ({ ...prev, assets: updatedAssets }));
//   };

//   const addAsset = () => {
//     setProfile(prev => ({
//       ...prev,
//       assets: [...prev.assets, { assetType: 'Bank Account', description: '', amount: 0, currency: 'USD' }]
//     }));
//   };

//   const removeAsset = (index) => {
//     setProfile(prev => ({
//       ...prev,
//       assets: prev.assets.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSave = async () => {
//     setError(''); setSuccess('');
//     try {
//       await updateFinancialProfile(profile);
//       setSuccess('Financial profile saved successfully!');
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       await downloadFinancialReport();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const { totalExpenses, totalAssets, surplus } = useMemo(() => {
//     const expenses = (profile.estimatedExpenses?.tuition || 0) + (profile.estimatedExpenses?.livingCosts || 0) + (profile.estimatedExpenses?.other || 0);
//     const assets = profile.assets?.reduce((sum, asset) => sum + (asset.amount || 0), 0);
//     return { totalExpenses: expenses, totalAssets: assets, surplus: assets - expenses };
//   }, [profile]);


//   if (loading) return <div>Loading financial profile...</div>;

//   return (
//     <div className="space-y-8">
//       <h1 className="text-2xl font-bold text-gray-800">Financial Planner</h1>
//       {error && <p className="text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
//       {success && <p className="text-green-600 bg-green-100 p-3 rounded-md">{success}</p>}

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-gray-500">Total Expenses</h3><p className="text-3xl font-semibold">${totalExpenses.toLocaleString()}</p></div>
//         <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-gray-500">Total Assets</h3><p className="text-3xl font-semibold">${totalAssets.toLocaleString()}</p></div>
//         <div className={`p-6 rounded-lg shadow ${surplus >= 0 ? 'bg-green-100' : 'bg-red-100'}`}><h3 className={`${surplus >= 0 ? 'text-green-800' : 'text-red-800'}`}>Surplus / Deficit</h3><p className={`text-3xl font-semibold ${surplus >= 0 ? 'text-green-900' : 'text-red-900'}`}>${surplus.toLocaleString()}</p></div>
//       </div>

//       {/* Expenses Form */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-lg font-semibold mb-4">Estimated Expenses (USD)</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <input type="number" name="tuition" value={profile.estimatedExpenses?.tuition || ''} onChange={handleExpenseChange} placeholder="Tuition & Fees" className="border p-2 rounded-md" />
//           <input type="number" name="livingCosts" value={profile.estimatedExpenses?.livingCosts || ''} onChange={handleExpenseChange} placeholder="Living Costs" className="border p-2 rounded-md" />
//           <input type="number" name="other" value={profile.estimatedExpenses?.other || ''} onChange={handleExpenseChange} placeholder="Other Costs" className="border p-2 rounded-md" />
//         </div>
//       </div>

//       {/* Assets Form */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-lg font-semibold mb-4">Available Funds / Assets (USD)</h2>
//         <div className="space-y-4">
//           {profile.assets?.map((asset, index) => (
//             <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
//               <input type="text" name="description" value={asset.description} onChange={(e) => handleAssetChange(index, e)} placeholder="Asset Description" className="md:col-span-2 border p-2 rounded-md" />
//               <input type="number" name="amount" value={asset.amount} onChange={(e) => handleAssetChange(index, e)} placeholder="Amount" className="border p-2 rounded-md" />
//               <button onClick={() => removeAsset(index)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">Remove</button>
//             </div>
//           ))}
//         </div>
//         <button onClick={addAsset} className="mt-4 text-sm text-green-600 font-medium hover:text-green-800">+ Add Asset</button>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-4">
//         <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">Save Changes</button>
//         <button onClick={handleDownload} className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">Download PDF Summary</button>
//       </div>
//     </div>
//   );
// };

// export default FinancialsPage;

import { useState, useEffect, useMemo, useCallback } from 'react';
import { getFinancialProfile, updateFinancialProfile, downloadFinancialReport } from '../services/financialsService';
import { FiPlus, FiTrash2, FiSave, FiDownload, FiTrendingUp, FiTrendingDown, FiLoader } from "react-icons/fi";

const FinancialsPage = () => {
  // === State ===
  const [profile, setProfile] = useState({
    estimatedExpenses: { tuition: 0, livingCosts: 0, other: 0 },
    assets: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // === Fetch Profile on Mount ===
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getFinancialProfile();

        // Ensure data structure is valid
        setProfile({
          estimatedExpenses: {
            tuition: Number(data.estimatedExpenses?.tuition) || 0,
            livingCosts: Number(data.estimatedExpenses?.livingCosts) || 0,
            other: Number(data.estimatedExpenses?.other) || 0,
          },
          assets: Array.isArray(data.assets)
            ? data.assets.map(a => ({
              assetType: typeof a.assetType === 'string' ? a.assetType : 'Bank Account',
              description: typeof a.description === 'string' ? a.description : '',
              amount: Number(a.amount) || 0,
              currency: typeof a.currency === 'string' ? a.currency : 'USD'
            }))
            : []
        });
      } catch (err) {
        console.error("[FinancialsPage] Failed to fetch financial profile:", err);
        setError("❌ Failed to load financial profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // === Clear messages after delay ===
  const clearMessages = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(clearMessages, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success, clearMessages]);

  // === Handlers ===
  const handleExpenseChange = useCallback((e) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : Number(value);

    if (isNaN(numValue)) return;

    setProfile(prev => ({
      ...prev,
      estimatedExpenses: {
        ...prev.estimatedExpenses,
        [name]: numValue
      }
    }));
  }, []);

  const handleAssetChange = useCallback((index, e) => {
    const { name, value } = e.target;
    setProfile(prev => {
      const updatedAssets = [...prev.assets];
      if (updatedAssets[index]) {
        updatedAssets[index] = {
          ...updatedAssets[index],
          [name]: name === 'amount' ? (value === '' ? 0 : Number(value) || 0) : value
        };
      }
      return { ...prev, assets: updatedAssets };
    });
  }, []);

  const addAsset = useCallback(() => {
    setProfile(prev => ({
      ...prev,
      assets: [
        ...prev.assets,
        { assetType: 'Bank Account', description: '', amount: 0, currency: 'USD' }
      ]
    }));
  }, []);

  const removeAsset = useCallback((index) => {
    setProfile(prev => ({
      ...prev,
      assets: prev.assets.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSave = async () => {
    clearMessages();
    setSaving(true);

    try {
      await updateFinancialProfile(profile);
      setSuccess('✅ Financial profile saved successfully!');
    } catch (err) {
      console.error("[FinancialsPage] Save failed:", err);
      setError("❌ Failed to save profile. Please check your connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    clearMessages();
    setDownloading(true);
    try {
      await downloadFinancialReport();
      setSuccess('📄 Report downloaded successfully!');
    } catch (err) {
      console.error("[FinancialsPage] Download failed:", err);
      setError("❌ Failed to download report. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  // === Derived Values ===
  const { totalExpenses, totalAssets, surplus } = useMemo(() => {
    const expenses = (profile.estimatedExpenses?.tuition || 0) +
      (profile.estimatedExpenses?.livingCosts || 0) +
      (profile.estimatedExpenses?.other || 0);

    const assets = Array.isArray(profile.assets)
      ? profile.assets.reduce((sum, asset) => sum + (Number(asset.amount) || 0), 0)
      : 0;

    return {
      totalExpenses: Math.max(0, expenses),
      totalAssets: Math.max(0, assets),
      surplus: assets - expenses
    };
  }, [profile]);

  // === Loading State ===
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-green-600" role="status">
        <FiLoader className="animate-spin mr-3" aria-hidden="true" />
        <span>Loading financial profile...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-full mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-900">💰 Financial Planner</h1>

      {/* Feedback Messages */}
      {(error || success) && (
        <div
          className={`p-4 rounded-md text-sm ${error ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            } flex justify-between items-center animate-fade-in`}
          role="alert"
        >
          {error || success}
          <button
            type="button"
            onClick={clearMessages}
            className="ml-4 text-xl font-bold"
            aria-label="Dismiss message"
          >
            &times;
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Expenses */}
        <div className="bg-white p-6 rounded-md   border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Total Estimated Expenses</h3>
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-1">
            ${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Total Assets */}
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Total Available Assets</h3>
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-1">
            ${totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Surplus/Deficit */}
        <div className={`bg-opacity-80 p-6 rounded-xl shadow border-l-4 ${surplus >= 0
            ? 'bg-green-50 border-green-600'
            : 'bg-red-50 border-red-600'
          }`}>
          <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700">
            {surplus >= 0 ? (
              <FiTrendingUp className="text-green-600" aria-label="Positive surplus" />
            ) : (
              <FiTrendingDown className="text-red-600" aria-label="Deficit" />
            )}
            Projected {surplus >= 0 ? 'Surplus' : 'Deficit'}
          </h3>
          <p className={`text-2xl md:text-3xl font-semibold mt-1 ${surplus >= 0 ? 'text-green-700' : 'text-red-700'
            }`}>
            ${Math.abs(surplus).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Expenses Form */}
      <section className="bg-white p-6 rounded-md  border border-2 border-green-400">
        <h2 className="text-xl font-semibold mb-5 text-gray-800">Estimated Expenses (USD)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'tuition', label: 'Tuition & Fees', placeholder: 'e.g. 25000' },
            { name: 'livingCosts', label: 'Living Costs', placeholder: 'e.g. 12000' },
            { name: 'other', label: 'Other Costs', placeholder: 'e.g. 3000' }
          ].map(field => (
            <div key={field.name}>
              <label htmlFor={field.name} className="sr-only">{field.label}</label>
              <input
                type="number"
                id={field.name}
                name={field.name}
                value={profile.estimatedExpenses?.[field.name] ?? ''}
                onChange={handleExpenseChange}
                placeholder={field.placeholder}
                min="0"
                step="0.01"
                className="w-full  border border-green-400 p-3 rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none"
                aria-label={field.label}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Assets Form */}
      <section className="bg-white p-6 rounded-md border-2 border border-green-400 ">
        <h2 className="text-xl  font-semibold mb-5 text-gray-800">Available Funds / Assets</h2>
        {profile.assets?.length === 0 ? (
          <p className="text-gray-500 italic mb-4">No assets added yet. Click "Add Asset" to begin.</p>
        ) : (
          <div className="space-y-4 mb-4">
            {profile.assets.map((asset, index) => (
              <div
                key={`${asset.assetType}-${index}`}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-3  border border-green-400 rounded-md bg-gray-50"
              >
                <div>
                  <label htmlFor={`desc-${index}`} className="sr-only">Description</label>
                  <input
                    type="text"
                    id={`desc-${index}`}
                    name="description"
                    value={asset.description}
                    onChange={(e) => handleAssetChange(index, e)}
                    placeholder="e.g. Savings Account"
                    className="w-full border border-green-400 p-2 rounded-md focus:ring-2 focus:ring-green-300"
                  />
                </div>

                <div>
                  <label htmlFor={`amount-${index}`} className="sr-only">Amount</label>
                  <input
                    type="number"
                    id={`amount-${index}`}
                    name="amount"
                    value={asset.amount}
                    onChange={(e) => handleAssetChange(index, e)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full  border border-green-400 p-2 rounded-md focus:ring-2 focus:ring-green-300"
                    aria-label={`Asset amount ${index + 1}`}
                  />
                </div>

                <div className="text-center text-sm text-gray-500">{asset.currency}</div>

                <button
                  type="button"
                  onClick={() => removeAsset(index)}
                  className="flex items-center justify-center   text-red-700 p-2 rounded-md   cursor-pointer"
                  aria-label={`Remove asset ${asset.description || index + 1}`}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addAsset}
          className="flex items-center gap-1 text-sm text-green-600 font-medium hover:text-green-800 transition"
        >
          <FiPlus /> Add Asset
        </button>
      </section>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          aria-busy={saving}
        >
          {saving ? (
            <>
              <FiLoader className="animate-spin" aria-hidden="true" />
              Saving...
            </>
          ) : (
            <>
              <FiSave aria-hidden="true" /> Save Changes
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          aria-busy={downloading}
        >
          {downloading ? (
            <>
              <FiLoader className="animate-spin" aria-hidden="true" />
              Preparing...
            </>
          ) : (
            <>
              <FiDownload aria-hidden="true" /> Download PDF Summary
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FinancialsPage;