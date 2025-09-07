// // client/src/components/dashboards/CounselorDashboard.jsx
// import { useState, useEffect } from 'react';
// import { getMyStudents } from '../../services/studentService';

// const CounselorDashboard = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const studentData = await getMyStudents();
//         setStudents(studentData);
//       } catch (err) {
//         setError(err.message || 'An error occurred while fetching students.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []); // The empty dependency array means this runs once when the component mounts

//   if (loading) {
//     return <div>Loading students...</div>;
//   }

//   if (error) {
//     return <div className="text-red-600">Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Your Students</h2>
//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         <ul className="divide-y divide-gray-200">
//           {students.length > 0 ? (
//             students.map((student) => (
//               <li key={student._id} className="px-4 py-4 sm:px-6">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm font-medium text-indigo-600 truncate">{student.name}</p>
//                   {/* We can add a status badge later */}
//                 </div>
//                 <div className="mt-2 sm:flex sm:justify-between">
//                   <div className="sm:flex">
//                     <p className="flex items-center text-sm text-gray-500">{student.email}</p>
//                   </div>
//                   <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
//                     {/* We can add a 'View Profile' link here later */}
//                   </div>
//                 </div>
//               </li>
//             ))
//           ) : (
//             <li className="px-4 py-4 sm:px-6">
//               <p className="text-sm text-gray-500">You have not added any students yet.</p>
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CounselorDashboard;

import { useState, useEffect } from 'react';
import { getMyStudents } from '../../services/studentService';
import { getCounselorDashboardData } from '../../services/dashboardService'; // Import analytics service
import { Link } from 'react-router-dom';

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
  </div>
);

const CounselorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both dashboard stats and the student list in parallel
        const [statsData, studentsData] = await Promise.all([
          getCounselorDashboardData(),
          getMyStudents(),
        ]);
        setStats(statsData);
        setStudents(studentsData);
      } catch (err) {
        setError(err.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-8">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Students" value={stats?.totalStudents || 0} />
        <StatCard title="Tasks Completed" value={stats?.tasksByStatus?.completed || 0} />
        <StatCard title="Tasks In Progress" value={stats?.tasksByStatus?.['in-progress'] || 0} />
      </div>

      {/* Student List */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Students</h3>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {students.length > 0 ? (
              students.map((student) => (
                <li key={student._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-md font-medium text-gray-900">{student.name}</p>
                    <Link to={`/students/${student._id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                      View Profile
                    </Link>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{student.email}</p>
                </li>
              ))
            ) : (
              <li className="px-4 py-4 sm:px-6"><p>No students found.</p></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CounselorDashboard;