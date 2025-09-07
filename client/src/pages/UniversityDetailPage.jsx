/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
 

// // import { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import universityService from '../services/universityService';

// // // Helper component for displaying a detail item
// // const DetailItem = ({ label, value, children, className = '' }) => (
// //   <div className={`mb-4 ${className}`}>
// //     <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{label}</h3>
// //     {value && <p className="mt-1 text-lg text-gray-800">{value}</p>}
// //     {children && <div className="mt-1 text-lg text-gray-800">{children}</div>}
// //   </div>
// // );

// // // Component to display an item with an icon
// // const IconDetail = ({ icon, children }) => (
// //   <div className="flex items-center space-x-3">
// //     <div className="flex-shrink-0 text-gray-400">{icon}</div>
// //     <div className="text-gray-800">{children}</div>
// //   </div>
// // );

// // // Helper component for program cards with all details
// // const ProgramCard = ({ program }) => (
// //   <div className="bg-white border-2 border-green-200  p-6 transition-shadow hover:  mb-6">
// //     <div className="flex justify-between items-start mb-4">
// //       <div>
// //         <h4 className="text-xl font-bold text-green-700 mb-2">{program.name}</h4>
// //         <div className="flex items-center mb-3">
// //           <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
// //             {program.level}
// //           </span>
// //           {program.duration?.value && (
// //             <span className="text-sm text-gray-600">
// //               <i className="far fa-clock mr-1"></i> {program.duration.value} {program.duration.unit}
// //             </span>
// //           )}
// //         </div>
// //       </div>
// //       {program.scholarshipsAvailable && (
// //         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
// //           Scholarships Available
// //         </span>
// //       )}
// //     </div>

// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //       {program.tuitionFee?.amount && (
// //         <div>
// //           <p className="text-sm font-medium text-gray-500">Tuition Fee</p>
// //           <p className="text-gray-800">{program.tuitionFee.amount.toLocaleString()} {program.tuitionFee.currency}</p>
// //           {program.tuitionFee.period && <p className="text-xs text-gray-500">({program.tuitionFee.period})</p>}
// //         </div>
// //       )}

// //       {program.applicationFee?.amount && (
// //         <div>
// //           <p className="text-sm font-medium text-gray-500">Application Fee</p>
// //           <p className="text-gray-800">{program.applicationFee.amount} {program.applicationFee.currency}</p>
// //           {program.applicationFee.period && <p className="text-xs text-gray-500">({program.applicationFee.period})</p>}
// //         </div>
// //       )}

// //       {program.applicationDeadline && (
// //         <div>
// //           <p className="text-sm font-medium text-gray-500">Application Deadline</p>
// //           <p className="text-gray-800">{new Date(program.applicationDeadline).toLocaleDateString()}</p>
// //         </div>
// //       )}

// //       {program.applicationLink && (
// //         <div>
// //           <p className="text-sm font-medium text-gray-500">Application Link</p>
// //           <a href={program.applicationLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
// //             Apply Now
// //           </a>
// //         </div>
// //       )}
// //     </div>

// //     {/* Language Requirements */}
// //     {program.languageRequirements && program.languageRequirements.length > 0 && (
// //       <div className="mb-4">
// //         <p className="text-sm font-medium text-gray-500 mb-2">Language Requirements</p>
// //         <div className="bg-gray-50  p-4">
// //           {program.languageRequirements.map((req, index) => (
// //             <div key={index} className="mb-2 last:mb-0">
// //               <span className="font-medium text-gray-700">{req.name}:</span> Minimum {req.minimumScore} score
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     )}

// //     {/* Academic Requirements */}
// //     {program.academicRequirements && (
// //       <div className="mb-4">
// //         <p className="text-sm font-medium text-gray-500 mb-2">Academic Requirements</p>
// //         <div className="bg-gray-50  p-4">
// //           {program.academicRequirements.minimumGPA && (
// //             <div className="mb-2">
// //               <span className="font-medium text-gray-700">Minimum GPA:</span> {program.academicRequirements.minimumGPA}
// //             </div>
// //           )}
// //           {program.academicRequirements.requiredTests && program.academicRequirements.requiredTests.length > 0 && (
// //             <div>
// //               <span className="font-medium text-gray-700">Required Tests:</span>
// //               <ul className="list-disc list-inside ml-4 mt-1">
// //                 {program.academicRequirements.requiredTests.map((test, index) => (
// //                   <li key={index}>
// //                     {test.name}: Minimum {test.minimumScore} score
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     )}

// //     {/* Intake Seasons */}
// //     {program.intakeSeasons?.length > 0 && (
// //       <div className="mb-4">
// //         <p className="text-sm font-medium text-gray-500 mb-2">Intake Seasons</p>
// //         <div className="flex flex-wrap gap-2">
// //           {program.intakeSeasons.map((season, index) => (
// //             <span key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
// //               {season}
// //             </span>
// //           ))}
// //         </div>
// //       </div>
// //     )}

// //     {/* Scholarship Details */}
// //     {program.scholarshipDetails && (
// //       <div className="mb-4">
// //         <p className="text-sm font-medium text-gray-500 mb-1">Scholarship Information</p>
// //         <p className="text-gray-700">{program.scholarshipDetails}</p>
// //       </div>
// //     )}

// //     {/* Program Description */}
// //     {program.programDescription && (
// //       <div className="mb-4">
// //         <p className="text-sm font-medium text-gray-500 mb-1">Program Description</p>
// //         <p className="text-gray-700">{program.programDescription}</p>
// //       </div>
// //     )}

// //     <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
// //       <div className="text-sm text-gray-500">
// //         Created: {new Date(program.createdAt).toLocaleDateString()}
// //       </div>
// //       <button className="text-green-600 hover:text-green-800 font-medium flex items-center">
// //         View Full Details <i className="fas fa-arrow-right ml-1 text-sm"></i>
// //       </button>
// //     </div>
// //   </div>
// // );

// // const UniversityDetailPage = () => {
// //   const { id } = useParams();
// //   const [university, setUniversity] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const fetchUniversity = async () => {
// //       if (!id) return;
// //       try {
// //         setLoading(true);
// //         const data = await universityService.getPartnerUniversity(id);
// //         setUniversity(data);
// //         setError('');
// //       } catch (err) {
// //         setError(err.message || 'Failed to fetch university details. Please try again later.');
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUniversity();
// //   }, [id]);

// //   // Format date function
// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     try {
// //       return new Date(dateString).toLocaleDateString();
// //     } catch (error) {
// //       return 'Invalid Date',error;
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
// //           <p className="text-gray-600">Loading university details...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
// //           <p className="text-red-500 text-xl mb-4">{error}</p>
// //           <Link to="/manage-universities" className="text-green-600 hover:underline">
// //             ← Back to Universities
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!university) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <i className="fas fa-university text-gray-400 text-4xl mb-4"></i>
// //           <p className="text-gray-600 text-xl mb-4">University not found.</p>
// //           <Link to="/manage-universities" className="text-green-600 hover:underline">
// //             ← Back to Universities
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-gray-50 min-h-screen">
// //       <div className="container mx-auto p-4 md:p-8 max-w-6xl">
// //         <div className="mb-6">
// //           <Link to="/manage-universities" className="text-green-600 hover:underline flex items-center">
// //             <i className="fas fa-arrow-left mr-2"></i> Back to All Universities
// //           </Link>
// //         </div>

