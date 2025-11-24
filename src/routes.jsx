import React from 'react';
import { Navigate } from 'react-router-dom';
import TravelAgencyApp from './components/TravelAgencyApp';
import HomePage from './pages/HomePage';
import PackageListingPage from './pages/PackageListingPage';
import PackageDetailPage from './pages/PackageDetailPage';
import InquiryPage from './pages/InquiryPage';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminInquiries from './admin/AdminInquiries';
import AdminPackages from './admin/AdminPackages';
import AddPackageForm from './admin/AddPackageForm';
import PrivateRoute from './admin/PrivateRoute';

export const routes = [
  {
    path: '/',
    element: <TravelAgencyApp />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'packages',
        element: <PackageListingPage />,
      },
      {
        path: 'packages/:id',
        element: <PackageDetailPage />,
      },
      {
        path: 'inquire/:id',
        element: <InquiryPage />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard/inquiries" />,
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />,
        children: [
          {
            index: true,
            element: <Navigate to="inquiries" />,
          },
          {
            path: 'inquiries',
            element: <AdminInquiries />,
          },
          {
            path: 'packages',
            element: <AdminPackages />,
          },
        ],
      },
      {
        path: 'packages/add',
        element: <AddPackageForm />,
      },
    ],
  },
];
