import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authService from '../auth/authService';
import { Menu, X } from 'lucide-react'; // Import icons

const AdminDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-800">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 p-4 z-50 
                   md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
                   ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:flex md:flex-col`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t('admin.dashboard.title')}</h2>
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-grow">
          <ul>
            <li className="p-4 hover:bg-gray-700 rounded-md">
              <Link to="/admin/dashboard/inquiries" onClick={() => setIsSidebarOpen(false)}>
                {t('admin.dashboard.inquiriesLink')}
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700 rounded-md">
              <Link to="/admin/dashboard/packages" onClick={() => setIsSidebarOpen(false)}>
                {t('admin.dashboard.packagesLink')}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto p-4"> {/* Use mt-auto to push to bottom */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            {t('admin.dashboard.logoutButton')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <Outlet />
      </main>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;
