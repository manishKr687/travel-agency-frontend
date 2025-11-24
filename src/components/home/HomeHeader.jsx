import React from 'react';
import { Link } from 'react-router-dom';

const HomeHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="font-heading text-2xl text-secondary font-bold tracking-wide">
          VoyageX
        </h1>

        <nav className="hidden md:flex items-center space-x-8 font-medium text-secondary">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/packages" className="hover:text-primary transition">Packages</Link>
          <Link to="/about" className="hover:text-primary transition">About</Link>
          <Link to="/contact" className="hover:text-primary transition">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
