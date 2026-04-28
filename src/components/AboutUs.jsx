import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const modules = [
    {
      icon: "groups",
      title: "Community",
      desc: "A network of passionate developers collaborating, sharing knowledge, and growing together."
    },
    {
      icon: "school",
      title: "Learning",
      desc: "Workshops, bootcamps, and peer-to-peer mentoring to master new technologies."
    },
    {
      icon: "code_blocks",
      title: "Projects",
      desc: "Building real-world applications that solve actual problems and add value to resumes."
    },
    {
      icon: "emoji_events",
      title: "Competitions",
      desc: "Hackathons and coding challenges designed to test skills under pressure and spark innovation."
    }
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <h2 className="font-headline-md text-3xl md:text-4xl font-bold text-on-surface mb-4">Core Modules</h2>
          <p className="font-body-lg text-lg text-on-surface-variant">The functional blocks that make up our club's architecture.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-xl inner-border-highlight glow-hover transition-all duration-300 group"
            >
              <span className="material-symbols-outlined text-4xl text-primary-container mb-6 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                {mod.icon}
              </span>
              <h3 className="font-headline-md text-2xl font-bold text-on-surface mb-3">{mod.title}</h3>
              <p className="font-body-sm text-sm text-on-surface-variant">{mod.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
