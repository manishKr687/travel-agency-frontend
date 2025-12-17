import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// import { Mail, MapPin } from 'lucide-react';
import Header from './Header';
import Footer from './home/Footer';
import ScrollToTop from './ScrollToTop';

import { usePackages } from '../context/PackagesContext';

const TravelAgencyApp = () => {

  const { packages, loading } = usePackages();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <ScrollToTop />

      <div className="flex-grow">
        <Outlet context={{ packages, loading }} />
      </div>
      <Footer />
    </div>
  );
};

export default TravelAgencyApp;