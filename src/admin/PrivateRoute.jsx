import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../auth/authService';

const PrivateRoute = () => {
  const isAuthenticated = authService.isAuthenticated();

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
