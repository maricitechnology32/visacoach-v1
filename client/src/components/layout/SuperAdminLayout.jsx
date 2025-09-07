import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SuperAdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // ==> FIX: Updated the links to match our router setup <==
  const adminLinks = [
    { to: '/dashboard', text: 'Dashboard' },
    { to: '/manage-consultancies', text: 'Manage Consultancies' },
    { to: '/manage-checklists', text: 'Manage Checklists' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="px-6 py-4 text-2xl font-bold border-b border-slate-700">
          Platform<span className="text-red-500">Admin</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {adminLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-slate-700' : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`
              }
            >
              {link.text}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-slate-700">
          <div className='text-sm text-slate-400 px-4 mb-2'>
            Signed in as <span className='font-bold'>{user?.name}</span>
          </div>
          <button onClick={handleLogout} className="w-full text-left block px-4 py-2 rounded-md text-sm font-medium text-slate-400 hover:bg-slate-700 hover:text-white">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;