// //         {/* University Header */}
// //         <div className="bg-white   p-6 mb-8">
// //           <div className="flex flex-col md:flex-row">
// //             <div className="md:w-1/3 mb-6 md:mb-0">
// //               <div className="h-48 w-full bg-gradient-to-br from-green-500 to-green-700  flex items-center justify-center">
// //                 <span className="text-white text-5xl font-bold">
// //                   {university.name.split(' ').map(word => word[0]).join('')}
// //                 </span>
// //               </div>
// //             </div>
// //             <div className="md:w-2/3 md:pl-8">
// //               <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{university.name}</h1>
// //               <p className="text-xl text-gray-600 mt-2">{university.city}</p>
// //               <div className="flex flex-wrap items-center mt-4 gap-2">
// //                 <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
// //                   Established: {university.establishedYear}
// //                 </span>
// //                 <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
// //                   {university.type}
// //                 </span>
// //                 <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
// //                   {university.partnershipLevel} Partner
// //                 </span>
// //                 {university.isActive ? (
// //                   <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
// //                     Active
// //                   </span>
// //                 ) : (
// //                   <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
// //                     Inactive
// //                   </span>
// //                 )}
// //               </div>
// //               {university.description && (
// //                 <p className="mt-4 text-gray-700">{university.description}</p>
// //               )}
// //               <div className="mt-6 flex flex-wrap gap-3">
// //                 {university.website && (
// //                   <a
// //                     href={university.website}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="px-4 py-2 bg-green-600 text-white  hover:bg-green-700 transition-colors flex items-center"
// //                   >
// //                     <i className="fas fa-globe mr-2"></i> Visit Website
// //                   </a>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* University Statistics */}
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center">
// //           <div className="bg-white   p-6">
// //             <DetailItem label="Total Students" value={university.totalStudents ? university.totalStudents.toLocaleString() : 'N/A'} />
// //           </div>
// //           <div className="bg-white   p-6">
// //             <DetailItem label="International Students" value={university.internationalStudents ? university.internationalStudents.toLocaleString() : 'N/A'} />
// //           </div>
// //           <div className="bg-white   p-6">
// //             <DetailItem label="Student-Faculty Ratio" value={university.studentFacultyRatio ? university.studentFacultyRatio + ':1' : 'N/A'} />
// //           </div>
// //           <div className="bg-white   p-6">
// //             <DetailItem label="Acceptance Rate" value={university.acceptanceRate ? `${university.acceptanceRate}%` : 'Not specified'} />
// //           </div>
// //         </div>

// //         {/* University Details */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
// //           <div className="bg-white   p-6">
// //             <h2 className="text-xl font-bold text-gray-800 mb-4">University Information</h2>
// //             <DetailItem label="Campus Setting" value={university.campusSetting} />
// //             <DetailItem label="Partnership Level" value={university.partnershipLevel} />
// //             <DetailItem label="Partnership Start Date" value={formatDate(university.partnershipStartDate)} />
// //             <DetailItem label="Popularity Score" value={university.popularityScore || '0'} />
// //             <DetailItem label="Created" value={formatDate(university.createdAt)} />
// //             <DetailItem label="Last Updated" value={formatDate(university.updatedAt)} />
// //           </div>

// //           <div className="bg-white   p-6">
// //             <h2 className="text-xl font-bold text-gray-800 mb-4">Housing & Support</h2>
// //             <DetailItem label="On-Campus Housing">
// //               {university.housingOptions?.onCampus ? (
// //                 <span className="text-green-600">Available</span>
// //               ) : (
// //                 <span className="text-red-600">Not Available</span>
// //               )}
// //             </DetailItem>
// //             <DetailItem label="Off-Campus Assistance">
// //               {university.housingOptions?.offCampusAssistance ? (
// //                 <span className="text-green-600">Provided</span>
// //               ) : (
// //                 <span className="text-red-600">Not Provided</span>
// //               )}
// //             </DetailItem>
// //             <DetailItem label="Visa Support">
// //               {university.visaSupport ? (
// //                 <span className="text-green-600">Provided</span>
// //               ) : (
// //                 <span className="text-red-600">Not Provided</span>
// //               )}
// //             </DetailItem>
// //           </div>

// //           <div className="bg-white   p-6">
// //             <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
// //             {university.contactInformation?.internationalOffice && (
// //               <>
// //                 <DetailItem label="International Office Email" value={university.contactInformation.internationalOffice.email} />
// //                 <DetailItem label="International Office Phone" value={university.contactInformation.internationalOffice.phone} />
// //               </>
// //             )}
// //             {university.contactInformation?.representative && (
// //               <>
// //                 <DetailItem label="Representative Name" value={university.contactInformation.representative.name} />
// //                 <DetailItem label="Representative Email" value={university.contactInformation.representative.email} />
// //                 <DetailItem label="Representative Phone" value={university.contactInformation.representative.phone} />
// //               </>
// //             )}
// //             <DetailItem label="Consultancy ID" value={university.consultancy} />
// //           </div>
// //         </div>

// //         {/* Programs Section */}
// //         <div className="bg-white   p-6 mb-8">
// //           <div className="flex justify-between items-center mb-6">
// //             <h2 className="text-2xl font-bold text-gray-800">Offered Programs ({university.programs?.length || 0})</h2>
// //           </div>

// //           {university.programs?.length > 0 ? (
// //             <div className="grid grid-cols-1 gap-6">
// //               {university.programs.map(program => (
// //                 <ProgramCard key={program._id} program={program} />
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="text-center py-10">
// //               <i className="fas fa-graduation-cap text-gray-300 text-5xl mb-4"></i>
// //               <p className="text-gray-500 text-lg">No programs have been added for this university yet.</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Accreditation & Opportunities */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// //           <div className="bg-white   p-6">
// //             <h2 className="text-xl font-bold text-gray-800 mb-4">Accreditations</h2>
// //             {university.accreditation?.length > 0 ? (
// //               <ul className="list-disc list-inside">
// //                 {university.accreditation.map((acc, i) => (
// //                   <li key={i} className="text-gray-700 mb-2">{acc}</li>
// //                 ))}
// //               </ul>
// //             ) : (
// //               <p className="text-gray-500">No accreditations listed.</p>
// //             )}
// //           </div>

