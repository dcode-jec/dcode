import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "SUCCESS: Impact ready for deployment";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 50); // Typing speed

    return () => clearInterval(interval);
  }, []);

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

        {/* Terminal Graphic */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotate: 3 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-square max-w-[500px] mx-auto lg:ml-auto"
        >
          <div className="absolute inset-0 glass-surface rounded-xl overflow-hidden shadow-2xl flex flex-col transition-transform duration-500 inner-border-highlight">
            {/* Terminal Header */}
            <div className="h-10 border-b border-white/10 bg-black/40 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <div className="w-3 h-3 rounded-full bg-primary-container"></div>
              <div className="w-3 h-3 rounded-full bg-surface-tint"></div>
              <div className="mx-auto font-code-display text-[10px] text-on-surface-variant/50 tracking-widest">dcode_terminal ~ bash</div>
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 font-code-display text-sm text-primary-fixed-dim/80 flex-1 overflow-hidden flex flex-col">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <p className="text-green-400 mb-2">$ dcode init</p>
                <p className="mb-4 text-on-surface-variant">Initializing environment variables...</p>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                <p className="text-green-400 mb-2">$ cat mission.txt</p>
                <p className="mb-4 text-on-surface-variant">Building a community of developers, problem solvers, and innovators at JEC.</p>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                <p className="text-green-400 mb-2">$ npm run build</p>
                <p className="text-on-surface-variant mb-1">&gt; Compiling ideas...</p>
                <p className="text-on-surface-variant mb-1">&gt; Running tests...</p>
              </motion.div>
              
              <motion.div className="mt-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}>
                <p className="text-primary-container">
                  {typedText}<span className="cursor-blink">_</span>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
