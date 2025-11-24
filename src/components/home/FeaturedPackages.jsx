import React from 'react';
import { Link } from 'react-router-dom';
import PackageCard from '../PackageCard';

const FeaturedPackages = ({ packages, loading }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="font-heading text-4xl text-secondary text-center mb-12">
        Featured Packages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <p>Loading...</p>
        ) : packages.length > 0 ? (
          packages.slice(0, 3).map((pkg) => (
            <PackageCard key={pkg.id} packageItem={pkg} />
          ))
        ) : (
          <p>No packages available.</p>
        )}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/packages"
          className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition"
        >
          View All Packages
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPackages;
