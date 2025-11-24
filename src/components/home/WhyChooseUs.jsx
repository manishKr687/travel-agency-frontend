import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.h2
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center font-heading text-4xl text-secondary mb-12"
      >
        Why Choose Us
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {["1000+ Happy Travellers", "Premium Hotels & Transport", "24/7 Support"].map(
          (item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white shadow-md rounded-xl p-8 hover:shadow-lg transition"
            >
              <Star className="mx-auto text-accent w-10 h-10 mb-4" />
              <p className="text-lg font-semibold text-secondary">{item}</p>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
