// client/src/pages/SetPasswordPage.jsx
import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { setPassword as setPasswordService } from '../services/authService';

const SetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!token) {
      setError('Invalid or missing invitation token.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const data = await setPasswordService(token, password);
      setSuccess(data.message);
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 secs
    } catch (err) {
      setError(err.message || 'Failed to set password. The link may be expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Set Your Account Password</h2>

        {success ? (
          <div className="text-center">
            <p className="text-green-600">{success}</p>
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Proceed to Login
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 relative block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                required
                className="mt-1 relative block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <div>
              <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400">
                {loading ? 'Setting Password...' : 'Set Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SetPasswordPage;