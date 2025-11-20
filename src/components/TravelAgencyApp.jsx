import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import Header from './Header';

const MOCK_PACKAGES = [
  { id: 1, name: "Mystical Bali Retreat", type: "Luxury", theme: "Relaxation", price: 4500, duration: 7, location: "Indonesia", image: "https://placehold.co/800x600/10b981/ffffff?text=Bali" },
  { id: 2, name: "Tokyo Neon Adventure", type: "Premium", theme: "City Break", price: 3200, duration: 5, location: "Japan", image: "https://placehold.co/800x600/f59e0b/ffffff?text=Tokyo" },
  { id: 3, name: "Alps Hiking Expedition", type: "Standard", theme: "Adventure", price: 2100, duration: 10, location: "Switzerland", image: "https://placehold.co/800x600/3b82f6/ffffff?text=Alps" },
  { id: 4, name: "Amazon Rainforest Tour", type: "Budget", theme: "Nature", price: 950, duration: 4, location: "Brazil", image: "https://placehold.co/800x600/ef4444/ffffff?text=Amazon" },
  { id: 5, name: "Venice Romantic Getaway", type: "Luxury", theme: "Romance", price: 5800, duration: 6, location: "Italy", image: "https://placehold.co/800x600/6366f1/ffffff?text=Venice" },
  { id: 6, name: "Sahara Desert Camping", type: "Premium", theme: "Adventure", price: 2800, duration: 3, location: "Morocco", image: "https://placehold.co/800x600/06b6d4/ffffff?text=Sahara" },
];

const TravelAgencyApp = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />

      <div className="flex-grow">
        <Outlet context={{ MOCK_PACKAGES }} />
      </div>

      {/* Footer (branding and contact information as required by documentation) */}
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-3 text-teal-400">TRVL Agency</h4>
            <p className="text-gray-400 text-sm">
              Curating unforgettable experiences since 2024. Your journey starts here.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-200">Contact Us</h4>
            <p className="text-sm text-gray-400 flex items-center mb-1">
              <MapPin className="w-4 h-4 mr-2 text-teal-400" /> 123 Global Path, Wanderland
            </p>
            <p className="text-sm text-gray-400 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-teal-400" /> hello@trvlagency.com
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-200">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-teal-400 transition">Home</Link></li>
              <li><Link to="/packages" className="text-gray-400 hover:text-teal-400 transition">Packages</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition">Testimonials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition">Blog (Mock)</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} TRVL Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TravelAgencyApp;