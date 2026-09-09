import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import mind from "../assets/gallery/mindmaze3.0.JPG"
import code from "../assets/gallery/codeclas3.0.jpeg"
import hackvita from "../assets/gallery/hackvita4.0.jpeg"

const Gallery = () => {
  const images = [
    { src: mind, type: "Flagship Contest", title: "Mind Maze 3.0" },
    { src: code, type: "Coding Competition", title: "Code Clash 3.0" },
    { src: hackvita, type: "Hackathon", title: "Hackvita 4.0" }
  ];

  return (
    <section id="gallery" className="py-24 max-w-[1280px] mx-auto px-8 relative z-10">
      <header className="mb-12">
        <h2 className="font-headline-xl text-4xl md:text-5xl font-bold text-on-surface mb-4">SYSTEM <span className="text-primary-container">LOGS</span></h2>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl">A visual repository of our most impactful events and interactions.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`relative group rounded-xl overflow-hidden bg-surface-container border border-white/5 shadow-lg aspect-[4/3]`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            <img src={img.src} alt={img.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
            <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <span className="font-code-display text-[12px] text-primary-container mb-2 block bg-black/50 w-fit px-2 py-1 rounded backdrop-blur-sm">{img.type}</span>
              <h3 className="font-headline-md text-2xl font-bold text-on-surface mb-1">{img.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/gallery" className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-on-primary transition-colors px-6 py-3 rounded-md font-code-display font-bold text-sm">
          Explore Full Gallery <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
};

export default Gallery;
