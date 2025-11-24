import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home as HomeIcon, Map, X, Menu } from 'lucide-react';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItemClass = ({ isActive }) =>
    `cursor-pointer px-4 py-2.5 font-medium font-sans rounded-lg transition duration-300 ${
      isActive ? 'text-primary-50 bg-primary-700' : 'text-black hover:bg-primary-600'
    }`;

  return (
    <header className="bg-primary-100 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-black font-heading cursor-pointer">
              <span className="text-5xl">✈️</span> {t('header.appName')}
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <NavLink to="/" className={navItemClass}>
              <HomeIcon className="w-5 h-5 inline mr-1" /> {t('header.home')}
            </NavLink>
            <NavLink to="/packages" className={navItemClass}>
              <Map className="w-5 h-5 inline mr-1" /> {t('header.packages')}
            </NavLink>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-primary-50 hover:bg-primary-600 transition"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-primary-600 bg-primary-DEFAULT p-4">
          <NavLink to="/" className={navItemClass} onClick={() => setIsMenuOpen(false)}>
            <HomeIcon className="w-5 h-5 inline mr-2" /> {t('header.home')}
          </NavLink>
          <NavLink to="/packages" className={`mt-2 ${navItemClass}`} onClick={() => setIsMenuOpen(false)}>
            <Map className="w-5 h-5 inline mr-2" /> {t('header.packages')}
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;