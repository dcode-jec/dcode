import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import darkBg from '../assets/dark_bg.png';
import lightBg from '../assets/light_bg.png';

const navLinks = [
  { id: '/', label: 'Home' },
  { id: '/team', label: 'Team' },
  { id: '/events', label: 'Events' },
  { id: '/gallery', label: 'Gallery' },
  { id: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLightMode]);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-surface-container-lowest/80 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-2">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-8 h-20">
        <NavLink to="/" className="text-2xl font-black text-primary tracking-tighter flex items-center gap-2 hover:text-primary-fixed-dim transition-colors">
          <img
            src={isLightMode ? lightBg : darkBg}
            alt="DCODE LOGO"
            className="h-40 w-auto"
          />
        </NavLink>
        <div className="hidden md:flex items-center gap-8 font-label-caps uppercase tracking-wider text-xs font-bold">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.id}
              className={`transition-all duration-300 ${location.pathname === link.id
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded-md px-3 py-2'
                }`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4 text-primary">
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className="hover:bg-on-surface/5 p-2 rounded-md transition-all duration-300 active:scale-95 flex items-center justify-center"
            aria-label="Toggle light mode"
          >
            <span className="material-symbols-outlined">{isLightMode ? 'dark_mode' : 'light_mode'}</span>
          </button>
          <button className="hover:bg-on-surface/5 p-2 rounded-md transition-all duration-300 active:scale-95 flex items-center justify-center">
            <span className="material-symbols-outlined">terminal</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
