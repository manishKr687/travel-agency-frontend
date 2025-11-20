import React from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import { MapPin, Clock, Zap, ArrowLeft } from 'lucide-react';

const PackageDetailPage = () => {
  const { id } = useParams();
  const { MOCK_PACKAGES } = useOutletContext();
  const packageItem = MOCK_PACKAGES.find(p => p.id === parseInt(id));

  if (!packageItem) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">Package not found</h2>
        <Link to="/packages" className="mt-4 inline-block text-teal-600 hover:underline">
          Back to all packages
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/packages" className="inline-flex items-center text-teal-600 hover:text-teal-800 transition mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Packages
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left side: Image */}
          <div className="lg:col-span-3">
            <img
              src={packageItem.image}
              alt={packageItem.name}
              className="w-full h-auto object-cover rounded-2xl shadow-2xl"
            />
          </div>

          {/* Right side: Details */}
          <div className="lg:col-span-2 bg-gray-50 p-8 rounded-2xl shadow-lg">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{packageItem.name}</h1>
            
            <div className="flex flex-wrap text-md text-gray-700 mb-6 gap-x-6 gap-y-3">
              <span className="flex items-center font-medium">
                <MapPin className="w-5 h-5 mr-2 text-teal-500" />
                {packageItem.location}
              </span>
              <span className="flex items-center font-medium">
                <Clock className="w-5 h-5 mr-2 text-teal-500" />
                {packageItem.duration} Days
              </span>
              <span className="flex items-center font-medium">
                <Zap className="w-5 h-5 mr-2 text-teal-500" />
                {packageItem.theme}
              </span>
            </div>

            <div className="mb-6">
              <span className={`px-4 py-1.5 text-sm font-semibold rounded-full shadow-md ${
                packageItem.type === 'Luxury' ? 'bg-yellow-500 text-yellow-900' :
                packageItem.type === 'Premium' ? 'bg-indigo-500 text-white' :
                packageItem.type === 'Standard' ? 'bg-teal-500 text-white' :
                'bg-gray-600 text-white'
              }`}>
                {packageItem.type} Package
              </span>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Immerse yourself in the breathtaking landscapes of {packageItem.location}. This {packageItem.duration}-day {packageItem.theme.toLowerCase()} adventure is a {packageItem.type.toLowerCase()} experience designed to create lasting memories. Explore vibrant cultures, stunning natural wonders, and enjoy world-class amenities.
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-8">
              <p className="text-3xl font-extrabold text-teal-700">
                <span className="text-2xl mr-1">$</span>{packageItem.price.toLocaleString()}
                <span className="text-lg font-medium text-gray-600"> / person</span>
              </p>
            </div>

            <Link
              to={`/inquire/${packageItem.id}`}
              className="w-full px-8 py-4 bg-teal-600 text-white font-bold text-lg rounded-xl shadow-2xl hover:bg-teal-700 transform hover:scale-105 transition duration-300 flex items-center justify-center"
            >
              Inquire Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PackageDetailPage;
