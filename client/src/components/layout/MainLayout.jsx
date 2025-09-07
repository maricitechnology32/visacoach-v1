

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { FaDollarSign, FaRobot, FaUniversity } from 'react-icons/fa';
import {
  FiHome,
  FiUser,
  FiFileText,
  FiBook,
  FiMessageSquare,
  FiEdit,
  FiVideo,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiBookOpen,
  FiCompass,
  FiStar,
  FiFacebook,
  FiPaperclip,
} from 'react-icons/fi';

import logo from '../../../public/logo.png'
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const studentLinks = [
    { to: '/dashboard', text: 'Dashboard', icon: <FiHome size={18} /> },
    { to: '/documents', text: 'Documents', icon: <FiFileText size={18} /> },
    { to: '/courses', text: 'Courses', icon: <FiBook size={18} /> },
    { to: '/forum', text: 'Blogs', icon: <FiMessageSquare size={18} /> },
    { to: '/financials', text: 'Financial Planner', icon: <FaDollarSign size={18} /> },
    { to: '/sop-reviewer', text: 'AI SOP Assistant', icon: <FiEdit size={18} /> },
    { to: '/interview', text: 'Mock Interview', icon: <FiVideo size={18} /> },
    { to: '/ds160', text: 'DS-160 Assistant', icon: <FiBook size={18} /> },
    { to: '/ds160-summary', text: 'DS-160 Summary', icon: <FiBookOpen size={18} /> },
    { to: '/profile', text: 'My Profile', icon: <FiUser size={18} /> },
    // { to: '/universities', text: 'University Explorer', icon: <FiCompass size={18} /> },
    // { to: '/reviews', text: 'Reviews', icon: <FiStar size={18} /> }, 
    { to: '/universities', text: 'Partner Universities', icon: <FaUniversity size={18} /> },
    { to: '/recommendations', text: 'AI Recommendations', icon: <FaRobot size={18} /> }
  ];

  const counselorLinks = [
    { to: '/dashboard', text: 'Dashboard', icon: <FiHome size={18} /> },
    { to: '/students', text: 'Manage Students', icon: <FiUsers size={18} /> },
    { to: '/manage-courses', text: 'Manage Courses', icon: <FiBook size={18} /> },
    { to: '/forum', text: 'Blogs', icon: <FiMessageSquare size={18} /> },
    { to: '/ds160/queue', text: 'DS-160 Review Queue', icon: <FiBookOpen size={18} /> },
    // { to: '/reviews', text: 'Reviews', icon: <FiStar size={18} /> },
    { to: '/manage-universities', text: 'Partner Universities', icon: < FaUniversity size={18} /> },
    { to: '/applications', text: 'Manage Applications', icon: <DocumentTextIcon className="h-5 w-5" /> },
  ];

  const links = user?.role === 'student' ? studentLinks : counselorLinks;

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-green-600 text-white shadow-md hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white  flex flex-col fixed lg:relative inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Brand Header */}
        <div className="  border-b border-gray-200 flex justify-center items-center">
          <img className='h-20 w-20' src={logo} alt="" />
          {/* <div className="text-2xl font-bold text-green-700 tracking-tight">
            Visa<span className="text-green-500">Coach</span>
          </div> */}

        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-green-700'
                }`
              }
            >
              <span className="mr-3 text-gray-500">{link.icon}</span>
              {link.text}
            </NavLink>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition focus:outline-none"
            >
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold mr-3 shadow-inner">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              <FiChevronDown
                className={`ml-auto transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <FiUser className="mr-3" size={16} />
                  Profile Settings
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <FiSettings className="mr-3" size={16} />
                  Preferences
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  <FiLogOut className="mr-3" size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col   overflow-hidden lg:ml-0">
        <header className="bg-white shadow-sm py-8 px-5 flex justify-end items-center border-b border-gray-200">
           
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              
              <span className="text-green-600">{user?.name}!</span>
              
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 py-6 md:px-8 md:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
