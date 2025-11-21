import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WhatsAppButton from './components/WhatsAppButton';
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

function App() {
  return (
    <Router>
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<TravelAgencyApp />}>
          <Route index element={<HomePage />} />
          <Route path="packages" element={<PackageListingPage />} />
          <Route path="packages/:id" element={<PackageDetailPage />} />
          <Route path="inquire/:id" element={<InquiryPage />} />
        </Route>
        {/* TODO: For current version below routes are not important */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="" element={<Navigate to="dashboard/inquiries" />} />
          <Route path="dashboard" element={<AdminDashboard />}>
            <Route index element={<Navigate to="inquiries" />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="packages" element={<AdminPackages />} />
          </Route>
          <Route path="packages/add" element={<AddPackageForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;