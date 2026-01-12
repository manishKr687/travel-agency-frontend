import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h3 className="font-heading text-2xl mb-4">Himalayan Adventure Co. </h3>
          <p className="text-white/70 leading-relaxed">
            Luxury travel experiences crafted with passion, comfort, and unforgettable memories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-3 text-white/80">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/packages" className="hover:text-white transition">Packages</Link></li>
            {/* <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li> */}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Contact</h4>
          <p className="text-white/80">📞 +91 7979003896</p>
          <p className="text-white/80">📧 Vivek.priyadarshi320@gmail.com</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=Valmikinagar, Valmiki Nagar, India, Bihar" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition">📍 Valmikinagar, Valmiki Nagar, India, Bihar</a>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
          <ul className="space-y-3 text-white/80">
            {/* <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li> */}
            <li><a href="https://m.facebook.com/488450518002996/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Facebook</a></li>
            {/* <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Twitter</a></li> */}
          </ul>
        </div>

      </div>

      <div className="text-center text-white/60 mt-12 border-t border-white/20 pt-6 text-sm">
        © {new Date().getFullYear()} Himalayan Adventure Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
