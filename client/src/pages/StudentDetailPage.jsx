


import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStudentById } from '../services/studentService';
import { getStudentProfile } from '../services/profileService';
import { getStudentJourney, updateTaskStatus } from '../services/journeyService';
import { getStudentDocuments, updateDocument } from '../services/documentService';

const StudentDetailPage = () => {
  const [student, setStudent] = useState(null);
  const [profile, setProfile] = useState(null);
  const [journey, setJourney] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('journey');
  const { studentId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [studentData, profileData, journeyData, docsData] = await Promise.all([
          getStudentById(studentId),
          getStudentProfile(studentId),
          getStudentJourney(studentId),
          getStudentDocuments(studentId),
        ]);
        setStudent(studentData);
        setProfile(profileData);
        setJourney(journeyData);
        setDocuments(docsData);
      } catch (err) {
        setError(err.message || 'Failed to load student data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId]);

  const handleDocStatusUpdate = async (docId, status) => {
    try {
      const updatedDoc = await updateDocument(docId, { status });
      setDocuments(documents.map(d => d._id === docId ? updatedDoc : d));
    } catch (err) {
      setError(err.message || 'Failed to update document status.');
    }
  };

  const handleTaskStatusUpdate = async (taskId, status) => {
    try {
      const updatedJourney = await updateTaskStatus(taskId, status);
      setJourney(updatedJourney);
    } catch (err) {
      setError(err.message || 'Failed to update task status.');
    }
  };

  const TabButton = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === tabName
        ? 'bg-green-100 text-green-700 shadow-sm'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md p-6 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm">
        <div className="flex items-center mb-3">
          <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-red-800">Error Loading Student Data</h3>
        </div>
        <p className="text-red-700">{error}</p>
        <Link
          to="/students"
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Back to Students
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <Link
            to="/students"
            className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to All Students
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{student?.name}</h1>
              <p className="text-sm font-bold text-gray-600 mt-1">{student?.email}</p>
            </div>
            <div className="mt-4 sm:mt-0 bg-green-100 text-green-800 px-4 py-2 rounded-sm text-sm font-medium">
              Student ID: {studentId.slice(-6)}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-8">
          <nav className="flex space-x-2" aria-label="Tabs">
            <TabButton
              tabName="journey"
              label="Visa Journey"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>}
            />
            <TabButton
              tabName="documents"
              label="Documents"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>}
            />
            <TabButton
              tabName="profile"
              label="Profile Details"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>}
            />
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'journey' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Visa Journey Progress</h2>
                <p className="text-gray-600 mt-1">Track the student's visa application process</p>
              </div>
              <ul className="divide-y divide-gray-200">
                {journey?.tasks.map(task => (
                  <li key={task._id} className="px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-3 w-3 rounded-full mr-4 ${task.status === 'completed' ? 'bg-green-500' : task.status === 'pending' ? 'bg-yellow-500' : task.status === 'in-progress' ? 'bg-green-500' : 'bg-green-500'}`}></div>
                      <span className="text-gray-900 font-medium">{task.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`capitalize text-xs font-medium px-3 py-1 rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' : task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : task.status === 'in-progress' ? 'bg-green-100 text-green-800' : 'bg-green-100 text-green-800'}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                      {task.status === 'completed' && (
                        <button
                          onClick={() => handleTaskStatusUpdate(task._id, 'approved')}
                          className="text-sm text-green-700 font-medium hover:text-green-900 transition-colors flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Approve
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="bg-white border-2 border-green-300 rounded-sm  shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 ">
                <h2 className="text-xl font-semibold text-gray-900">Uploaded Documents</h2>
                <p className="text-gray-600 mt-1">Review and manage student documents</p>
              </div>
              <ul className="divide-y divide-gray-200">
                {documents.map(doc => (
                  <li key={doc._id} className="px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{doc.documentType}</p>
                      <p className="text-sm text-gray-500 mt-1">{doc.fileName}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`capitalize text-xs font-medium px-3 py-1 rounded-full ${doc.status === 'approved' ? 'bg-green-100 text-green-800' : doc.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {doc.status}
                      </span>
                      {doc.status === 'uploaded' && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleDocStatusUpdate(doc._id, 'approved')}
                            className="text-sm text-green-700 font-medium hover:text-green-900 transition-colors flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Approve
                          </button>
                          <button
                            onClick={() => handleDocStatusUpdate(doc._id, 'rejected')}
                            className="text-sm text-red-700 font-medium hover:text-red-900 transition-colors flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'profile' && (
            // <div className="bg-white rounded-sm p-2 border-2 border-green-300 rounded-sm  shadow-sm shadow-sm overflow-hidden">
            //   <div className="px-6 py-2 border-2 border-green-300 rounded-sm  ">
            //     <h2 className="text-xl font-semibold text-gray-900">Profile Details</h2>
            //     <p className="text-gray-600 mt-1">Student's personal and academic information</p>
            //   </div>

            //   <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            //     <div>
            //       <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Academic Information</h3>
            //       <dl className="mt-4 space-y-4">
            //         <div>
            //           <dt className="text-sm font-medium text-gray-500">University</dt>
            //           <dd className="mt-1 text-lg text-gray-900">{profile?.university || 'Not provided'}</dd>
            //         </div>
            //         <div>
            //           <dt className="text-sm font-medium text-gray-500">Major</dt>
            //           <dd className="mt-1 text-lg text-gray-900">{profile?.major || 'Not provided'}</dd>
            //         </div>
            //         <div>
            //           <dt className="text-sm font-medium text-gray-500">Funding Source</dt>
            //           <dd className="mt-1 text-lg text-gray-900">{profile?.fundingSource || 'Not provided'}</dd>
            //         </div>
            //       </dl>
            //     </div>
            //     <div>
            //       <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Contact Information</h3>
            //       <dl className="mt-4 space-y-4">
            //         <div>
            //           <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
            //           <dd className="mt-1 text-lg text-gray-900">{profile?.contactNumber || 'Not provided'}</dd>
            //         </div>
            //         <div>
            //           <dt className="text-sm font-medium text-gray-500">SEVIS ID</dt>
            //           <dd className="mt-1 text-lg text-gray-900">{profile?.sevisId || 'Not provided'}</dd>
            //         </div>
            //         <div>
            //           <dt className="text-sm font-medium text-gray-500">Email</dt>
            //           <dd className="mt-1 text-lg text-gray-900">{student?.email}</dd>
            //         </div>
            //       </dl>
            //     </div>
            //   </div>
            // </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-green-50 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Profile Details</h2>
                    <p className="text-gray-600">Student's personal and academic information</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Academic Information */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Academic Information</h3>
                  </div>

                  <dl className="space-y-4 pl-11">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">University</dt>
                        <dd className="mt-1 text-gray-900">{profile?.university || 'Not provided'}</dd>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Major</dt>
                        <dd className="mt-1 text-gray-900">{profile?.major || 'Not provided'}</dd>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Funding Source</dt>
                        <dd className="mt-1 text-gray-900">{profile?.fundingSource || 'Not provided'}</dd>
                      </div>
                    </div>
                  </dl>
                </div>

                {/* Contact Information */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                  </div>

                  <dl className="space-y-4 pl-11">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
                        <dd className="mt-1 text-gray-900">{profile?.contactNumber || 'Not provided'}</dd>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">SEVIS ID</dt>
                        <dd className="mt-1 text-gray-900 font-mono">{profile?.sevisId || 'Not provided'}</dd>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-green-600 break-all">{student?.email}</dd>
                      </div>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;