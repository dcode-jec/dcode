import React from 'react';
import { motion } from 'framer-motion';
import mind from "../assets/gallery/mindmaze3.0.JPG"
import code from "../assets/gallery/codeclas3.0.jpeg"
import language from "../assets/gallery/language.jpg"
import dsa from "../assets/gallery/dsa.jpeg"
import afterparty from "../assets/gallery/afterparty.jpeg"
import hackvita from "../assets/gallery/hackvita4.0.jpeg"

const Gallery = () => {
  const images = [
    { src: mind, type: "Flagship Contest", title: "Mind Maze 3.0", span: "row-span-2" },
    { src: code, type: "Coding Competition", title: "Code Clash 3.0", span: "" },
    { src: hackvita, type: "Hackathon", title: "Hackvita 4.0", span: "row-span-2" },
    { src: dsa, type: "DSA PREPARATION", title: "DSA Worksop", span: "row-span-2" },
    { src: language, type: "Language", title: "Language Orientation", span: "" },
    { src: afterparty, type: "CULTURE", title: "CLUB Afterparty", span: "" }
  ];

  return (
    <section id="gallery" className="py-24 max-w-[1280px] mx-auto px-8 relative z-10">
      <header className="mb-12">
        <h2 className="font-headline-xl text-4xl md:text-5xl font-bold text-on-surface mb-4">SYSTEM <span className="text-primary-container">LOGS</span></h2>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl">A visual repository of our most impactful hackathons, rigorous technical workshops, and vibrant community interactions.</p>
      </header>

      <div className="bg-surface-container-low rounded-lg border border-white/5 p-1 mb-8 overflow-x-auto flex gap-2 w-full max-w-3xl items-center">
        <div className="px-3 py-2 flex gap-1.5 items-center mr-2">
          <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
          <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
          <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
        </div>
        <button className="px-4 py-2 rounded bg-primary-container/10 border border-primary-container font-code-display text-sm text-primary whitespace-nowrap">./view_all</button>
        {['--filter=hackathons', '--filter=workshops', '--filter=culture'].map(f => (
          <button key={f} className="px-4 py-2 rounded bg-transparent border border-transparent hover:border-outline-variant hover:bg-surface-container font-code-display text-sm text-on-surface-variant transition-all whitespace-nowrap">{f}</button>
        ))}
        <div className="px-2 font-code-display text-on-surface-variant animate-pulse ml-auto">_</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 3) * 0.1 }}
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
    </section>
  );
};

export default Gallery;
