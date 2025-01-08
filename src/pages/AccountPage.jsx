import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

const AccountPage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('shops-jwt');
    if (token) {
      try {
        // Get the payload part of the JWT (second part)
        const payload = token.split('.')[1];
        // Decode the base64 payload
        const decodedData = JSON.parse(atob(payload));
        setUserData(decodedData);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserData(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('shops-jwt');
    setUserData(null);
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-white mt-12 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <UserCircle className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-4 text-xl font-bold text-gray-900">Not Logged In</h2>
            <p className="mt-2 text-gray-600">Please log in to view your account details</p>
          </div>
          <div className="mt-6">
            <button
              onClick={handleLogin}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white mt-12 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-red-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Account Details</h1>
            <UserCircle className="h-8 w-8 text-white" />
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-lg font-medium text-gray-900">{userData.sub}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">User ID</label>
              <p className="mt-1 text-lg font-medium text-gray-900">{userData.id}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Roles</label>
              <div className="mt-1">
                {userData.roles.map((role, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                  >
                    {role.replace('ROLE_', '')}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;