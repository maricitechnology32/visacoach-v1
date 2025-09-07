/* eslint-disable no-unused-vars */
// client/src/pages/DashboardPage.jsx
import { useAuth } from '../context/AuthContext';
import CounselorDashboard from '../components/dashboards/CounselorDashboard';
import StudentDashboard from '../components/dashboards/StudentDashboard';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  // A simple layout component for the dashboard
  const DashboardLayout = ({ children }) => (
    <div className="min-h-screen bg-gray-100">
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Welcome, {user?.name}</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>
      </header> */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );

  const renderDashboard = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'counselor':
      case 'admin':
        return <CounselorDashboard />;
      // case 'super-admin':
      //   return <AdminDashboard />;
      default:
        return <p>No dashboard available for your role.</p>;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default DashboardPage;