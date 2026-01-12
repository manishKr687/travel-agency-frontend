import React from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import { MapPin, Clock, Zap, ArrowLeft } from 'lucide-react';

const PackageDetailPage = () => {
  const { id } = useParams();
  const { packages, loading } = useOutletContext();

  if (loading) {
    return <div className="text-center py-20">Loading package details...</div>;
  }

  const packageItem = packages.find(p => p.id === Number(id));

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
        <Link to="/packages" className="inline-flex items-center text-tertiary-600 hover:text-gray-800 transition mb-6">
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
                {packageItem.destination}
              </span>
              <span className="flex items-center font-medium">
                <Clock className="w-5 h-5 mr-2 text-teal-500" />
                {packageItem.duration} Days
              </span>
              <span className="flex items-center font-medium">
                <Zap className="w-5 h-5 mr-2 text-teal-500" />
                {(packageItem.theme && packageItem.theme.join(', ')) || 'General'}
              </span>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {(packageItem.type || ['Standard']).map((type, index) => (
                <span key={index} className={`px-4 py-1.5 text-sm font-semibold rounded-full shadow-md ${
                  type === 'Luxury' ? 'bg-yellow-500 text-yellow-900' :
                  type === 'Premium' ? 'bg-indigo-500 text-white' :
                  type === 'Standard' ? 'bg-teal-500 text-white' :
                  'bg-gray-600 text-white'
                }`}>
                  {type} Package
                </span>
              ))}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Immerse yourself in the breathtaking landscapes of {packageItem.destination}. This {packageItem.duration}-day {((packageItem.theme && packageItem.theme.join(', ')) || 'General').toLowerCase()} adventure is a {(packageItem.type || ['Standard']).join(' / ').toLowerCase()} experience designed to create lasting memories. Explore vibrant cultures, stunning natural wonders, and enjoy world-class amenities.
            </p>

            {packageItem.isOfferApplied && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm text-green-800 font-semibold mb-1">Special Offer!</p>
                <p className="text-lg text-green-700">{packageItem.offer.description} Get {packageItem.offer.discountPercentage}% off!</p>
              </div>
            )}

            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-8">
              {packageItem.isOfferApplied ? (
                <>
                  <p className="text-xl font-semibold text-gray-500 line-through">
                    <span className="text-lg mr-1">$</span>{packageItem.price.toLocaleString()}
                  </p>
                  <p className="text-3xl font-extrabold text-red-600">
                    <span className="text-2xl mr-1">$</span>{(packageItem.price * (1 - packageItem.offer.discountPercentage / 100)).toLocaleString()}
                    <span className="text-lg font-medium text-gray-600"> / person</span>
                  </p>
                </>
              ) : (
                <p className="text-3xl font-extrabold text-teal-700">
                  <span className="text-2xl mr-1">$</span>{packageItem.price.toLocaleString()}
                  <span className="text-lg font-medium text-gray-600"> / person</span>
                </p>
              )}
            </div>

            <Link
              to={`/inquire/${packageItem.id}`}
              className="w-full px-8 py-4 bg-teal-600 text-white font-bold text-lg rounded-xl shadow-2xl hover:bg-teal-700 transform hover:scale-105 transition duration-300 flex items-center justify-center"
            >
              Inquiry Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PackageDetailPage;
