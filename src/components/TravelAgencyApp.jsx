import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// import { Mail, MapPin } from 'lucide-react';
import Header from './Header';
import Footer from './home/Footer';
import { getPackages as getPackagesFromApi } from '../api/packages';

const TravelAgencyApp = () => {
  const location = useLocation();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackagesFromApi();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />

      <div className="flex-grow">
        <Outlet context={{ packages, loading }} />
      </div>
      <Footer />
    </div>
  );
};

export default TravelAgencyApp;