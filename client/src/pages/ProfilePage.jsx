/* eslint-disable no-unused-vars */
// // client/src/pages/ProfilePage.jsx
// import { useState, useEffect } from 'react';
// import {
//   getMyProfile,
//   updateProfileSection,
//   uploadProfilePicture,
//   addToProfileArray,
//   removeFromProfileArray,
//   getProfileCompletion
// } from '../services/profileService';
// import { useAuth } from '../context/AuthContext';
// import TestScoresTab from '../components/tabs/profile/TestScoreTab';
// import DestinationInfoTab from '../components/tabs/profile/DestinationInfoTab';
// import FinancialInfoTab from '../components/tabs/profile/FinancialInfoTab';
// import TravelHistoryTab from '../components/tabs/profile/TravelHistoryTab';
// import PersonalInfoTab from '../components/tabs/profile/PersonalInfoTab';
// import FamilyInfoTab from '../components/tabs/profile/FamilyInfoTab';
// import EducationTab from '../components/tabs/profile/EducationTab';
// import EmploymentTab from '../components/tabs/profile/EmploymentTab';
// import PassportInfoTab from '../components/tabs/profile/PassportInfoTab';
// import ContactInfoTab from '../components/tabs/profile/ContactInfoTab';

// const ProfilePage = () => {
//   // eslint-disable-next-line no-unused-vars
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState('personal');
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   // const [completion, setCompletion] = useState(0);
//   const [completionDetails, setCompletionDetails] = useState({});

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const profileData = await getMyProfile();
//         setProfile(profileData);

//         // Get profile completion percentage with details
//         const completionData = await getProfileCompletion();
//         // setCompletion(completionData.completion || 0);
//         setCompletionDetails(completionData.details || {});
//       } catch (err) {
//         setError('Failed to load profile: ' + (err.message || 'Unknown error'));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleSectionUpdate = async (section, data) => {
//     setSaving(true);
//     setError('');
//     setSuccess('');
//     try {
//       const updatedProfile = await updateProfileSection(section, data);
//       setProfile(updatedProfile);
//       setSuccess(`${section.replace(/([A-Z])/g, ' $1')} updated successfully!`);
//       setTimeout(() => setSuccess(''), 3000);

