import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Zap } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import TestimonialCard from '../components/TestimonialCard';

const HomePage = () => {
  const { MOCK_PACKAGES } = useOutletContext();

  return (
    <main className="min-h-screen bg-gray-50 font-inter">
      {/* Hero Section */}
      <div className="bg-cover bg-center h-[50vh] flex items-center justify-center relative rounded-b-3xl overflow-hidden shadow-inner" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://placehold.co/1200x600/14b8a6/ffffff?text=Travel+Hero')" }}>
        <div className="text-center p-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            Explore the World, Worry-Free.
          </h2>
          <p className="text-lg sm:text-xl text-teal-100 mb-8">
            Curated packages for every type of traveler. Find your perfect escape.
          </p>
          <Link
            to="/packages"
            className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold text-lg rounded-full shadow-2xl hover:bg-yellow-500 transform hover:scale-105 transition duration-300 flex items-center justify-center mx-auto"
          >
            <Zap className="w-5 h-5 mr-2" /> View All Packages
          </Link>
        </div>
      </div>

      {/* Featured Packages (Mock) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Handpicked Favorites</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PACKAGES.slice(0, 3).map(pkg => (
            <PackageCard
              key={pkg.id}
              packageItem={pkg}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/packages"
            className="px-6 py-3 border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition duration-300"
          >
            See All {MOCK_PACKAGES.length} Destinations
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">What Our Travelers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The Mystical Bali Retreat was beyond perfect. Every detail was handled flawlessly. Highly recommend!"
              name="Sarah J."
              location="New York, USA"
            />
            <TestimonialCard
              quote="Tokyo Neon Adventure was an exhilarating experience! Seamless logistics and incredible local guides."
              name="David Chen"
              location="Singapore"
            />
            <TestimonialCard
              quote="The Alps hike was challenging and rewarding. The agency made the planning stress-free. Five stars!"
              name="Maria P."
              location="Berlin, Germany"
            />
          </div>
        </div>
      </section>

      {/* Blog Teaser (Mock) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Travel Inspiration</h3>
        <div className="bg-teal-50 p-6 rounded-xl shadow-inner flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="text-teal-600 text-5xl flex-shrink-0">📰</div>
          <div>
            <h4 className="text-xl font-bold text-gray-800">10 Tips for Budget Travel in Southeast Asia</h4>
            <p className="text-gray-600 mt-1">Read our latest guide on how to maximize your adventure without breaking the bank.</p>
          </div>
          <button className="flex-shrink-0 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-300 w-full md:w-auto">
            Read Article
          </button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;