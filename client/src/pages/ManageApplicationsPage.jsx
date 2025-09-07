

// import { useState, useEffect, useMemo } from 'react';
// import { Pie, Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// } from 'chart.js';
// import { getApplications, createApplication, updateApplication, deleteApplication } from '../services/applicationService';
// import { getApplicationStats } from '../services/dashboardService';
// import { getMyStudents } from '../services/studentService';
// import { getPartnerUniversities } from '../services/universityService';
// import Modal from '../components/Modal';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// const ManageApplicationsPage = () => {
//   const [applications, setApplications] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [universities, setUniversities] = useState([]);
//   const [statusChartData, setStatusChartData] = useState(null);
//   const [countryChartData, setCountryChartData] = useState(null);
//   const [universityChartData, setUniversityChartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingApp, setEditingApp] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [selectedUniversityId, setSelectedUniversityId] = useState('');

//   const availablePrograms = useMemo(() => {
//     if (!selectedUniversityId) return [];
//     const selectedUni = universities.find(u => u._id === selectedUniversityId);
//     return selectedUni?.programs || [];
//   }, [selectedUniversityId, universities]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [appsData, studentsData, statsData, unisData] = await Promise.all([
//         getApplications(),
//         getMyStudents(),
//         getApplicationStats(),
//         getPartnerUniversities(),
//       ]);
//       setApplications(appsData);
//       setStudents(studentsData);
//       setUniversities(unisData.universities);
//       updateCharts(appsData, statsData);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const updateCharts = (apps, stats) => {
//     // Status Pie Chart
//     const pieLabels = stats.map(s => s.status);
//     const pieData = stats.map(s => s.count);
//     setStatusChartData({
//       labels: pieLabels,
//       datasets: [{
//         data: pieData,
//         backgroundColor: ['#10B981', '#EF4444', '#F59E0B', '#6B7280'],
//         borderWidth: 0,
//         hoverOffset: 15
//       }]
//     });

//     // Country Success Rate Chart
//     const countryGroups = apps.reduce((acc, app) => {
//       const country = app.university?.country;
//       if (!country) return acc;
//       if (!acc[country]) acc[country] = { total: 0, approved: 0 };
//       acc[country].total++;
//       if (app.visaStatus === 'Approved') acc[country].approved++;
//       return acc;
//     }, {});
//     const countryStats = Object.entries(countryGroups).map(([country, stats]) => ({
//       country,
//       successRate: stats.total > 0 ? (stats.approved / stats.total) * 100 : 0
//     })).sort((a, b) => b.successRate - a.successRate);
//     setCountryChartData({
//       labels: countryStats.map(s => s.country),
//       datasets: [{
//         label: 'Success Rate (%)',
//         data: countryStats.map(s => s.successRate),
//         backgroundColor: 'rgba(79, 70, 229, 0.8)',
//         borderRadius: 4,
//         maxBarThickness: 30
//       }]
//     });

//     // University Success Rate Chart
//     const universityGroups = apps.reduce((acc, app) => {
//       const universityId = app.university?._id;
//       const universityName = app.university?.name;
//       if (!universityId || !universityName) return acc;
//       if (!acc[universityId]) {
//         acc[universityId] = { name: universityName, total: 0, approved: 0 };
//       }
//       acc[universityId].total++;
//       if (app.visaStatus === 'Approved') acc[universityId].approved++;
//       return acc;
//     }, {});
//     const universityStats = Object.values(universityGroups).map(stats => ({
//       name: stats.name,
//       successRate: stats.total > 0 ? (stats.approved / stats.total) * 100 : 0,
//     })).sort((a, b) => b.successRate - a.successRate).slice(0, 10);
//     setUniversityChartData({
//       labels: universityStats.map(s => s.name),
//       datasets: [{
//         label: 'Success Rate (%)',
//         data: universityStats.map(s => s.successRate),
//         backgroundColor: 'rgba(14, 165, 233, 0.8)',
//         borderRadius: 4,
//         maxBarThickness: 30
//       }]
//     });
//   };

//   const handleOpenModal = (app = null) => {
//     setEditingApp(app);
//     setFormData(app || { student: '', university: '', program: '', visaStatus: 'Pending' });
//     setSelectedUniversityId(app?.university?._id || '');
//     setIsModalOpen(true);
//   };