// //           <div className="bg-white   p-6">
// //             <h2 className="text-xl font-bold text-gray-800 mb-4">Special Opportunities</h2>
// //             {university.specialOpportunities?.length > 0 ? (
// //               <div className="flex flex-wrap gap-2">
// //                 {university.specialOpportunities.map((op, i) => (
// //                   <span key={i} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
// //                     {op}
// //                   </span>
// //                 ))}
// //               </div>
// //             ) : (
// //               <p className="text-gray-500">No special opportunities listed.</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Rankings Section (if available) */}
// //         {university.rankings && university.rankings.length > 0 && (
// //           <div className="bg-white   p-6 mb-8">
// //             <h2 className="text-2xl font-bold text-gray-800 mb-4">Rankings</h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //               {university.rankings.map((ranking, index) => (
// //                 <div key={index} className="border  p-4">
// //                   <h3 className="font-semibold text-gray-800">{ranking.source}</h3>
// //                   <p className="text-gray-600">Rank: {ranking.rank}</p>
// //                   {ranking.year && <p className="text-sm text-gray-500">Year: {ranking.year}</p>}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default UniversityDetailPage;

// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import {
//   ArrowLeft,
//   Globe,
//   Users,
//   UserCheck,
//   TrendingUp,
//   MapPin,
//   Calendar,
//   Clock,
//   DollarSign,
//   FileText,
//   Award,
//   Home,
//   Phone,
//   Mail,
//   User,
//   GraduationCap,
//   Star,
//   Shield,
//   Gift,
//   ExternalLink,
//   Building,
//   CheckCircle,
//   XCircle,
//   BookOpen,
//   Target
// } from 'lucide-react';
// import universityService from '../services/universityService';
// import { useAuth } from './context/AuthContext';


// // Helper component for displaying a detail item
// const DetailItem = ({ label, value, children, className = '' }) => (
//   <div className={`mb-4 ${className}`}>
//     <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</h3>
//     {value && <p className="text-lg text-gray-800 font-medium">{value}</p>}
//     {children && <div className="text-lg text-gray-800">{children}</div>}
//   </div>
// );

// // Component to display an item with an icon
// const IconDetail = ({ icon: Icon, children, label }) => (
//   <div className="flex items-start space-x-3 p-3  rounded-sm bg-green-50 border border-green-100">
//     <div className="flex-shrink-0 text-green-600 mt-0.5">
//       <Icon size={18} />
//     </div>
//     <div className="flex-1">
//       {label && <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>}
//       <div className="text-gray-800">{children}</div>
//     </div>
//   </div>
// );

// // Helper component for program cards with all details
// const ProgramCard = ({ program }) => (
//   <div className="bg-white  rounded-sm   border border-green-100 p-6 transition-all duration-300 hover:shadow-xl hover:border-green-200 mb-6">
//     <div className="flex justify-between items-start mb-4">
//       <div className="flex-1">
//         <h4 className="text-xl font-bold text-green-800 mb-3">{program.name}</h4>
//         <div className="flex items-center flex-wrap gap-2 mb-3">
//           <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-300">
//             <GraduationCap size={12} className="inline mr-1" />
//             {program.level}
//           </span>
//           {program.duration?.value && (
//             <span className="text-sm text-gray-600 flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
//               <Clock size={12} className="mr-1" />
//               {program.duration.value} {program.duration.unit}
//             </span>
//           )}
//         </div>
//       </div>
//       {program.scholarshipsAvailable && (
//         <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
//           <Gift size={12} className="mr-1" />
//           Scholarships Available
//         </span>
//       )}
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//       {program.tuitionFee?.amount && (
//         <div className="bg-green-50 p-4  rounded-sm border border-green-100">
//           <div className="flex items-center mb-2">
//             <DollarSign size={16} className="text-green-600 mr-2" />
//             <p className="text-sm font-semibold text-gray-700">Tuition Fee</p>
//           </div>
//           <p className="text-lg font-bold text-green-800">
//             {program.tuitionFee.amount.toLocaleString()} {program.tuitionFee.currency}
//           </p>
//           {program.tuitionFee.period && (
//             <p className="text-xs text-gray-600 mt-1">({program.tuitionFee.period})</p>
//           )}
//         </div>
//       )}

//       {program.applicationFee?.amount && (
//         <div className="bg-blue-50 p-4  rounded-sm border border-blue-100">
//           <div className="flex items-center mb-2">
//             <FileText size={16} className="text-blue-600 mr-2" />
//             <p className="text-sm font-semibold text-gray-700">Application Fee</p>
//           </div>
//           <p className="text-lg font-bold text-blue-800">
//             {program.applicationFee.amount} {program.applicationFee.currency}
//           </p>
//           {program.applicationFee.period && (
//             <p className="text-xs text-gray-600 mt-1">({program.applicationFee.period})</p>
//           )}
//         </div>
//       )}

//       {program.applicationDeadline && (
//         <div className="bg-red-50 p-4  rounded-sm border border-red-100">
//           <div className="flex items-center mb-2">
//             <Calendar size={16} className="text-red-600 mr-2" />
//             <p className="text-sm font-semibold text-gray-700">Application Deadline</p>
//           </div>
//           <p className="text-lg font-bold text-red-800">
//             {new Date(program.applicationDeadline).toLocaleDateString()}
//           </p>
//         </div>
//       )}

//       {program.applicationLink && (
//         <div className="bg-purple-50 p-4  rounded-sm border border-purple-100">
//           <div className="flex items-center mb-2">
//             <ExternalLink size={16} className="text-purple-600 mr-2" />
//             <p className="text-sm font-semibold text-gray-700">Application</p>
//           </div>
//           <a
//             href={program.applicationLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold transition-colors"
//           >
//             Apply Now <ExternalLink size={14} className="ml-1" />
//           </a>
//         </div>
//       )}
//     </div>

//     {/* Language Requirements */}
//     {program.languageRequirements && program.languageRequirements.length > 0 && (
//       <div className="mb-6">
//         <div className="flex items-center mb-3">
//           <BookOpen size={18} className="text-green-600 mr-2" />
//           <p className="text-sm font-semibold text-gray-700">Language Requirements</p>
//         </div>
//         <div className="bg-gradient-to-r from-green-50 to-blue-50  rounded-sm p-4 border border-green-100">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {program.languageRequirements.map((req, index) => (
//               <div key={index} className="flex items-center justify-between bg-white p-3  rounded-sm  ">
//                 <span className="font-medium text-gray-700">{req.name}</span>
//                 <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
//                   Min. {req.minimumScore}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )}

//     {/* Academic Requirements */}
//     {program.academicRequirements && (
//       <div className="mb-6">
//         <div className="flex items-center mb-3">
//           <Target size={18} className="text-blue-600 mr-2" />
//           <p className="text-sm font-semibold text-gray-700">Academic Requirements</p>
//         </div>
//         <div className="bg-gradient-to-r from-blue-50 to-purple-50  rounded-sm p-4 border border-blue-100">
//           {program.academicRequirements.minimumGPA && (
//             <div className="mb-3 bg-white p-3  rounded-sm  ">
//               <div className="flex items-center justify-between">
//                 <span className="font-medium text-gray-700">Minimum GPA</span>
//                 <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
//                   {program.academicRequirements.minimumGPA}
//                 </span>
//               </div>
//             </div>
//           )}
//           {program.academicRequirements.requiredTests && program.academicRequirements.requiredTests.length > 0 && (
//             <div className="bg-white p-3  rounded-sm  ">
//               <p className="font-medium text-gray-700 mb-2">Required Tests:</p>
//               <div className="space-y-2">
//                 {program.academicRequirements.requiredTests.map((test, index) => (
//                   <div key={index} className="flex items-center justify-between">
//                     <span className="text-gray-600">{test.name}</span>
//                     <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
//                       Min. {test.minimumScore}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     )}

