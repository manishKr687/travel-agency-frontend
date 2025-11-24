import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Hero = () => {
  return (
    <section className="relative h-[65vh] flex items-center justify-center pt-20 overflow-hidden rounded-b-3xl shadow-md">
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=55"
        />
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=60"
          alt="Hero Travel"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      </picture>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="relative text-center px-4"
      >
        <h1 className="font-heading text-white text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
          Discover Your Next Luxury Escape
        </h1>

        <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Handcrafted travel experiences curated for adventure, comfort, and unforgettable memories.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/packages"
            className="px-8 py-3 rounded-full bg-accent text-secondary font-semibold shadow hover:bg-white transition flex items-center justify-center"
          >
            <Zap className="w-5 h-5 mr-2" /> Explore Packages
          </Link>

          {/* <Link
            to="/contact"
            className="px-8 py-3 rounded-full border border-white text-white font-semibold backdrop-blur hover:bg-white/20 transition"
          >
            Plan My Trip
          </Link> */}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
