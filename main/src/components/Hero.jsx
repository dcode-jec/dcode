import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Terminal lines config: type = 'cmd' for green commands, 'out' for output, 'success' for final highlight
const terminalLines = [
  { type: 'cmd',     text: '$ dcode init' },
  { type: 'out',     text: 'Initializing environment variables...' },
  { type: 'cmd',     text: '$ cat mission.txt' },
  { type: 'out',     text: 'Building a community of developers, problem solvers, and innovators at JEC.' },
  { type: 'cmd',     text: '$ npm run build' },
  { type: 'out',     text: '> Compiling ideas...' },
  { type: 'out',     text: '> Running tests...' },
  { type: 'success', text: 'SUCCESS: Impact ready for deployment' },
];

const TYPE_SPEED_CMD = 40;   // ms per char for commands
const TYPE_SPEED_OUT = 18;   // ms per char for output (faster)
const LINE_PAUSE    = 350;   // pause between lines

const Hero = () => {
  // Each entry: { text, charIndex, done }
  const [lines, setLines] = useState([]);
  const [cursorLine, setCursorLine] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const timerRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;

    const typeTick = () => {
      if (lineIdx >= terminalLines.length) {
        setAllDone(true);
        return;
      }

      const currentLine = terminalLines[lineIdx];
      const speed = currentLine.type === 'cmd' ? TYPE_SPEED_CMD : TYPE_SPEED_OUT;

      if (charIdx === 0) {
        // Start a new line
        setLines(prev => [...prev, { ...currentLine, visibleText: '' }]);
        setCursorLine(lineIdx);
      }

      if (charIdx <= currentLine.text.length) {
        setLines(prev => {
          const updated = [...prev];
          updated[lineIdx] = { ...updated[lineIdx], visibleText: currentLine.text.slice(0, charIdx) };
          return updated;
        });
        charIdx++;
        timerRef.current = setTimeout(typeTick, speed);
      } else {
        // Line complete — pause, then move to next
        lineIdx++;
        charIdx = 0;
        timerRef.current = setTimeout(typeTick, LINE_PAUSE);
      }
    };

    // Start after a short initial delay
    timerRef.current = setTimeout(typeTick, 600);

    return () => clearTimeout(timerRef.current);
  }, []);

  // Auto-scroll terminal body to bottom as lines appear
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const getLineColor = (line) => {
    if (line.type === 'cmd') return 'text-green-400';
    if (line.type === 'success') return 'text-primary-container';
    return 'text-on-surface-variant';
  };

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
            <div ref={bodyRef} className="p-6 font-code-display text-sm flex-1 overflow-y-auto flex flex-col gap-1">
              {lines.map((line, i) => (
                <p key={i} className={`${getLineColor(line)} leading-relaxed ${line.type === 'cmd' ? 'mt-3 first:mt-0' : ''}`}>
                  {line.visibleText}
                  {i === cursorLine && !allDone && (
                    <span className="cursor-blink inline-block ml-[1px] -mb-[1px] w-[8px] h-[14px] bg-primary-fixed-dim/80 align-middle" />
                  )}
                </p>
              ))}
              {allDone && (
                <p className="text-green-400 mt-3">
                  $ <span className="cursor-blink inline-block ml-[1px] -mb-[1px] w-[8px] h-[14px] bg-primary-fixed-dim/80 align-middle" />
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