//     {/* Intake Seasons */}
//     {program.intakeSeasons?.length > 0 && (
//       <div className="mb-6">
//         <div className="flex items-center mb-3">
//           <Calendar size={18} className="text-green-600 mr-2" />
//           <p className="text-sm font-semibold text-gray-700">Intake Seasons</p>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {program.intakeSeasons.map((season, index) => (
//             <span key={index} className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm font-semibold px-4 py-2 rounded-full border border-green-300  ">
//               {season}
//             </span>
//           ))}
//         </div>
//       </div>
//     )}

//     {/* Scholarship Details */}
//     {program.scholarshipDetails && (
//       <div className="mb-6">
//         <div className="flex items-center mb-3">
//           <Gift size={18} className="text-amber-600 mr-2" />
//           <p className="text-sm font-semibold text-gray-700">Scholarship Information</p>
//         </div>
//         <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4  rounded-sm border border-amber-200">
//           <p className="text-gray-700">{program.scholarshipDetails}</p>
//         </div>
//       </div>
//     )}

//     {/* Program Description */}
//     {program.programDescription && (
//       <div className="mb-6">
//         <div className="flex items-center mb-3">
//           <FileText size={18} className="text-gray-600 mr-2" />
//           <p className="text-sm font-semibold text-gray-700">Program Description</p>
//         </div>
//         <div className="bg-gray-50 p-4  rounded-sm border border-gray-200">
//           <p className="text-gray-700 leading-relaxed">{program.programDescription}</p>
//         </div>
//       </div>
//     )}

//     <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
//       <div className="text-sm text-gray-500 flex items-center">
//         <Calendar size={14} className="mr-1" />
//         Created: {new Date(program.createdAt).toLocaleDateString()}
//       </div>
//       <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-2  rounded-sm transition-all duration-300 flex items-center   hover: ">
//         View Full Details
//         <ExternalLink size={16} className="ml-2" />
//       </button>
//     </div>
//   </div>
// );

// const UniversityDetailPage = () => {
//   const { id } = useParams();
//   const [university, setUniversity] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUniversity = async () => {
//       if (!id) return;
//       try {
//         setLoading(true);
//         const data = await universityService.getPartnerUniversity(id);
//         setUniversity(data);
//         setError('');
//       } catch (err) {
//         setError(err.message || 'Failed to fetch university details. Please try again later.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUniversity();
//   }, [id]);

//   // Format date function
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleDateString();
//     } catch (error) {
//       return 'Invalid Date',error;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
//         <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-green-100">
//           <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mb-6"></div>
//           <p className="text-gray-700 text-lg font-medium">Loading university details...</p>
//           <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the information</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
//         <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100">
//           <XCircle className="text-red-500 mx-auto mb-6" size={64} />
//           <p className="text-red-600 text-xl mb-6 font-semibold">{error}</p>
//           <Link
//             to="/manage-universities"
//             className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold transition-colors bg-green-50 px-6 py-3  rounded-sm hover:bg-green-100"
//           >
//             <ArrowLeft size={18} className="mr-2" />
//             Back to Universities
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!university) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
//         <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
//           <Building className="text-gray-400 mx-auto mb-6" size={64} />
//           <p className="text-gray-700 text-xl mb-6 font-semibold">University not found.</p>
//           <Link
//             to="/manage-universities"
//             className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold transition-colors bg-green-50 px-6 py-3  rounded-sm hover:bg-green-100"
//           >
//             <ArrowLeft size={18} className="mr-2" />
//             Back to Universities
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen">
//       <div className="container mx-auto p-4 md:p-8 max-w-7xl">
//         {/* Back Button */}
//         <div className="mb-8">
//           <Link
//             to="/manage-universities"
//             className="inline-flex items-center text-green-700 hover:text-green-900 font-semibold transition-colors bg-white px-6 py-3  rounded-sm   hover:  border border-green-200"
//           >
//             <ArrowLeft size={18} className="mr-2" />
//             Back to All Universities
//           </Link>
//         </div>

//         {/* University Header */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-green-100">
//           <div className="flex flex-col lg:flex-row gap-8">
//             <div className="lg:w-1/3">
//               <div className="h-64 w-full bg-gradient-to-br from-green-600 via-green-700 to-green-800  rounded-sm flex items-center justify-center  ">
//                 <span className="text-white text-6xl font-bold drop- ">
//                   {university.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
//                 </span>
//               </div>
//             </div>
//             <div className="lg:w-2/3">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">{university.name}</h1>
//                   <div className="flex items-center text-xl text-gray-600 mb-4">
//                     <MapPin size={20} className="mr-2 text-green-600" />
//                     {university.city}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap items-center gap-3 mb-6">
//                 <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-semibold px-4 py-2 rounded-full border border-green-300 flex items-center">
//                   <Calendar size={16} className="mr-2" />
//                   Est. {university.establishedYear}
//                 </span>
//                 <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-semibold px-4 py-2 rounded-full border border-blue-300 flex items-center">
//                   <Building size={16} className="mr-2" />
//                   {university.type}
//                 </span>
//                 <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 font-semibold px-4 py-2 rounded-full border border-purple-300 flex items-center">
//                   <Star size={16} className="mr-2" />
//                   {university.partnershipLevel} Partner
//                 </span>
//                 {university.isActive ? (
//                   <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-semibold px-4 py-2 rounded-full border border-green-300 flex items-center">
//                     <CheckCircle size={16} className="mr-2" />
//                     Active
//                   </span>
//                 ) : (
//                   <span className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 font-semibold px-4 py-2 rounded-full border border-red-300 flex items-center">
//                     <XCircle size={16} className="mr-2" />
//                     Inactive
//                   </span>
//                 )}
//               </div>

//               {university.description && (
//                 <div className="mb-6">
//                   <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-4  rounded-sm border border-gray-200">
//                     {university.description}
//                   </p>
//                 </div>
//               )}

//               {university.website && (
//                 <div className="flex flex-wrap gap-4">
//                   <a
//                     href={university.website}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold  rounded-sm transition-all duration-300   hover: "
//                   >
//                     <Globe size={18} className="mr-2" />
//                     Visit Website
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* University Statistics */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white  rounded-sm   p-6 border border-green-100 text-center hover:shadow-xl transition-shadow duration-300">
//             <Users className="text-green-600 mx-auto mb-3" size={32} />
//             <DetailItem
//               label="Total Students"
//               value={university.totalStudents ? university.totalStudents.toLocaleString() : 'N/A'}
//             />
//           </div>
//           <div className="bg-white  rounded-sm   p-6 border border-blue-100 text-center hover:shadow-xl transition-shadow duration-300">
//             <UserCheck className="text-blue-600 mx-auto mb-3" size={32} />
//             <DetailItem
//               label="International Students"
//               value={university.internationalStudents ? university.internationalStudents.toLocaleString() : 'N/A'}
//             />
//           </div>
//           <div className="bg-white  rounded-sm   p-6 border border-purple-100 text-center hover:shadow-xl transition-shadow duration-300">
//             <TrendingUp className="text-purple-600 mx-auto mb-3" size={32} />
//             <DetailItem
//               label="Student-Faculty Ratio"
//               value={university.studentFacultyRatio ? university.studentFacultyRatio + ':1' : 'N/A'}
//             />
//           </div>
//           <div className="bg-white  rounded-sm   p-6 border border-amber-100 text-center hover:shadow-xl transition-shadow duration-300">
//             <Award className="text-amber-600 mx-auto mb-3" size={32} />
//             <DetailItem
//               label="Acceptance Rate"
//               value={university.acceptanceRate ? `${university.acceptanceRate}%` : 'Not specified'}
//             />
//           </div>
//         </div>

