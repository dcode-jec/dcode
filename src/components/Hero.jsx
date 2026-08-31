import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LinuxTerminal from './Terminal';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[921px] flex items-center justify-center px-8 py-20 overflow-hidden mt-10">
      {/* Glow effect behind hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none z-[-1]"></div>
      
      <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-surface w-fit border border-primary-container/30 inner-border-highlight">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="font-code-display text-sm text-primary-fixed-dim">sys.boot(JEC_Coding_Club)</span>
          </div>
          
          <h1 className="font-headline-xl text-5xl md:text-6xl text-on-surface leading-tight font-bold">
            Where ideas <br/>
            <span className="text-primary-container text-glow">compile</span> into <br/>
            impact.
          </h1>
          
          <p className="font-body-lg text-lg text-on-surface-variant max-w-xl">
            Welcome to DCODE, the premier coding community of Jorhat Engineering College. We build, break, and innovate together.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a href="#about" className="bg-primary-container text-black font-label-caps text-xs uppercase px-8 py-4 rounded hover:bg-primary transition-all active:scale-95 flex items-center gap-2 font-bold shadow-[0_0_15px_rgba(254,149,32,0.3)] hover:shadow-[0_0_25px_rgba(254,149,32,0.5)] tracking-wider cursor-pointer">
              Explore DCODE
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <Link to="/contact" className="glass-surface text-on-surface font-label-caps text-xs uppercase px-8 py-4 rounded hover:bg-white/5 transition-all inner-glow active:scale-95 flex items-center gap-2 tracking-wider cursor-pointer">
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Interactive Terminal Graphic */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotate: 2 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ rotate: 0, scale: 1.01 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-[550px] mx-auto lg:ml-auto"
        >
          <LinuxTerminal username="user" hostname="dcode" height={480} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

