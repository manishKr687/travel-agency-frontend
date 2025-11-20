import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import authService from '../auth/authService';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white h-screen">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin</h2>
        </div>
        <nav>
          <ul>
            <li className="p-4 hover:bg-gray-700"><Link to="/admin/dashboard/inquiries">Inquiries</Link></li>
            <li className="p-4 hover:bg-gray-700"><Link to="/admin/dashboard/packages">Packages</Link></li>
          </ul>
        </nav>
        <div className="p-4 absolute bottom-0 w-64">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-grow p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