//         {/* University Details */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           <div className="bg-white  rounded-sm   p-6 border border-green-100">
//             <div className="flex items-center mb-6">
//               <Building className="text-green-600 mr-3" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">University Information</h2>
//             </div>
//             <div className="space-y-4">
//               <IconDetail icon={MapPin} label="Campus Setting">
//                 {university.campusSetting || 'N/A'}
//               </IconDetail>
//               <IconDetail icon={Star} label="Partnership Level">
//                 {university.partnershipLevel}
//               </IconDetail>
//               <IconDetail icon={Calendar} label="Partnership Start">
//                 {formatDate(university.partnershipStartDate)}
//               </IconDetail>
//               <IconDetail icon={TrendingUp} label="Popularity Score">
//                 {university.popularityScore || '0'}
//               </IconDetail>
//             </div>
//           </div>

//           <div className="bg-white  rounded-sm   p-6 border border-blue-100">
//             <div className="flex items-center mb-6">
//               <Home className="text-blue-600 mr-3" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">Housing & Support</h2>
//             </div>
//             <div className="space-y-4">
//               <IconDetail icon={Home} label="On-Campus Housing">
//                 {university.housingOptions?.onCampus ? (
//                   <span className="text-green-600 font-semibold flex items-center">
//                     <CheckCircle size={16} className="mr-1" /> Available
//                   </span>
//                 ) : (
//                   <span className="text-red-600 font-semibold flex items-center">
//                     <XCircle size={16} className="mr-1" /> Not Available
//                   </span>
//                 )}
//               </IconDetail>
//               <IconDetail icon={MapPin} label="Off-Campus Assistance">
//                 {university.housingOptions?.offCampusAssistance ? (
//                   <span className="text-green-600 font-semibold flex items-center">
//                     <CheckCircle size={16} className="mr-1" /> Provided
//                   </span>
//                 ) : (
//                   <span className="text-red-600 font-semibold flex items-center">
//                     <XCircle size={16} className="mr-1" /> Not Provided
//                   </span>
//                 )}
//               </IconDetail>
//               <IconDetail icon={FileText} label="Visa Support">
//                 {university.visaSupport ? (
//                   <span className="text-green-600 font-semibold flex items-center">
//                     <CheckCircle size={16} className="mr-1" /> Provided
//                   </span>
//                 ) : (
//                   <span className="text-red-600 font-semibold flex items-center">
//                     <XCircle size={16} className="mr-1" /> Not Provided
//                   </span>
//                 )}
//               </IconDetail>
//             </div>
//           </div>

//           <div className="bg-white  rounded-sm   p-6 border border-purple-100">
//             <div className="flex items-center mb-6">
//               <Phone className="text-purple-600 mr-3" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">Contact Information</h2>
//             </div>
//             <div className="space-y-4">
//               {university.contactInformation?.internationalOffice && (
//                 <>
//                   <IconDetail icon={Mail} label="International Office Email">
//                     <a href={`mailto:${university.contactInformation.internationalOffice.email}`} className="text-purple-600 hover:underline">
//                       {university.contactInformation.internationalOffice.email}
//                     </a>
//                   </IconDetail>
//                   <IconDetail icon={Phone} label="International Office Phone">
//                     <a href={`tel:${university.contactInformation.internationalOffice.phone}`} className="text-purple-600 hover:underline">
//                       {university.contactInformation.internationalOffice.phone}
//                     </a>
//                   </IconDetail>
//                 </>
//               )}
//               {university.contactInformation?.representative && (
//                 <>
//                   <IconDetail icon={User} label="Representative">
//                     <div>
//                       <p className="font-semibold">{university.contactInformation.representative.name}</p>
//                       <p className="text-sm text-gray-600">
//                         <Mail size={12} className="inline mr-1" />
//                         <a href={`mailto:${university.contactInformation.representative.email}`} className="text-purple-600 hover:underline">
//                           {university.contactInformation.representative.email}
//                         </a>
//                       </p>
//                       {university.contactInformation.representative.phone && (
//                         <p className="text-sm text-gray-600">
//                           <Phone size={12} className="inline mr-1" />
//                           <a href={`tel:${university.contactInformation.representative.phone}`} className="text-purple-600 hover:underline">
//                             {university.contactInformation.representative.phone}
//                           </a>
//                         </p>
//                       )}
//                     </div>
//                   </IconDetail>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Programs Section */}
//         <div className="bg-white  rounded-sm shadow-xl p-8 mb-8 border border-green-100">
//           <div className="flex justify-between items-center mb-8">
//             <div className="flex items-center">
//               <GraduationCap className="text-green-600 mr-3" size={28} />
//               <h2 className="text-3xl font-bold text-gray-800">
//                 Offered Programs
//                 <span className="text-green-600 ml-2">({university.programs?.length || 0})</span>
//               </h2>
//             </div>
//           </div>

//           {university.programs?.length > 0 ? (
//             <div className="space-y-8">
//               {university.programs.map(program => (
//                 <ProgramCard key={program._id} program={program} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <GraduationCap className="text-gray-300 mx-auto mb-6" size={80} />
//               <p className="text-gray-500 text-xl font-medium">No programs have been added for this university yet.</p>
//               <p className="text-gray-400 text-sm mt-2">Check back later for program updates.</p>
//             </div>
//           )}
//         </div>

//         {/* Accreditation & Opportunities */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           <div className="bg-white  rounded-sm   p-6 border border-green-100">
//             <div className="flex items-center mb-6">
//               <Shield className="text-green-600 mr-3" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">Accreditations</h2>
//             </div>
//             {university.accreditation?.length > 0 ? (
//               <div className="space-y-3">
//                 {university.accreditation.map((acc, i) => (
//                   <div key={i} className="flex items-center p-3 bg-green-50  rounded-sm border border-green-100">
//                     <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={18} />
//                     <span className="text-gray-700">{acc}</span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <Shield className="text-gray-300 mx-auto mb-3" size={48} />
//                 <p className="text-gray-500">No accreditations listed.</p>
//               </div>
//             )}
//           </div>

