import React from 'react';

const TestimonialCard = ({ quote, name, location }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col justify-between">
    <p className="text-gray-600 italic mb-4">
      "{quote}"
    </p>
    <div className="mt-auto">
      <p className="font-semibold text-gray-800">{name}</p>
      <p className="text-sm text-teal-600">{location}</p>
    </div>
  </div>
);

export default TestimonialCard;