//   const handleUniversityChange = (e) => {
//     const uniId = e.target.value;
//     setSelectedUniversityId(uniId);
//     setFormData({ ...formData, university: uniId, program: '' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingApp) {
//         await updateApplication(editingApp._id, formData);
//       } else {
//         await createApplication(formData);
//       }
//       fetchData();
//       setIsModalOpen(false);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this application?')) {
//       try {
//         await deleteApplication(id);
//         fetchData();
//       } catch (err) { setError(err.message); }
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="space-y-8">
//       <h1 className="text-3xl font-bold text-gray-900">Visa Applications Dashboard</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-sm shadow-md"><h3 className="font-semibold text-lg mb-4">Status Overview</h3>{statusChartData ? <div className="h-72"><Pie data={statusChartData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} /></div> : <p>No data</p>}</div>
//         <div className="bg-white p-6 rounded-sm shadow-md"><h3 className="font-semibold text-lg mb-4">Success Rate by Country</h3>{countryChartData?.labels.length > 0 ? <div className="h-72"><Bar data={countryChartData} options={{ indexAxis: 'y', maintainAspectRatio: false }} /></div> : <p>No data</p>}</div>
//         <div className="bg-white p-6 rounded-sm shadow-md"><h3 className="font-semibold text-lg mb-4">Top 10 University Success</h3>{universityChartData?.labels.length > 0 ? <div className="h-72"><Bar data={universityChartData} options={{ indexAxis: 'y', maintainAspectRatio: false }} /></div> : <p>No data</p>}</div>
//       </div>

//       <div className="bg-white p-6 rounded-sm shadow-md">
//         <div className="flex justify-between items-center mb-6"><h3 className="font-semibold text-lg">Application Records</h3><button onClick={() => handleOpenModal()} className="px-4 py-2 bg-green-600 text-white rounded-sm">+ Log New Application</button></div>
//         <table className="min-w-full divide-y">
//           <thead className="bg-gray-50"><tr>
//             <th>Student Name</th>
//             <th>Email</th>
//             <th>University & Country</th><th>Program</th><th>Status</th>
//             <th>Action</th>
//           </tr></thead>
//           <tbody className="bg-white divide-y">
//             {applications.map(app => (<tr key={app._id}>
//               <td>{app.student?.name}</td>
//               <td>{app.student?.email}</td>
//               <td>{app.university?.name}, {app.university?.country}</td><td>{universities.flatMap(u => u.programs).find(p => p._id === app.program)?.name || 'N/A'}</td><td>{app.visaStatus}</td><td className="text-right space-x-2"><button onClick={() => handleOpenModal(app)}>Edit</button><button onClick={() => handleDelete(app._id)}>Delete</button></td></tr>))}
//           </tbody>
//         </table>
//       </div>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingApp ? 'Edit Application' : 'Log New Application'}>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <select name="student" value={formData.student?._id || formData.student || ''} onChange={(e) => setFormData({ ...formData, student: e.target.value })} className="w-full border p-2 rounded-sm"><option value="">Select a Student</option>{students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}</select>
//           <select name="university" value={selectedUniversityId} onChange={handleUniversityChange} className="w-full border p-2 rounded-sm"><option value="">Select a University</option>{universities.map(u => <option key={u._id} value={u._id}>{u.name} ({u.country})</option>)}</select>
//           <select name="program" value={formData.program || ''} onChange={(e) => setFormData({ ...formData, program: e.target.value })} className="w-full border p-2 rounded-sm" disabled={!selectedUniversityId}><option value="">Select a Program</option>{availablePrograms.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}</select>
//           <select name="visaStatus" value={formData.visaStatus || 'Pending'} onChange={(e) => setFormData({ ...formData, visaStatus: e.target.value })} className="w-full border p-2 rounded-sm"><option>Pending</option><option>Approved</option><option>Rejected</option><option>Withdrawn</option></select>
//           <button type="submit">Save Record</button>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default ManageApplicationsPage;

import { useState, useEffect, useMemo } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { getApplications, createApplication, updateApplication, deleteApplication } from '../services/applicationService';
import { getApplicationStats } from '../services/dashboardService';
import { getMyStudents } from '../services/studentService';
import { getPartnerUniversities } from '../services/universityService';
import Modal from '../components/Modal';

