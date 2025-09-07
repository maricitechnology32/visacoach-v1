// client/src/components/ProtectedRoute.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Show a loading indicator while the auth status is being checked
  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner component
  }

  // If loading is finished and there's no user, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the nested child route
  return <Outlet />;
};

export default ProtectedRoute;