import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Zap } from 'lucide-react';

const PackageCard = ({ packageItem }) => {
  const navigate = useNavigate();

  const handleInquireClick = (e) => {
    e.stopPropagation(); // Prevent the outer Link from triggering
    navigate(`/inquire/${packageItem.id}`);
  };

  return (
    <Link to={`/packages/${packageItem.id}`} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 block">
      <div className="relative h-48 overflow-hidden">
        <img
          src={packageItem.image}
          alt={packageItem.name}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/60a5fa/ffffff?text=Travel+Package"; }}
        />
        <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
          packageItem.type === 'Luxury' ? 'bg-yellow-500 text-yellow-900' :
          packageItem.type === 'Premium' ? 'bg-indigo-500 text-white' :
          packageItem.type === 'Standard' ? 'bg-teal-500 text-white' :
          'bg-gray-600 text-white'
        }`}>
          {packageItem.type}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{packageItem.name}</h3>

        <div className="flex flex-wrap text-sm text-gray-600 mb-4 gap-3">
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1 text-teal-500" />
            {packageItem.location}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-teal-500" />
            {packageItem.duration} Days
          </span>
          <span className="flex items-center">
            <Zap className="w-4 h-4 mr-1 text-teal-500" />
            {packageItem.theme}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 border-t pt-4">
          <p className="text-2xl font-extrabold text-teal-600">
            <span className="text-xl mr-0.5">$</span>{packageItem.price.toLocaleString()}
          </p>
          <button
            onClick={handleInquireClick}
            className="px-4 py-2 bg-teal-600 text-white font-semibold text-sm rounded-lg hover:bg-teal-700 transition duration-300 shadow-lg"
          >
            Inquire Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;