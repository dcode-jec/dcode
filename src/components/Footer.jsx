import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] w-full py-16 px-8 border-t border-white/5 relative z-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
        <div>
          <a href="#" className="text-xl font-bold text-primary font-headline-md tracking-widest flex items-center justify-center md:justify-start gap-2 mb-2 hover:text-primary-container transition-colors">
            <span className="material-symbols-outlined">code</span>
            DCODE
          </a>
          <p className="font-label-caps text-xs text-on-surface-variant">
            Built with passion and code by DCODE
          </p>
        </div>
        
        <nav className="flex justify-center gap-6">
          <a href="#" className="font-label-caps text-xs text-on-surface-variant hover:text-primary transition-colors focus:ring-1 focus:ring-primary rounded px-2 py-1 outline-none">Twitter</a>
          <a href="#" className="font-label-caps text-xs text-on-surface-variant hover:text-primary transition-colors focus:ring-1 focus:ring-primary rounded px-2 py-1 outline-none">GitHub</a>
          <a href="#" className="font-label-caps text-xs text-on-surface-variant hover:text-primary transition-colors focus:ring-1 focus:ring-primary rounded px-2 py-1 outline-none">LinkedIn</a>
          <a href="#" className="font-label-caps text-xs text-on-surface-variant hover:text-primary transition-colors focus:ring-1 focus:ring-primary rounded px-2 py-1 outline-none">Discord</a>
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
