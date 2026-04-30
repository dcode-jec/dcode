import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLightMode]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-surface-container-lowest/80 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 md:px-8 h-16 md:h-20">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-black text-primary tracking-tighter flex items-center gap-2 hover:text-primary-fixed-dim transition-colors">
            <img
              src={isLightMode ? lightBg : darkBg}
              alt="DCODE LOGO"
              className="h-32 md:h-40 w-auto"
            />
          </NavLink>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 font-label-caps uppercase tracking-wider text-xs font-bold">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.id}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === link.id
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                }`}
              >
                {link.label}
                {location.pathname === link.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 text-primary">
            {/* Theme toggle — always visible */}
            <button
              onClick={() => setIsLightMode(!isLightMode)}
              className="hover:bg-on-surface/5 p-2 rounded-lg transition-all duration-300 active:scale-95 flex items-center justify-center"
              aria-label="Toggle light mode"
            >
              <span className="material-symbols-outlined text-[22px]">
                {isLightMode ? 'dark_mode' : 'light_mode'}
              </span>
            </button>

            {/* Terminal icon — mobile burger menu only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden hover:bg-on-surface/5 p-2 rounded-lg transition-all duration-300 active:scale-95 flex items-center justify-center"
              aria-label="Open navigation menu"
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileOpen ? 'close' : 'terminal'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99] md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="absolute top-16 left-0 right-0 bg-surface-container-lowest/95 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-col px-6 py-4 gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <NavLink
                      to={link.id}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-label-caps uppercase tracking-widest font-bold transition-all duration-200 ${
                        location.pathname === link.id
                          ? 'text-primary bg-primary/10 border-l-2 border-primary'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Bottom accent line */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
