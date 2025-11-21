import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home as HomeIcon, Map, X, Menu } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItemClass = ({ isActive }) =>
    `cursor-pointer px-4 py-2 font-medium rounded-lg transition duration-300 ${
      isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-extrabold text-teal-600 cursor-pointer">
            {/* TODO: Update Travel agency name */}
              <span className="text-4xl">✈️</span> TRVL Agency
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <NavLink to="/" className={navItemClass}>
              <HomeIcon className="w-5 h-5 inline mr-1" /> Home
            </NavLink>
            <NavLink to="/packages" className={navItemClass}>
              <Map className="w-5 h-5 inline mr-1" /> Packages
            </NavLink>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 p-4">
          <NavLink to="/" className={navItemClass} onClick={() => setIsMenuOpen(false)}>
            <HomeIcon className="w-5 h-5 inline mr-2" /> Home
          </NavLink>
          <NavLink to="/packages" className={`mt-2 ${navItemClass}`} onClick={() => setIsMenuOpen(false)}>
            <Map className="w-5 h-5 inline mr-2" /> Packages
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;