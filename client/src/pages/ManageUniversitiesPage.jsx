 

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import universityService from '../services/universityService';

// Import the new components
import UniversityModal from '../components/UniversityModal';
import ProgramModal from '../components/ProgramModal';
import ProgramListModal from '../components/ProgramListModal';
import ViewProgramModal from '../components/ViewProgramModal';

const ManageUniversitiesPage = () => {
  // --- Page State ---
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- Form Data State ---
  const [formData, setFormData] = useState({});
  const [programFormData, setProgramFormData] = useState({});

  // --- Modal Visibility State ---
  const [modalState, setModalState] = useState({
    isUniModalOpen: false,
    isProgramModalOpen: false,
    isProgramListModalOpen: false,
    isViewProgramModalOpen: false,
  });

  // --- Data for Modals ---
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [editingProgram, setEditingProgram] = useState(null);
  const [currentUniversity, setCurrentUniversity] = useState(null);

  // --- Data Fetching ---
  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const data = await universityService.getPartnerUniversities();
      setUniversities(data.universities || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  // --- Modal Open/Close Handlers ---
  const closeModal = () => {
    setModalState({
      isUniModalOpen: false,
      isProgramModalOpen: false,
      isProgramListModalOpen: false,
      isViewProgramModalOpen: false,
    });
    setEditingUniversity(null);
    setEditingProgram(null);
    setCurrentUniversity(null);
  };

  const handleOpenUniModal = (uni = null) => {
    setEditingUniversity(uni);
    setFormData(uni || getInitialUniversityData());
    setModalState({ ...modalState, isUniModalOpen: true });
  };

  const handleOpenProgramListModal = (uni) => {
    setCurrentUniversity(uni);
    setModalState({ ...modalState, isProgramListModalOpen: true });
  };

  const handleOpenProgramModal = (uni, program = null) => {
    setCurrentUniversity(uni);
    setEditingProgram(program);
    setProgramFormData(program || getInitialProgramData());
    setModalState({
      ...modalState,
      isProgramModalOpen: true,
      isProgramListModalOpen: false,
      isViewProgramModalOpen: false
    });
  };

  const handleOpenViewProgramModal = (program) => {
    setEditingProgram(program);
    setModalState({
      ...modalState,
      isViewProgramModalOpen: true,
      isProgramListModalOpen: false
    });
  };

  // --- CRUD Handlers ---
  const handleUniSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUniversity) {
        await universityService.updatePartnerUniversity(editingUniversity._id, formData);
      } else {
        await universityService.addPartnerUniversity(formData);
      }
      fetchUniversities();
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    try {
      // Normalize duration.unit to lowercase to match schema enum
      const normalizedData = {
        ...programFormData,
        duration: {
          ...programFormData.duration,
          unit: programFormData.duration.unit.toLowerCase()
        }
      };

      if (editingProgram) {
        await universityService.updateProgramInUniversity(
          currentUniversity._id,
          editingProgram._id,
          normalizedData
        );
      } else {
        await universityService.addProgramToUniversity(
          currentUniversity._id,
          normalizedData
        );
      }
      fetchUniversities();
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUniversity = async (id) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      try {
        await universityService.deletePartnerUniversity(id);
        fetchUniversities();
      }
      catch (err) {
        setError(err.message);
      }
    }
  };

  const handleDeleteProgram = async (programId) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await universityService.deleteProgramFromUniversity(
          currentUniversity._id,
          programId
        );
        fetchUniversities();
        closeModal();
      }
      catch (err) {
        setError(err.message);
      }
    }
  };

  // --- Initial State Functions ---
  const getInitialUniversityData = () => ({
    name: '',
    country: '',
    isActive: true,
    housingOptions: {},
    contactInformation: {
      internationalOffice: {},
      representative: {}
    },
    socialMedia: {},
    specialOpportunities: [],
    accreditation: []
  });

  const getInitialProgramData = () => ({
    name: '',
    level: 'Masters',
    duration: {
      value: '',
      unit: 'years'
    },
    tuitionFee: {
      amount: '',
      currency: 'USD',
      period: 'per year'
    },
    applicationFee: {
      amount: '',
      currency: 'USD',
      period: 'one-time'
    },
    intakeSeasons: [],
    languageRequirements: [],
    academicRequirements: {
      minimumGPA: null,
      requiredTests: []
    },
    scholarshipsAvailable: false,
    scholarshipDetails: '',
    programDescription: '',
    credits: null,
    faculty: '',
    applicationDeadline: null,
    applicationLink: ''
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
        <p className="text-gray-600">Loading universities...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-green-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Manage Universities</h1>
              <p className="text-gray-600 mt-2">Create and manage partner universities and their programs</p>
            </div>
            <button
              onClick={() => handleOpenUniModal()}
              className="mt-4 md:mt-0 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add University
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
          <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
            <h2 className="text-xl font-semibold text-gray-800">Partner Universities</h2>
            <p className="text-sm text-gray-600 mt-1">{universities.length} {universities.length === 1 ? 'university' : 'universities'} found</p>
          </div>

          {universities.length === 0 ? (
            <div className="text-center py-12 px-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-0.5m-12 0H5m2 0h0.5M5 21h0.5M5 21H7m0 0h0.5M7 21v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No universities</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding a new university.</p>
              <div className="mt-6">
                <button
                  onClick={() => handleOpenUniModal()}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add University
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programs</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {universities.map(uni => (
                    <tr key={uni._id} className="hover:bg-green-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/universities/${uni._id}`} className="text-green-700 font-medium hover:text-green-900 transition-colors duration-200">
                          {uni.name}
                        </Link>
                        <div className="text-sm text-gray-600">{uni.city}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-800">{uni.country}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-800 font-medium">{uni.programs?.length || 0} programs</div>
                        <button
                          onClick={() => handleOpenProgramListModal(uni)}
                          className="text-xs text-green-600 hover:text-green-800 font-medium transition-colors duration-200 flex items-center mt-1"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          Manage Programs
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${uni.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {uni.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => handleOpenUniModal(uni)}
                            className="text-green-600 hover:text-green-900 transition-colors duration-200 flex items-center"
                            title="Edit University"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteUniversity(uni._id)}
                            className="text-red-500 hover:text-red-700 transition-colors duration-200 flex items-center"
                            title="Delete University"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* --- Modals --- */}
      <UniversityModal
        isOpen={modalState.isUniModalOpen}
        onClose={closeModal}
        onSubmit={handleUniSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingUniversity}
      />

      <ProgramListModal
        isOpen={modalState.isProgramListModalOpen}
        onClose={closeModal}
        university={currentUniversity}
        onAdd={() => handleOpenProgramModal(currentUniversity)}
        onEdit={(program) => handleOpenProgramModal(currentUniversity, program)}
        onView={handleOpenViewProgramModal}
        onDelete={handleDeleteProgram}
      />

      <ProgramModal
        isOpen={modalState.isProgramModalOpen}
        onClose={closeModal}
        onSubmit={handleProgramSubmit}
        programFormData={programFormData}
        setProgramFormData={setProgramFormData}
        isEditing={!!editingProgram}
        universityName={currentUniversity?.name}
      />

      <ViewProgramModal
        isOpen={modalState.isViewProgramModalOpen}
        onClose={closeModal}
        program={editingProgram}
        onEdit={() => handleOpenProgramModal(currentUniversity, editingProgram)}
        onDelete={() => handleDeleteProgram(editingProgram._id)}
      />
    </div>
  );
};

export default ManageUniversitiesPage;