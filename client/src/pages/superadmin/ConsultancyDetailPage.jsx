/* eslint-disable no-unused-vars */
// client/src/pages/superadmin/ConsultancyDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getConsultancyById, getConsultancyUsers } from '../../services/adminService';

const ConsultancyDetailPage = () => {
  const [consultancy, setConsultancy] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { consultancyId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you'd fetch the consultancy details too. For now, we'll just fetch users.
        // const consultancyData = await getConsultancyById(consultancyId);
        // setConsultancy(consultancyData);
        const usersData = await getConsultancyUsers(consultancyId);
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [consultancyId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Link to="/dashboard" className="text-indigo-600 hover:underline mb-4 inline-block">&larr; Back to All Consultancies</Link>
      <h1 className="text-2xl font-bold">Counselors</h1>
      <p className="text-gray-600 mb-6">Users associated with this consultancy.</p>

      {/* Table of Counselors */}
      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500 capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultancyDetailPage;