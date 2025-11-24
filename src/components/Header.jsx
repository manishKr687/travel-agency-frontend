import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="font-heading text-2xl text-secondary font-bold tracking-wide">
          Himalyan
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-secondary">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/packages" className="hover:text-primary transition">Packages</Link>
          {/* <Link to="/about" className="hover:text-primary transition">About</Link>
          <Link to="/contact" className="hover:text-primary transition">Contact</Link> */}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg">
          <nav className="flex flex-col items-center space-y-4 py-4 font-medium text-secondary">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition">Home</Link>
            <Link to="/packages" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition">Packages</Link>
            {/* <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition">About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition">Contact</Link> */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