//       // Update completion percentage
//       const completionData = await getProfileCompletion();
//       // setCompletion(completionData.completion || 0);
//       setCompletionDetails(completionData.details || {});
//     } catch (err) {
//       setError('Failed to update: ' + (err.message || 'Unknown error'));
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleArrayAdd = async (arrayField, item) => {
//     try {
//       const updatedProfile = await addToProfileArray(arrayField, item);
//       setProfile(updatedProfile);
//       setSuccess('Item added successfully!');
//       setTimeout(() => setSuccess(''), 3000);

//       // Update completion percentage
//       const completionData = await getProfileCompletion();
//       // setCompletion(completionData.completion || 0);
//       setCompletionDetails(completionData.details || {});
//     } catch (err) {
//       setError('Failed to add item: ' + (err.message || 'Unknown error'));
//     }
//   };

//   const handleArrayRemove = async (arrayField, itemId) => {
//     try {
//       const updatedProfile = await removeFromProfileArray(arrayField, itemId);
//       setProfile(updatedProfile);
//       setSuccess('Item removed successfully!');
//       setTimeout(() => setSuccess(''), 3000);

//       // Update completion percentage
//       const completionData = await getProfileCompletion();
//       // setCompletion(completionData.completion || 0);
//       setCompletionDetails(completionData.details || {});
//     } catch (err) {
//       setError('Failed to remove item: ' + (err.message || 'Unknown error'));
//     }
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handlePictureUpload = async () => {
//     if (!selectedFile) return;
//     setUploading(true);
//     try {
//       const updatedProfile = await uploadProfilePicture(selectedFile);
//       setProfile(updatedProfile);
//       setSuccess('Profile picture updated successfully!');
//       setSelectedFile(null);
//       setTimeout(() => setSuccess(''), 3000);
//     } catch (err) {
//       setError('Failed to upload picture: ' + (err.message || 'Unknown error'));
//     } finally {
//       setUploading(false);
//     }
//   };

//   if (loading) return (
//     <div className="flex flex-col justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
//       <p className="text-gray-600">Loading your profile...</p>
//     </div>
//   );

//   if (!profile) return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="bg-red-50 border border-red-200 rounded-sm p-6 text-center">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 极速赛车开奖直播 极速赛车开奖结果 幸运飞艇开奖直播 幸运飞艇开奖结果 极速飞艇开奖直播 极速飞艇开奖结果 011-18 0 9 9 0 0118 0z" />
//         </svg>
//         <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Profile</h2>
//         <p className="text-red-600">We couldn't load your profile information. Please try refreshing the page.</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700 transition-colors"
//         >
//           Refresh Page
//         </button>
//       </div>
//     </div>
//   );

//   // Tab configuration with completion status
//   const tabs = [
//     { id: 'picture', label: 'Profile Picture', icon: '🖼️', completed: completionDetails.profilePicture },
//     { id: 'personal', label: 'Personal Info', icon: '👤', completed: completionDetails.personalInfo },
//     { id: 'contact', label: 'Contact Info', icon: '📱', completed: completionDetails.contactInfo },
//     { id: 'passport', label: 'Passport', icon: '📘', completed: completionDetails.passportInfo },
//     { id: 'family', label: 'Family', icon: '👪', completed: completionDetails.familyInfo },
//     { id: 'education', label: 'Education', icon: '🎓', completed: completionDetails.educationHistory },
//     { id: 'employment', label: 'Employment', icon: '💼', completed: completionDetails.employmentHistory },
//     { id: 'tests', label: 'Test Scores', icon: '📝', completed: completionDetails.testScores },
//     { id: 'destination', label: 'Destination', icon: '🌎', completed: completionDetails.destinationInfo },
//     { id: 'financial', label: 'Financial', icon: '💰', completed: completionDetails.financialInfo },
//     { id: 'documents', label: 'Documents', icon: '📁', completed: completionDetails.documents },
//     { id: 'travel', label: 'Travel History', icon: '✈️', completed: completionDetails.travelHistory },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       {/* Header Section */}
//       <div className="bg-white rounded-sm border-2 border-green-300 shadow-sm p-6 mb-6">
//         <div className="flex flex-col md:flex-row items-center gap-6">
//           <div className="relative">
//             <div className="relative">
//               <img
//                 src={`http://localhost:5001${profile.profilePictureUrl}`}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
//               />
//               <div className="absolute -bottom-2 -right-2 bg-green-600 text-white rounded-full p-1 shadow-md">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//           <div className="flex-1 text-center md:text-left">
//             <h1 className="text-3xl font-bold text-gray-800">
//               {profile.personalInfo?.firstName || 'User'}'s Profile
//             </h1>
//             <p className="text-gray-600 mt-2">Manage your visa application profile information</p>

//             {/* Progress Bar */}
//             <div className="mt-4">
//               {/* <div className="flex justify-between items-center mb-1">
//                 <span className="text-sm font-medium text-gray-700">Profile Completion</span>
//                 <span className="text-sm font-medium text-green-600">{completion}%</span>
//               </div> */}
//               {/* <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div
//                   className="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-out"
//                   style={{ width: `${completion}%` }}
//                 ></div>
//               </div> */}
//               <p className="text-xs text-gray-500 mt-1 mb-10">
//                 Complete all sections to maximize your visa application success
//               </p>
//             </div>
//           </div>
//           {/* <div className="bg-green-50 rounded-sm p-4 text-center shadow-sm">
//             <div className="text-sm font-medium text-green-700 mb-1">Profile Status</div>
//             <div className="text-2xl font-bold text-green-600">{completion}%</div>
//             <div className="text-xs text-green-600 mt-1">
//               {completion === 100 ? 'Complete!' : 'In Progress'}
//             </div>
//           </div> */}
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <div className="bg-white rounded-sm border-2 border-green-300 shadow-sm mb-6 overflow-hidden">
//         <nav className="flex overflow-x-auto px-4 py-3 gap-1">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 whitespace-nowrap relative
//                 ${activeTab === tab.id
//                   ? 'bg-green-100 text-green-700 shadow-inner'
//                   : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
//                 }`}
//             >
//               <span className="text-lg">{tab.icon}</span>
//               {tab.label}
//               {tab.completed && (
//                 <span className="absolute -top-1 -right-1">
//                   <span className="flex h-3 w-3">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//                   </span>
//                 </span>
//               )}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Error/Success Messages */}
//       {error && (
//         <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-sm border border-red-200 flex items-start">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <div>{error}</div>
//         </div>
//       )}
//       {success && (
//         <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-sm border border-green-200 flex items-start">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 极速赛车开奖直播 极速赛车开奖结果 幸运飞艇开奖直播 幸运飞艇开奖结果 极速飞艇开奖直播 极速飞艇开奖结果 0 9 9 0 0118 0z" />
//           </svg>
//           <div>{success}</div>
//         </div>
//       )}

//       {/* Tab Content */}
//       <div className="    p-6">
//         {activeTab === 'personal' && (
//           <PersonalInfoTab
//             data={profile.personalInfo || {}}
//             onSave={(data) => handleSectionUpdate('personalInfo', data)}
//             saving={saving}
//           />
//         )}

//         {activeTab === 'contact' && (
//           <ContactInfoTab
//             data={profile.contactInfo || {}}
//             onSave={(data) => handleSectionUpdate('contactInfo', data)}
//             saving={saving}
//           />
//         )}

//         {activeTab === 'passport' && (
//           <PassportInfoTab
//             data={profile.passportInfo || {}}
//             onSave={(data) => handleSectionUpdate('passportInfo', data)}
//             saving={saving}
//           />
//         )}

//         {activeTab === 'family' && (
//           <FamilyInfoTab
//             data={profile.familyInfo || {}}
//             onSave={(data) => handleSectionUpdate('familyInfo', data)}
//             saving={saving}
//           />
//         )}

//         {activeTab === 'education' && (
//           <EducationTab
//             data={profile.educationHistory || []}
//             onAdd={(item) => handleArrayAdd('educationHistory', item)}
//             onRemove={(id) => handleArrayRemove('educationHistory', id)}
//           />
//         )}

//         {activeTab === 'employment' && (
//           <EmploymentTab
//             data={profile.employmentHistory || []}
//             onAdd={(item) => handleArrayAdd('employmentHistory', item)}
//             onRemove={(id) => handleArrayRemove('employmentHistory', id)}
//           />
//         )}

//         {activeTab === 'tests' && (
//           <TestScoresTab
//             data={profile.testScores || []}
//             onAdd={(item) => handleArrayAdd('testScores', item)}
//             onRemove={(id) => handleArrayRemove('testScores', id)}
//           />
//         )}

//         {activeTab === 'destination' && (
//           <DestinationInfoTab
//             data={profile.destinationInfo || {}}
//             onSave={(data) => handleSectionUpdate('destinationInfo', data)}
//             saving={saving}
//           />
//         )}

//         {activeTab === 'financial' && (
//           <FinancialInfoTab
//             data={profile.financialInfo || {}}
//             onSave={(data) => handleSectionUpdate('financialInfo', data)}
//             saving={saving}
//           />
//         )}

//         {activeTab === 'documents' && (
//           <DocumentsTab
//             data={profile.documents || []}
//             onAdd={(item) => handleArrayAdd('documents', item)}
//             onRemove={(id) => handleArrayRemove('documents', id)}
//           />
//         )}

//         {activeTab === 'travel' && (
//           <TravelHistoryTab
//             data={profile.travelHistory || []}
//             onAdd={(item) => handleArrayAdd('travelHistory', item)}
//             onRemove={(id) => handleArrayRemove('travelHistory', id)}
//           />
//         )}

//         {activeTab === 'picture' && (
//           <ProfilePictureTab
//             profilePictureUrl={profile.profilePictureUrl}
//             selectedFile={selectedFile}
//             uploading={uploading}
//             onFileChange={handleFileChange}
//             onUpload={handlePictureUpload}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// // Tab Components
// const DocumentsTab = ({ data, onAdd, onRemove }) => {
//   const [newEntry, setNewEntry] = useState({
//     type: '',
//     description: '',
//     fileUrl: ''
//   });

//   const handleChange = (field, value) => {
//     setNewEntry({ ...newEntry, [field]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAdd(newEntry);
//     setNewEntry({
//       type: '',
//       description: '',
//       fileUrl: ''
//     });
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
//         <span className="text-sm text-gray-500">{data.length} document(s)</span>
//       </div>

//       <div className="mb-8">
//         {data.length === 0 ? (
//           <div className="text-center py-8 bg-gray-50 rounded-sm">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             <p className="text-gray-500">No documents added yet.</p>
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {data.map((entry) => (
//               <div key={entry._id} className="border border-gray-200 rounded-sm p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <div className="bg-green-100 p-2 rounded-full">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 极速赛车开奖直播 极速赛车开奖结果 幸运飞艇开奖直播 幸运飞艇开奖结果 极速飞艇开奖直播 极速飞艇开奖结果 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2极速赛车开奖直播 极速赛车开奖结果 幸运飞艇开奖直播 幸运飞艇开奖结果 极速飞艇开奖直播 极速飞艇开奖结果 2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-800">{entry.type}</p>
//                     <p className="text-sm text-gray-600">{entry.description}</p>
//                     {entry.fileUrl && (
//                       <a
//                         href={entry.fileUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-green-600 hover:text-green-800 text-sm inline-flex items-center mt-1"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/s极速赛车开奖直播 极速赛车开奖结果 幸运飞艇开奖直播 幸运飞艇开奖结果 极速飞艇开奖直播 极速飞艇开奖结果 " className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 15.5v-11a2 2 0 012-2h6a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
//                         </svg>
//                         View Document
//                       </a>
//                     )}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => onRemove(entry._id)}
//                   className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
//                   aria-label="Remove document"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 极速赛车开奖直播 极速赛车开奖结果 幸运飞艇开奖直播 幸运飞艇开奖结果 极速飞艇开奖直播 极速飞艇开奖结果 1-1v3M4 7h16" />
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="border-t pt-6">
//         <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Document</h3>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Document Type *</label>
//             <select
//               value={newEntry.type}
//               onChange={(e) => handleChange('type', e.target.value)}
//               className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               required
//             >
//               <option value="">Select Type</option>
//               <option value="PASSPORT">Passport</option>
//               <option value="BANK_STATEMENT">Bank Statement</option>
//               <option value="OFFER_LETTER">Offer Letter</option>
//               <option value="VISA">Visa</option>
//               <option value="IDENTIFICATION">Identification</option>
//               <option value="OTHER">Other</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//             <input
//               type="text"
//               value={newEntry.description}
//               onChange={(e) => handleChange('description', e.target.value)}
//               className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="Brief description of the document"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">File URL</label>
//             <input
//               type="text"
//               value={newEntry.fileUrl}
//               onChange={(e) => handleChange('fileUrl', e.target.value)}
//               className="w-full border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="Enter file URL or upload path"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               className="px-6 py-2 bg-green-600 text-white font-medium rounded-sm hover:bg-green-700 transition-colors shadow-sm"
//             >
//               Add Document
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const ProfilePictureTab = ({ profilePictureUrl, selectedFile, uploading, onFileChange, onUpload }) => (
//   <div className="flex flex-col items-center p-8 max-w-lg mx-auto">
//     {/* Title */}
//     <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile Picture</h2>

//     {/* Profile Picture Preview */}
//     <div className="relative mb-6">
//       <img
//         src={`http://localhost:5001${profilePictureUrl}`}
//         alt="Profile"
//         className="w-36 h-36 rounded-full object-cover border-4 border-gray-100 shadow-md"
//       />
//       <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow">
//         Current
//       </span>
//     </div>

//     {/* Upload Section */}
//     <div className="w-full">
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         Upload New Picture
//       </label>
//       <div className="flex items-center gap-3 mb-4">
//         <label className="flex-1 cursor-pointer">
//           <input
//             type="file"
//             onChange={onFileChange}
//             accept="image/*"
//             className="hidden"
//             id="profile-picture-upload"
//           />
//           <div className="w-full border border-gray-300 rounded-sm px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
//             {selectedFile ? selectedFile.name : "Choose a file..."}
//           </div>
//         </label>
//         <label htmlFor="profile-picture-upload" className="px-4 py-3 bg-green-600 text-white rounded-sm hover:bg-green-700 transition-colors cursor-pointer shadow-sm">
//           Browse
//         </label>
//       </div>

//       {/* Upload Button */}
//       <button
//         onClick={onUpload}
//         disabled={!selectedFile || uploading}
//         className="w-full py-3 bg-green-600 text-white font-semibold rounded-sm hover:bg-green-700 disabled:bg-green-400 transition-colors shadow-md flex items-center justify-center gap-2"
//       >
//         {uploading ? (
//           <>
//             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Uploading...
//           </>
//         ) : (
//           <>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//             </svg>
//             Upload Picture
//           </>
//         )}
//       </button>

//       {selectedFile && (
//         <p className="mt-3 text-sm text-gray-600 text-center">
//           Selected: <span className="font-medium">{selectedFile.name}</span>
//         </p>
//       )}

//       <p className="mt-4 text-xs text-gray-500 text-center">
//         Recommended: Square image, at least 300x300 pixels, JPG or PNG format
//       </p>
//     </div>
//   </div>
// );

// export default ProfilePage;

// client/src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import {
  getMyProfile,
  updateProfileSection,
  uploadProfilePicture,
  addToProfileArray,
  removeFromProfileArray,
  getProfileCompletion
} from '../services/profileService';
import { useAuth } from '../context/AuthContext';
import TestScoresTab from '../components/tabs/profile/TestScoreTab';
import DestinationInfoTab from '../components/tabs/profile/DestinationInfoTab';
import FinancialInfoTab from '../components/tabs/profile/FinancialInfoTab';
import TravelHistoryTab from '../components/tabs/profile/TravelHistoryTab';
import PersonalInfoTab from '../components/tabs/profile/PersonalInfoTab';
import FamilyInfoTab from '../components/tabs/profile/FamilyInfoTab';
import EducationTab from '../components/tabs/profile/EducationTab';
import EmploymentTab from '../components/tabs/profile/EmploymentTab';
import PassportInfoTab from '../components/tabs/profile/PassportInfoTab';
import ContactInfoTab from '../components/tabs/profile/ContactInfoTab';

// React Icons imports
import {
  FaUser,
  FaPhone,
  FaPassport,
  FaUsers,
  FaGraduationCap,
  FaBriefcase,
  FaFileAlt,
  FaGlobeAmericas,
  FaMoneyBillWave,
  FaFolder,
  FaPlane,
  FaImage,
  FaPlus,
  FaCheck,
  FaExclamationTriangle,
  FaSpinner,
  FaUpload,
  FaEye,
  FaTrash,
  FaArrowLeft,
  FaSync
} from 'react-icons/fa';
import { MdEmail, MdPictureAsPdf } from 'react-icons/md';

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [completionDetails, setCompletionDetails] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getMyProfile();
        setProfile(profileData);

        const completionData = await getProfileCompletion();
        setCompletionDetails(completionData.details || {});
      } catch (err) {
        setError('Failed to load profile: ' + (err.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSectionUpdate = async (section, data) => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const updatedProfile = await updateProfileSection(section, data);
      setProfile(updatedProfile);
      setSuccess(`${section.replace(/([A-Z])/g, ' $1')} updated successfully!`);
      setTimeout(() => setSuccess(''), 3000);

      const completionData = await getProfileCompletion();
      setCompletionDetails(completionData.details || {});
    } catch (err) {
      setError('Failed to update: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleArrayAdd = async (arrayField, item) => {
    try {
      const updatedProfile = await addToProfileArray(arrayField, item);
      setProfile(updatedProfile);
      setSuccess('Item added successfully!');
      setTimeout(() => setSuccess(''), 3000);

      const completionData = await getProfileCompletion();
      setCompletionDetails(completionData.details || {});
    } catch (err) {
      setError('Failed to add item: ' + (err.message || 'Unknown error'));
    }
  };

  const handleArrayRemove = async (arrayField, itemId) => {
    try {
      const updatedProfile = await removeFromProfileArray(arrayField, itemId);
      setProfile(updatedProfile);
      setSuccess('Item removed successfully!');
      setTimeout(() => setSuccess(''), 3000);

      const completionData = await getProfileCompletion();
      setCompletionDetails(completionData.details || {});
    } catch (err) {
      setError('Failed to remove item: ' + (err.message || 'Unknown error'));
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePictureUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const updatedProfile = await uploadProfilePicture(selectedFile);
      setProfile(updatedProfile);
      setSuccess('Profile picture updated successfully!');
      setSelectedFile(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to upload picture: ' + (err.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-64">
      <FaSpinner className="animate-spin text-green-600 text-2xl mb-4" />
      <p className="text-gray-600">Loading your profile...</p>
    </div>
  );

  if (!profile) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <FaExclamationTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Profile</h2>
        <p className="text-red-600">We couldn't load your profile information. Please try refreshing the page.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center mx-auto"
        >
          <FaSync className="mr-2" />
          Refresh Page
        </button>
      </div>
    </div>
  );

  // Tab configuration with completion status
  const tabs = [
    { id: 'picture', label: 'Profile Picture', icon: <FaImage />, completed: completionDetails.profilePicture },
    { id: 'personal', label: 'Personal Info', icon: <FaUser />, completed: completionDetails.personalInfo },
    { id: 'contact', label: 'Contact Info', icon: <FaPhone />, completed: completionDetails.contactInfo },
    { id: 'passport', label: 'Passport', icon: <FaPassport />, completed: completionDetails.passportInfo },
    { id: 'family', label: 'Family', icon: <FaUsers />, completed: completionDetails.familyInfo },
    { id: 'education', label: 'Education', icon: <FaGraduationCap />, completed: completionDetails.educationHistory },
    { id: 'employment', label: 'Employment', icon: <FaBriefcase />, completed: completionDetails.employmentHistory },
    { id: 'tests', label: 'Test Scores', icon: <FaFileAlt />, completed: completionDetails.testScores },
    { id: 'destination', label: 'Destination', icon: <FaGlobeAmericas />, completed: completionDetails.destinationInfo },
    { id: 'financial', label: 'Financial', icon: <FaMoneyBillWave />, completed: completionDetails.financialInfo },
    { id: 'documents', label: 'Documents', icon: <FaFolder />, completed: completionDetails.documents },
    { id: 'travel', label: 'Travel History', icon: <FaPlane />, completed: completionDetails.travelHistory },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-white rounded-sm   p-6 mb-6 border-2 border-green-300">
        <div className="flex flex-col md:flex-row border-2 items-center gap-6 border-green-200 p-2">
          <div className="relative">
            <div className="relative">
              <img
                src={`http://localhost:5001${profile.profilePictureUrl}`}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-600 text-white rounded-full p-2 shadow-md">
                <FaPlus className="text-sm" />
              </div>
            </div>
          </div>
          <div className="flex-1 text-center  md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {profile.personalInfo?.firstName || 'User'}'s Profile
            </h1>
            <p className="text-gray-600 mt-2">Manage your visa application profile information</p>

            <p className="text-sm text-gray-500 mt-4">
              Complete all sections to maximize your visa application success
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-sm border-2 border-green-300    mb-6 overflow-hidden">
        <nav className="flex overflow-x-auto px-4 py-3 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap relative
                ${activeTab === tab.id
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
              {tab.completed && (
                <span className="absolute -top-1 -right-1">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start">
          <FaExclamationTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>{error}</div>
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-start">
          <FaCheck className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>{success}</div>
        </div>
      )}

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'personal' && (
          <PersonalInfoTab
            data={profile.personalInfo || {}}
            onSave={(data) => handleSectionUpdate('personalInfo', data)}
            saving={saving}
          />
        )}

        {activeTab === 'contact' && (
          <ContactInfoTab
            data={profile.contactInfo || {}}
            onSave={(data) => handleSectionUpdate('contactInfo', data)}
            saving={saving}
          />
        )}

        {activeTab === 'passport' && (
          <PassportInfoTab
            data={profile.passportInfo || {}}
            onSave={(data) => handleSectionUpdate('passportInfo', data)}
            saving={saving}
          />
        )}

        {activeTab === 'family' && (
          <FamilyInfoTab
            data={profile.familyInfo || {}}
            onSave={(data) => handleSectionUpdate('familyInfo', data)}
            saving={saving}
          />
        )}

        {activeTab === 'education' && (
          <EducationTab
            data={profile.educationHistory || []}
            onAdd={(item) => handleArrayAdd('educationHistory', item)}
            onRemove={(id) => handleArrayRemove('educationHistory', id)}
          />
        )}

        {activeTab === 'employment' && (
          <EmploymentTab
            data={profile.employmentHistory || []}
            onAdd={(item) => handleArrayAdd('employmentHistory', item)}
            onRemove={(id) => handleArrayRemove('employmentHistory', id)}
          />
        )}

        {activeTab === 'tests' && (
          <TestScoresTab
            data={profile.testScores || []}
            onAdd={(item) => handleArrayAdd('testScores', item)}
            onRemove={(id) => handleArrayRemove('testScores', id)}
          />
        )}

        {activeTab === 'destination' && (
          <DestinationInfoTab
            data={profile.destinationInfo || {}}
            onSave={(data) => handleSectionUpdate('destinationInfo', data)}
            saving={saving}
          />
        )}

        {activeTab === 'financial' && (
          <FinancialInfoTab
            data={profile.financialInfo || {}}
            onSave={(data) => handleSectionUpdate('financialInfo', data)}
            saving={saving}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsTab
            data={profile.documents || []}
            onAdd={(item) => handleArrayAdd('documents', item)}
            onRemove={(id) => handleArrayRemove('documents', id)}
          />
        )}

        {activeTab === 'travel' && (
          <TravelHistoryTab
            data={profile.travelHistory || []}
            onAdd={(item) => handleArrayAdd('travelHistory', item)}
            onRemove={(id) => handleArrayRemove('travelHistory', id)}
          />
        )}

        {activeTab === 'picture' && (
          <ProfilePictureTab
            profilePictureUrl={profile.profilePictureUrl}
            selectedFile={selectedFile}
            uploading={uploading}
            onFileChange={handleFileChange}
            onUpload={handlePictureUpload}
          />
        )}
      </div>
    </div>
  );
};

// Tab Components
const DocumentsTab = ({ data, onAdd, onRemove }) => {
  const [newEntry, setNewEntry] = useState({
    type: '',
    description: '',
    fileUrl: ''
  });

  const handleChange = (field, value) => {
    setNewEntry({ ...newEntry, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newEntry);
    setNewEntry({
      type: '',
      description: '',
      fileUrl: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
        <span className="text-sm text-gray-500">{data.length} document(s)</span>
      </div>

      <div className="mb-8">
        {data.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <FaFolder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No documents added yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {data.map((entry) => (
              <div key={entry._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <MdPictureAsPdf className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{entry.type}</p>
                    <p className="text-sm text-gray-600">{entry.description}</p>
                    {entry.fileUrl && (
                      <a
                        href={entry.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 text-sm inline-flex items-center mt-1"
                      >
                        <FaEye className="mr-1" />
                        View Document
                      </a>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onRemove(entry._id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                  aria-label="Remove document"
                >
                  <FaTrash className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Document</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Type *</label>
            <select
              value={newEntry.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select Type</option>
              <option value="PASSPORT">Passport</option>
              <option value="BANK_STATEMENT">Bank Statement</option>
              <option value="OFFER_LETTER">Offer Letter</option>
              <option value="VISA">Visa</option>
              <option value="IDENTIFICATION">Identification</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={newEntry.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Brief description of the document"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">File URL</label>
            <input
              type="text"
              value={newEntry.fileUrl}
              onChange={(e) => handleChange('fileUrl', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter file URL or upload path"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors shadow-sm flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfilePictureTab = ({ profilePictureUrl, selectedFile, uploading, onFileChange, onUpload }) => (
  <div className="flex flex-col items-center p-8 max-w-lg mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
      <FaImage className="mr-2" />
      Profile Picture
    </h2>

    <div className="relative mb-6">
      <img
        src={`http://localhost:5001${profilePictureUrl}`}
        alt="Profile"
        className="w-36 h-36 rounded-full object-cover border-4 border-gray-100 shadow-md"
      />
      <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow">
        Current
      </span>
    </div>

    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload New Picture
      </label>
      <div className="flex items-center gap-3 mb-4">
        <label className="flex-1 cursor-pointer">
          <input
            type="file"
            onChange={onFileChange}
            accept="image/*"
            className="hidden"
            id="profile-picture-upload"
          />
          <div className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            {selectedFile ? selectedFile.name : "Choose a file..."}
          </div>
        </label>
        <label htmlFor="profile-picture-upload" className="px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer shadow-sm flex items-center">
          <FaUpload className="mr-2" />
          Browse
        </label>
      </div>

      <button
        onClick={onUpload}
        disabled={!selectedFile || uploading}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-green-400 transition-colors shadow-md flex items-center justify-center gap-2"
      >
        {uploading ? (
          <>
            <FaSpinner className="animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <FaUpload />
            Upload Picture
          </>
        )}
      </button>

      {selectedFile && (
        <p className="mt-3 text-sm text-gray-600 text-center">
          Selected: <span className="font-medium">{selectedFile.name}</span>
        </p>
      )}

      <p className="mt-4 text-xs text-gray-500 text-center">
        Recommended: Square image, at least 300x300 pixels, JPG or PNG format
      </p>
    </div>
  </div>
);

export default ProfilePage;