// Icons (assuming you're using Heroicons or similar)
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { AlertCircle, CheckCircleIcon, ClockIcon, CrossIcon, XCircleIcon } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ManageApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [statusChartData, setStatusChartData] = useState(null);
  const [countryChartData, setCountryChartData] = useState(null);
  const [universityChartData, setUniversityChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedUniversityId, setSelectedUniversityId] = useState('');

  const availablePrograms = useMemo(() => {
    if (!selectedUniversityId) return [];
    const selectedUni = universities.find(u => u._id === selectedUniversityId);
    return selectedUni?.programs || [];
  }, [selectedUniversityId, universities]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appsData, studentsData, statsData, unisData] = await Promise.all([
        getApplications(),
        getMyStudents(),
        getApplicationStats(),
        getPartnerUniversities(),
      ]);
      setApplications(appsData);
      setStudents(studentsData);
      setUniversities(unisData.universities);
      updateCharts(appsData, statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateCharts = (apps, stats) => {
    // Status Pie Chart
    const pieLabels = stats.map(s => s.status);
    const pieData = stats.map(s => s.count);
    setStatusChartData({
      labels: pieLabels,
      datasets: [{
        data: pieData,
        backgroundColor: ['#10B981', '#EF4444', '#F59E0B', '#6B7280'],
        borderWidth: 0,
        hoverOffset: 15
      }]
    });

    // Country Success Rate Chart
    const countryGroups = apps.reduce((acc, app) => {
      const country = app.university?.country;
      if (!country) return acc;
      if (!acc[country]) acc[country] = { total: 0, approved: 0 };
      acc[country].total++;
      if (app.visaStatus === 'Approved') acc[country].approved++;
      return acc;
    }, {});
    const countryStats = Object.entries(countryGroups).map(([country, stats]) => ({
      country,
      successRate: stats.total > 0 ? (stats.approved / stats.total) * 100 : 0
    })).sort((a, b) => b.successRate - a.successRate);
    setCountryChartData({
      labels: countryStats.map(s => s.country),
      datasets: [{
        label: 'Success Rate (%)',
        data: countryStats.map(s => s.successRate),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 4,
        maxBarThickness: 30
      }]
    });

    // University Success Rate Chart
    const universityGroups = apps.reduce((acc, app) => {
      const universityId = app.university?._id;
      const universityName = app.university?.name;
      if (!universityId || !universityName) return acc;
      if (!acc[universityId]) {
        acc[universityId] = { name: universityName, total: 0, approved: 0 };
      }
      acc[universityId].total++;
      if (app.visaStatus === 'Approved') acc[universityId].approved++;
      return acc;
    }, {});
    const universityStats = Object.values(universityGroups).map(stats => ({
      name: stats.name,
      successRate: stats.total > 0 ? (stats.approved / stats.total) * 100 : 0,
    })).sort((a, b) => b.successRate - a.successRate).slice(0, 10);
    setUniversityChartData({
      labels: universityStats.map(s => s.name),
      datasets: [{
        label: 'Success Rate (%)',
        data: universityStats.map(s => s.successRate),
        backgroundColor: 'rgba(5, 150, 105, 0.8)',
        borderRadius: 4,
        maxBarThickness: 30
      }]
    });
  };

  const handleOpenModal = (app = null) => {
    setEditingApp(app);
    setFormData(app || { student: '', university: '', program: '', visaStatus: 'Pending' });
    setSelectedUniversityId(app?.university?._id || '');
    setIsModalOpen(true);
  };

  const handleUniversityChange = (e) => {
    const uniId = e.target.value;
    setSelectedUniversityId(uniId);
    setFormData({ ...formData, university: uniId, program: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingApp) {
        await updateApplication(editingApp._id, formData);
      } else {
        await createApplication(formData);
      }
      fetchData();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteApplication(id);
        fetchData();
      } catch (err) { setError(err.message); }
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Withdrawn':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
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
  );

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visa Applications Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and track all student visa applications</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-sm transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Log New Application
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-sm  border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-50">
              <DocumentTextIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-900">{applications.length}</h2>
              <p className="text-gray-600">Total Applications</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm  border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-50">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-900">{students.length}</h2>
              <p className="text-gray-600">Total Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm  border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-50">
              <AcademicCapIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-900">{universities.length}</h2>
              <p className="text-gray-600">Partner Universities</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm  border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-50">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.visaStatus === 'Approved').length}
              </h2>
              <p className="text-gray-600">Approved Visas</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm  border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-50">
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.visaStatus === 'Rejected').length}
              </h2>
              <p className="text-gray-600">Rejected Visas</p>
            </div>
          </div>



        </div>

        <div className="bg-white p-6 rounded-sm  border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-50">
              <ClockIcon className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.visaStatus === 'Pending').length}
              </h2>
              <p className="text-gray-600">Pending Visas</p>
            </div>
          </div>



        </div>
      </div>

      {/* Charts Section
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-sm  border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-green-50 mr-3">
              <ChartBarIcon className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">Status Overview</h3>
          </div>
          {statusChartData ?
            <div className="h-72">
              <Pie
                data={statusChartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        padding: 20
                      }
                    }
                  }
                }}
              />
            </div> :
            <p className="text-gray-500 text-center py-12">No data available</p>
          }
        </div>

        <div className="bg-white p-6 rounded-sm  border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-green-50 mr-3">
              <GlobeAltIcon className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">Success Rate by Country</h3>
          </div>
          {countryChartData?.labels.length > 0 ?
            <div className="h-72">
              <Bar
                data={countryChartData}
                options={{
                  indexAxis: 'y',
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div> :
            <p className="text-gray-500 text-center py-12">No data available</p>
          }
        </div>

        <div className="bg-white p-6 rounded-sm  border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-green-50 mr-3">
              <AcademicCapIcon className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">Top 10 University Success</h3>
          </div>
          {universityChartData?.labels.length > 0 ?
            <div className="h-72">
              <Bar
                data={universityChartData}
                options={{
                  indexAxis: 'y',
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div> :
            <p className="text-gray-500 text-center py-12">No data available</p>
          }
        </div>
      </div> */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Overview */}
        <div className="bg-white p-6 rounded-sm  border border-gray-100 hover:shadow-md transition">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-sm bg-gradient-to-br from-green-50 to-green-100 mr-3">
              <ChartBarIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">Status Overview</h3>
          </div>
          {statusChartData ? (
            <div className="h-72">
              <Pie
                data={statusChartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        padding: 16,
                      },
                    },
                  },
                }}
              />
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">No data available</p>
          )}
        </div>

        {/* Success Rate by Country */}
        <div className="bg-white p-6 rounded-sm  border border-gray-100 hover:shadow-md transition">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-sm bg-gradient-to-br from-blue-50 to-blue-100 mr-3">
              <GlobeAltIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">Success Rate by Country</h3>
          </div>
          {countryChartData?.labels.length > 0 ? (
            <div className="h-72">
              <Bar
                data={countryChartData}
                options={{
                  indexAxis: "y",
                  maintainAspectRatio: false,
                  borderRadius: 8,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: { grid: { color: "rgba(0,0,0,0.05)" } },
                    y: { grid: { display: false } },
                  },
                }}
              />
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">No data available</p>
          )}
        </div>

        {/* University Success */}
        <div className="bg-white p-6 rounded-sm  border border-gray-100 hover:shadow-md transition">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-sm bg-gradient-to-br from-purple-50 to-purple-100 mr-3">
              <AcademicCapIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">Top 10 University Success</h3>
          </div>
          {universityChartData?.labels.length > 0 ? (
            <div className="h-72">
              <Bar
                data={universityChartData}
                options={{
                  indexAxis: "y",
                  maintainAspectRatio: false,
                  borderRadius: 8,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: { grid: { color: "rgba(0,0,0,0.05)" } },
                    y: { grid: { display: false } },
                  },
                }}
              />
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">No data available</p>
          )}
        </div>
      </div>


      {/* Application Records Table */}
      <div className="bg-white p-6 rounded-sm  border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">Application Records</h3>
            <p className="text-gray-600 text-sm">All visa applications managed in the system</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-sm transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Application
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University & Country</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map(app => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{app.student?.name}</div>
                    <div className="text-sm text-gray-500">{app.student?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{app.university?.name}</div>
                    <div className="text-sm text-gray-500">{app.university?.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {universities.flatMap(u => u.programs).find(p => p._id === app.program)?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(app.visaStatus)}`}>
                      {app.visaStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(app)}
                        className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50"
                        title="Edit application"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                        title="Delete application"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {applications.length === 0 && (
            <div className="text-center py-12">
              <DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto" />
              <p className="mt-4 text-gray-500">No applications found. Create your first application.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingApp ? 'Edit Application' : 'Log New Application'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
            <select
              name="student"
              value={formData.student?._id || formData.student || ''}
              onChange={(e) => setFormData({ ...formData, student: e.target.value })}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select a Student</option>
              {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
            <select
              name="university"
              value={selectedUniversityId}
              onChange={handleUniversityChange}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select a University</option>
              {universities.map(u => <option key={u._id} value={u._id}>{u.name} ({u.country})</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
            <select
              name="program"
              value={formData.program || ''}
              onChange={(e) => setFormData({ ...formData, program: e.target.value })}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              disabled={!selectedUniversityId}
              required
            >
              <option value="">Select a Program</option>
              {availablePrograms.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Visa Status</label>
            <select
              name="visaStatus"
              value={formData.visaStatus || 'Pending'}
              onChange={(e) => setFormData({ ...formData, visaStatus: e.target.value })}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {editingApp ? 'Update' : 'Create'} Application
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageApplicationsPage;