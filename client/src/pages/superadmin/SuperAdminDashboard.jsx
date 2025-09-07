// client/src/pages/superadmin/SuperAdminDashboard.jsx
import { useState, useEffect } from 'react';
import { getPlatformStats } from '../../services/adminService';

const StatCard = ({ title, value, color }) => (
  <div className={`bg-white p-6 rounded-lg shadow`}>
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className={`mt-1 text-3xl font-semibold ${color}`}>{value}</p>
  </div>
);

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await getPlatformStats();
        setStats(statsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading platform analytics...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Platform Overview</h1>
        <p className="mt-1 text-md text-gray-600">High-level statistics for the entire application.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Consultancies" value={stats?.totalConsultancies} color="text-indigo-600" />
        <StatCard title="Total Counselors" value={stats?.totalCounselors} color="text-blue-600" />
        <StatCard title="Total Students" value={stats?.totalStudents} color="text-green-600" />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;