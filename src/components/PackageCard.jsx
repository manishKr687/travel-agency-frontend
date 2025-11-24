import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

const PackageCard = ({ packageItem }) => {
  const navigate = useNavigate();

  const handleInquireClick = (e) => {
    e.stopPropagation();
    navigate(`/inquire/${packageItem.id}`);
  };

  const handleCardClick = () => {
    navigate(`/packages/${packageItem.id}`);
  };

  const fallbackImg =
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=900&q=60"; // beautiful travel image

  return (
    <motion.div
      onClick={handleCardClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer flex flex-col h-full"
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={packageItem.image}
          alt={packageItem.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = fallbackImg;
          }}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* BADGE */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
            packageItem.type === "Luxury"
              ? "bg-yellow-400 text-yellow-900"
              : packageItem.type === "Premium"
              ? "bg-indigo-500 text-white"
              : packageItem.type === "Standard"
              ? "bg-teal-600 text-white"
              : "bg-gray-600 text-white"
          }`}
        >
          {packageItem.type}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-grow">
        {/* TITLE */}
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 line-clamp-2">
          {packageItem.name}
        </h3>

        {/* INFO */}
        <div className="flex flex-wrap text-sm text-gray-600 gap-4 mb-4">
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1 text-primary" />
            {packageItem.location}
          </span>

          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-primary" />
            {packageItem.duration} Days
          </span>

          <span className="flex items-center">
            <Zap className="w-4 h-4 mr-1 text-primary" />
            {packageItem.theme}
          </span>
        </div>

        {/* PRICE + CTA */}
        <div className="flex items-center justify-between mt-auto border-t pt-4">
          <p className="text-2xl font-extrabold text-gray-800">
            ₹{packageItem.price.toLocaleString("en-IN")}
          </p>

          <button
            onClick={handleInquireClick}
            className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 transition shadow-md"
          >
            Inquiry Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;