//           <div className="bg-white  rounded-sm   p-6 border border-amber-100">
//             <div className="flex items-center mb-6">
//               <Star className="text-amber-600 mr-3" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">Special Opportunities</h2>
//             </div>
//             {university.specialOpportunities?.length > 0 ? (
//               <div className="flex flex-wrap gap-3">
//                 {university.specialOpportunities.map((op, i) => (
//                   <span key={i} className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 font-semibold px-4 py-2 rounded-full border border-amber-300 flex items-center  ">
//                     <Star size={14} className="mr-2" />
//                     {op}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <Star className="text-gray-300 mx-auto mb-3" size={48} />
//                 <p className="text-gray-500">No special opportunities listed.</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Rankings Section (if available) */}
//         {university.rankings && university.rankings.length > 0 && (
//           <div className="bg-white  rounded-sm shadow-xl p-8 mb-8 border border-purple-100">
//             <div className="flex items-center mb-8">
//               <Award className="text-purple-600 mr-3" size={28} />
//               <h2 className="text-3xl font-bold text-gray-800">University Rankings</h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {university.rankings.map((ranking, index) => (
//                 <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 p-6  rounded-sm   hover:  transition-shadow duration-300">
//                   <div className="flex items-center mb-4">
//                     <Award className="text-purple-600 mr-3" size={24} />
//                     <h3 className="font-bold text-gray-800 text-lg">{ranking.source}</h3>
//                   </div>
//                   <div className="text-center">
//                     <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3  ">
//                       <span className="text-2xl font-bold text-purple-600">#{ranking.rank}</span>
//                     </div>
//                     {ranking.year && (
//                       <p className="text-sm text-gray-600 font-medium">Year: {ranking.year}</p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Footer Section */}
//         <div className="bg-white  rounded-sm   p-6 border border-gray-200">
//           <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
//             <div className="flex items-center mb-4 md:mb-0">
//               <Calendar size={16} className="mr-2" />
//               <span>Created: {formatDate(university.createdAt)}</span>
//               <span className="mx-3">•</span>
//               <span>Last Updated: {formatDate(university.updatedAt)}</span>
//             </div>
//             {/* <div className="flex items-center">
//               <Building size={16} className="mr-2 text-green-600" />
//               <span className="font-medium">University ID: {university.consultancy}</span>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UniversityDetailPage;

// src/pages/UniversityDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Globe,
  Users,
  UserCheck,
  TrendingUp,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Award,
  Home,
  Phone,
  Mail,
  User,
  GraduationCap,
  Star,
  Shield,
  Gift,
  ExternalLink,
  Building,
  CheckCircle,
  XCircle,
  BookOpen,
  Target
} from 'lucide-react';
import universityService from '../services/universityService';
import { useAuth } from '../context/AuthContext';

