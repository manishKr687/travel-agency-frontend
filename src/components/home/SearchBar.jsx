import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SearchBar = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white shadow-md rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input type="text" placeholder="Destination" className="border p-3 rounded-lg" />
        <input type="date" className="border p-3 rounded-lg" />
        <input type="number" placeholder="Travellers" className="border p-3 rounded-lg" />
        <button className="bg-primary text-white rounded-lg px-4 py-3 font-semibold hover:bg-primary/80">
          Search
        </button>
      </motion.div>
    </section>
  );
};

export default SearchBar;
