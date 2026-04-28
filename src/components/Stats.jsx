import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  return (
    <section className="py-12 bg-surface-container border-y border-white/5 relative z-10">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
        {[
          { value: "500+", label: "Members" },
          { value: "50+", label: "Events" },
          { value: "120", label: "Workshops" },
          { value: "200+", label: "Projects" }
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <div className="font-headline-xl text-4xl md:text-5xl font-bold text-primary-container mb-2">{stat.value}</div>
            <div className="font-label-caps text-xs uppercase tracking-widest text-on-surface-variant">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