/** Small helper to show a label/value pair */
const DetailItem = ({ label, value, children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</h3>
    {value && <p className="text-lg text-gray-800 font-medium">{value}</p>}
    {children && <div className="text-lg text-gray-800">{children}</div>}
  </div>
);

/** Icon + content row */
const IconDetail = ({ icon: Icon, children, label }) => (
  <div className="flex items-start space-x-3 p-3 rounded-sm bg-green-50 border border-green-100">
    <div className="flex-shrink-0 text-green-600 mt-0.5">
      <Icon size={18} />
    </div>
    <div className="flex-1">
      {label && <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>}
      <div className="text-gray-800">{children}</div>
    </div>
  </div>
);

/** Card for a single program */
const ProgramCard = ({ program, user }) => {
  const formatMoney = (amount) =>
    typeof amount === 'number' ? amount.toLocaleString() : amount;

  return (
    <div className="bg-white rounded-sm border border-green-100 p-6 transition-all duration-300 hover:shadow-xl hover:border-green-200 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="text-xl font-bold text-green-800 mb-3">{program?.name}</h4>
          <div className="flex items-center flex-wrap gap-2 mb-3">
            {program?.level && (
              <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-300">
                <GraduationCap size={12} className="inline mr-1" />
                {program.level}
              </span>
            )}
            {program?.duration?.value && (
              <span className="text-sm text-gray-600 flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
                <Clock size={12} className="mr-1" />
                {program.duration.value} {program.duration.unit || ''}
              </span>
            )}
          </div>
        </div>

        {program?.scholarshipsAvailable && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
            <Gift size={12} className="mr-1" />
            Scholarships Available
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {program?.tuitionFee?.amount && (
          <div className="bg-green-50 p-4 rounded-sm border border-green-100">
            <div className="flex items-center mb-2">
              <DollarSign size={16} className="text-green-600 mr-2" />
              <p className="text-sm font-semibold text-gray-700">Tuition Fee</p>
            </div>
            <p className="text-lg font-bold text-green-800">
              {formatMoney(program.tuitionFee.amount)} {program.tuitionFee.currency}
            </p>
            {program.tuitionFee.period && (
              <p className="text-xs text-gray-600 mt-1">({program.tuitionFee.period})</p>
            )}
          </div>
        )}

        {program?.applicationFee?.amount && (
          <div className="bg-blue-50 p-4 rounded-sm border border-blue-100">
            <div className="flex items-center mb-2">
              <FileText size={16} className="text-blue-600 mr-2" />
              <p className="text-sm font-semibold text-gray-700">Application Fee</p>
            </div>
            <p className="text-lg font-bold text-blue-800">
              {formatMoney(program.applicationFee.amount)} {program.applicationFee.currency}
            </p>
            {program.applicationFee.period && (
              <p className="text-xs text-gray-600 mt-1">({program.applicationFee.period})</p>
            )}
          </div>
        )}

        {program?.applicationDeadline && (
          <div className="bg-red-50 p-4 rounded-sm border border-red-100">
            <div className="flex items-center mb-2">
              <Calendar size={16} className="text-red-600 mr-2" />
              <p className="text-sm font-semibold text-gray-700">Application Deadline</p>
            </div>
            <p className="text-lg font-bold text-red-800">
              {new Date(program.applicationDeadline).toLocaleDateString()}
            </p>
          </div>
        )}

        {program?.applicationLink && user?.role === "student" && (
          <div className="bg-purple-50 p-4 rounded-sm border border-purple-100">
            <div className="flex items-center mb-2">
              <ExternalLink size={16} className="text-purple-600 mr-2" />
              <p className="text-sm font-semibold text-gray-700">Application</p>
            </div>

            <a
              href={program.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold transition-colors"
            >
              Apply Now <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        )}

      </div>

      {/* Language Requirements */}
      {Array.isArray(program?.languageRequirements) && program.languageRequirements.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <BookOpen size={18} className="text-green-600 mr-2" />
            <p className="text-sm font-semibold text-gray-700">Language Requirements</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-sm p-4 border border-green-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {program.languageRequirements.map((req, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-sm">
                  <span className="font-medium text-gray-700">{req.name}</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Min. {req.minimumScore}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Academic Requirements */}
      {program?.academicRequirements && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Target size={18} className="text-blue-600 mr-2" />
            <p className="text-sm font-semibold text-gray-700">Academic Requirements</p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-sm p-4 border border-blue-100">
            {program.academicRequirements.minimumGPA && (
              <div className="mb-3 bg-white p-3 rounded-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Minimum GPA</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {program.academicRequirements.minimumGPA}
                  </span>
                </div>
              </div>
            )}
            {Array.isArray(program.academicRequirements.requiredTests) &&
              program.academicRequirements.requiredTests.length > 0 && (
                <div className="bg-white p-3 rounded-sm">
                  <p className="font-medium text-gray-700 mb-2">Required Tests:</p>
                  <div className="space-y-2">
                    {program.academicRequirements.requiredTests.map((test, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-gray-600">{test.name}</span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Min. {test.minimumScore}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}

      {/* Intake Seasons */}
      {Array.isArray(program?.intakeSeasons) && program.intakeSeasons.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Calendar size={18} className="text-green-600 mr-2" />
            <p className="text-sm font-semibold text-gray-700">Intake Seasons</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {program.intakeSeasons.map((season, idx) => (
              <span
                key={idx}
                className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm font-semibold px-4 py-2 rounded-full border border-green-300"
              >
                {season}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Scholarship Details */}
      {program?.scholarshipDetails && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Gift size={18} className="text-amber-600 mr-2" />
            <p className="text-sm font-semibold text-gray-700">Scholarship Information</p>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-sm border border-amber-200">
            <p className="text-gray-700">{program.scholarshipDetails}</p>
          </div>
        </div>
      )}

      {/* Program Description */}
      {program?.programDescription && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <FileText size={18} className="text-gray-600 mr-2" />
            <p className="text-sm font-semibold text-gray-700">Program Description</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-sm border border-gray-200">
            <p className="text-gray-700 leading-relaxed">{program.programDescription}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500 flex items-center">
          <Calendar size={14} className="mr-1" />
          Created: {program?.createdAt ? new Date(program.createdAt).toLocaleDateString() : 'N/A'}
        </div>
        <button
          type="button"
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-2 rounded-sm transition-all duration-300 flex items-center"
        >
          View Full Details
          <ExternalLink size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

const UniversityDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth(); // get once and pass down
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleDateString();
  };

  useEffect(() => {
    const fetchUniversity = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await universityService.getPartnerUniversity(id);
        setUniversity(data);
        setError('');
      } catch (err) {
        setError(err?.message || 'Failed to fetch university details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversity();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-green-100">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mb-6"></div>
          <p className="text-gray-700 text-lg font-medium">Loading university details...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100">
          <XCircle className="text-red-500 mx-auto mb-6" size={64} />
          <p className="text-red-600 text-xl mb-6 font-semibold">{error}</p>
          <Link
            to="/manage-universities"
            className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold transition-colors bg-green-50 px-6 py-3 rounded-sm hover:bg-green-100"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Universities
          </Link>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
          <Building className="text-gray-400 mx-auto mb-6" size={64} />
          <p className="text-gray-700 text-xl mb-6 font-semibold">University not found.</p>
          <Link
            to="/manage-universities"
            className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold transition-colors bg-green-50 px-6 py-3 rounded-sm hover:bg-green-100"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Universities
          </Link>
        </div>
      </div>
    );
  }

  const initials =
    typeof university?.name === 'string'
      ? university.name
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .join('')
        .slice(0, 3)
      : 'UNI';

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/manage-universities"
            className="inline-flex items-center text-green-700 hover:text-green-900 font-semibold transition-colors bg-white px-6 py-3 rounded-sm border border-green-200"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to All Universities
          </Link>
        </div>

        {/* University Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-green-100">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="h-64 w-full bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-sm flex items-center justify-center">
                <span className="text-white text-6xl font-bold">{initials}</span>
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">{university.name}</h1>
                  <div className="flex items-center text-xl text-gray-600 mb-4">
                    <MapPin size={20} className="mr-2 text-green-600" />
                    {university.city || 'N/A'}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                {university.establishedYear && (
                  <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-semibold px-4 py-2 rounded-full border border-green-300 flex items-center">
                    <Calendar size={16} className="mr-2" />
                    Est. {university.establishedYear}
                  </span>
                )}
                {university.type && (
                  <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-semibold px-4 py-2 rounded-full border border-blue-300 flex items-center">
                    <Building size={16} className="mr-2" />
                    {university.type}
                  </span>
                )}
                {university.partnershipLevel && (
                  <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 font-semibold px-4 py-2 rounded-full border border-purple-300 flex items-center">
                    <Star size={16} className="mr-2" />
                    {university.partnershipLevel} Partner
                  </span>
                )}
                {typeof university.isActive === 'boolean' && (
                  university.isActive ? (
                    <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-semibold px-4 py-2 rounded-full border border-green-300 flex items-center">
                      <CheckCircle size={16} className="mr-2" />
                      Active
                    </span>
                  ) : (
                    <span className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 font-semibold px-4 py-2 rounded-full border border-red-300 flex items-center">
                      <XCircle size={16} className="mr-2" />
                      Inactive
                    </span>
                  )
                )}
              </div>

              {university.description && (
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-4 rounded-sm border border-gray-200">
                    {university.description}
                  </p>
                </div>
              )}

              {university.website && (
                <div className="flex flex-wrap gap-4">
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-sm transition-all duration-300"
                  >
                    <Globe size={18} className="mr-2" />
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* University Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-sm p-6 border border-green-100 text-center hover:shadow-xl transition-shadow duration-300">
            <Users className="text-green-600 mx-auto mb-3" size={32} />
            <DetailItem
              label="Total Students"
              value={
                typeof university.totalStudents === 'number'
                  ? university.totalStudents.toLocaleString()
                  : 'N/A'
              }
            />
          </div>
          <div className="bg-white rounded-sm p-6 border border-blue-100 text-center hover:shadow-xl transition-shadow duration-300">
            <UserCheck className="text-blue-600 mx-auto mb-3" size={32} />
            <DetailItem
              label="International Students"
              value={
                typeof university.internationalStudents === 'number'
                  ? university.internationalStudents.toLocaleString()
                  : 'N/A'
              }
            />
          </div>
          <div className="bg-white rounded-sm p-6 border border-purple-100 text-center hover:shadow-xl transition-shadow duration-300">
            <TrendingUp className="text-purple-600 mx-auto mb-3" size={32} />
            <DetailItem
              label="Student-Faculty Ratio"
              value={
                typeof university.studentFacultyRatio === 'number'
                  ? `${university.studentFacultyRatio}:1`
                  : 'N/A'
              }
            />
          </div>
          <div className="bg-white rounded-sm p-6 border border-amber-100 text-center hover:shadow-xl transition-shadow duration-300">
            <Award className="text-amber-600 mx-auto mb-3" size={32} />
            <DetailItem
              label="Acceptance Rate"
              value={
                typeof university.acceptanceRate === 'number'
                  ? `${university.acceptanceRate}%`
                  : 'Not specified'
              }
            />
          </div>
        </div>

        {/* University Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-sm p-6 border border-green-100">
            <div className="flex items-center mb-6">
              <Building className="text-green-600 mr-3" size={24} />
              <h2 className="text-xl font-bold text-gray-800">University Information</h2>
            </div>
            <div className="space-y-4">
              <IconDetail icon={MapPin} label="Campus Setting">
                {university.campusSetting || 'N/A'}
              </IconDetail>
              <IconDetail icon={Star} label="Partnership Level">
                {university.partnershipLevel || 'N/A'}
              </IconDetail>
              <IconDetail icon={Calendar} label="Partnership Start">
                {formatDate(university.partnershipStartDate)}
              </IconDetail>
              <IconDetail icon={TrendingUp} label="Popularity Score">
                {typeof university.popularityScore === 'number' ? university.popularityScore : '0'}
              </IconDetail>
            </div>
          </div>

          <div className="bg-white rounded-sm p-6 border border-blue-100">
            <div className="flex items-center mb-6">
              <Home className="text-blue-600 mr-3" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Housing & Support</h2>
            </div>
            <div className="space-y-4">
              <IconDetail icon={Home} label="On-Campus Housing">
                {university?.housingOptions?.onCampus ? (
                  <span className="text-green-600 font-semibold flex items-center">
                    <CheckCircle size={16} className="mr-1" /> Available
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold flex items-center">
                    <XCircle size={16} className="mr-1" /> Not Available
                  </span>
                )}
              </IconDetail>
              <IconDetail icon={MapPin} label="Off-Campus Assistance">
                {university?.housingOptions?.offCampusAssistance ? (
                  <span className="text-green-600 font-semibold flex items-center">
                    <CheckCircle size={16} className="mr-1" /> Provided
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold flex items-center">
                    <XCircle size={16} className="mr-1" /> Not Provided
                  </span>
                )}
              </IconDetail>
              <IconDetail icon={FileText} label="Visa Support">
                {university?.visaSupport ? (
                  <span className="text-green-600 font-semibold flex items-center">
                    <CheckCircle size={16} className="mr-1" /> Provided
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold flex items-center">
                    <XCircle size={16} className="mr-1" /> Not Provided
                  </span>
                )}
              </IconDetail>
            </div>
          </div>

          <div className="bg-white rounded-sm p-6 border border-purple-100">
            <div className="flex items-center mb-6">
              <Phone className="text-purple-600 mr-3" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Contact Information</h2>
            </div>
            <div className="space-y-4">
              {university?.contactInformation?.internationalOffice && (
                <>
                  <IconDetail icon={Mail} label="International Office Email">
                    <a
                      href={`mailto:${university.contactInformation.internationalOffice.email}`}
                      className="text-purple-600 hover:underline"
                    >
                      {university.contactInformation.internationalOffice.email}
                    </a>
                  </IconDetail>
                  <IconDetail icon={Phone} label="International Office Phone">
                    <a
                      href={`tel:${university.contactInformation.internationalOffice.phone}`}
                      className="text-purple-600 hover:underline"
                    >
                      {university.contactInformation.internationalOffice.phone}
                    </a>
                  </IconDetail>
                </>
              )}

              {university?.contactInformation?.representative && (
                <IconDetail icon={User} label="Representative">
                  <div>
                    <p className="font-semibold">
                      {university.contactInformation.representative.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <Mail size={12} className="inline mr-1" />
                      <a
                        href={`mailto:${university.contactInformation.representative.email}`}
                        className="text-purple-600 hover:underline"
                      >
                        {university.contactInformation.representative.email}
                      </a>
                    </p>
                    {university.contactInformation.representative.phone && (
                      <p className="text-sm text-gray-600">
                        <Phone size={12} className="inline mr-1" />
                        <a
                          href={`tel:${university.contactInformation.representative.phone}`}
                          className="text-purple-600 hover:underline"
                        >
                          {university.contactInformation.representative.phone}
                        </a>
                      </p>
                    )}
                  </div>
                </IconDetail>
              )}
            </div>
          </div>
        </div>

        {/* Programs */}
        <div className="bg-white rounded-sm shadow-xl p-8 mb-8 border border-green-100">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <GraduationCap className="text-green-600 mr-3" size={28} />
              <h2 className="text-3xl font-bold text-gray-800">
                Offered Programs
                <span className="text-green-600 ml-2">({Array.isArray(university.programs) ? university.programs.length : 0})</span>
              </h2>
            </div>
          </div>

          {Array.isArray(university.programs) && university.programs.length > 0 ? (
            <div className="space-y-8">
              {university.programs.map((program) => (
                <ProgramCard key={program._id || program.name} program={program} user={user} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <GraduationCap className="text-gray-300 mx-auto mb-6" size={80} />
              <p className="text-gray-500 text-xl font-medium">No programs have been added for this university yet.</p>
              <p className="text-gray-400 text-sm mt-2">Check back later for program updates.</p>
            </div>
          )}
        </div>

        {/* Accreditation & Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-sm p-6 border border-green-100">
            <div className="flex items-center mb-6">
              <Shield className="text-green-600 mr-3" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Accreditations</h2>
            </div>
            {Array.isArray(university.accreditation) && university.accreditation.length > 0 ? (
              <div className="space-y-3">
                {university.accreditation.map((acc, i) => (
                  <div key={i} className="flex items-center p-3 bg-green-50 rounded-sm border border-green-100">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={18} />
                    <span className="text-gray-700">{acc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="text-gray-300 mx-auto mb-3" size={48} />
                <p className="text-gray-500">No accreditations listed.</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-sm p-6 border border-amber-100">
            <div className="flex items-center mb-6">
              <Star className="text-amber-600 mr-3" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Special Opportunities</h2>
            </div>
            {Array.isArray(university.specialOpportunities) && university.specialOpportunities.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {university.specialOpportunities.map((op, i) => (
                  <span
                    key={i}
                    className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 font-semibold px-4 py-2 rounded-full border border-amber-300 flex items-center"
                  >
                    <Star size={14} className="mr-2" />
                    {op}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Star className="text-gray-300 mx-auto mb-3" size={48} />
                <p className="text-gray-500">No special opportunities listed.</p>
              </div>
            )}
          </div>
        </div>

        {/* Rankings */}
        {Array.isArray(university.rankings) && university.rankings.length > 0 && (
          <div className="bg-white rounded-sm shadow-xl p-8 mb-8 border border-purple-100">
            <div className="flex items-center mb-8">
              <Award className="text-purple-600 mr-3" size={28} />
              <h2 className="text-3xl font-bold text-gray-800">University Rankings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {university.rankings.map((ranking, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 p-6 rounded-sm transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <Award className="text-purple-600 mr-3" size={24} />
                    <h3 className="font-bold text-lg text-gray-800">{ranking.source}</h3>
                  </div>
                  <div className="text-center">
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-purple-600">#{ranking.rank}</span>
                    </div>
                    {ranking.year && (
                      <p className="text-sm text-gray-600 font-medium">Year: {ranking.year}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-white rounded-sm p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div className="flex items-center mb-4 md:mb-0">
              <Calendar size={16} className="mr-2" />
              <span>Created: {formatDate(university.createdAt)}</span>
              <span className="mx-3">•</span>
              <span>Last Updated: {formatDate(university.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailPage;
