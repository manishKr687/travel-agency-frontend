import React from 'react';
import { motion } from 'framer-motion';
import testimonials from '../data/testimonials.json';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Testimonials = () => {
  return (
    <section className="bg-white py-20 px-6">
      <h2 className="font-heading text-4xl text-secondary text-center mb-12">
        What Our Clients Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {testimonials.map((t) => (
          <motion.div
            key={t.id}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-light rounded-xl p-6 shadow-md hover:shadow-lg transition h-full flex flex-col justify-between">
              <p className="text-gray-700 italic">“{t.quote}”</p>
              <div className="mt-4 font-semibold text-secondary">— {t.name}, {t.location}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
