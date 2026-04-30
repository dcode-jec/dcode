import React from 'react';
import darkBg from '../assets/Dark BG.png';

const Footer = () => {
  return (
    <footer className="bg-[#050505] w-full py-6 px-8 border-t border-white/5 relative z-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#" className="flex items-center transition-transform hover:scale-105 duration-300 -my-10">
            <img src={darkBg} alt="DCODE LOGO" className="h-28 w-auto object-contain" />
          </a>
          <p className="font-label-caps text-[12px] text-on-surface-variant px-2">
            Built with love by Tasdeeque Ruhani
          </p>
        </div>

        <nav className="flex justify-center gap-6">
          <a href="https://www.instagram.com/dcode_jec/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-pink-500 transition-colors focus:ring-1 focus:ring-primary rounded p-2 outline-none" title="Instagram">
            <i className="fa-brands fa-instagram text-2xl"></i>
          </a>
          <a href="https://www.linkedin.com/in/dcode-jec/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-blue-500 transition-colors focus:ring-1 focus:ring-primary rounded p-2 outline-none" title="LinkedIn">
            <i className="fa-brands fa-linkedin text-2xl"></i>
          </a>
          <a href="https://github.com/dcode-jec" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-on-surface transition-colors focus:ring-1 focus:ring-primary rounded p-2 outline-none" title="GitHub">
            <i className="fa-brands fa-github text-2xl"></i>
          </a>
        </nav>

        <div className="flex justify-center md:justify-end">
          <div className="font-code-display text-xs text-primary-container/50">
            System.exit(0);
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
