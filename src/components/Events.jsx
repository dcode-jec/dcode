import React from 'react';
import { motion } from 'framer-motion';

const Events = () => {
  return (
    <section id="events" className="py-24 px-8 max-w-[1280px] mx-auto w-full relative z-10">
      <header className="mb-16">
        <div className="font-code-display text-sm text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">folder_open</span>
          <span>~/dcode/events</span>
          <span className="cursor-blink">_</span>
        </div>
        <h2 className="font-headline-xl text-4xl md:text-5xl font-bold text-on-background mb-6">
          System <span className="text-primary-container">Events</span>
        </h2>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl">
          Real-time log of upcoming hackathons, technical workshops, and community syncs. Initialize your next skill upgrade.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-lg overflow-hidden shadow-lg border border-white/10"
          >
            <div className="bg-surface-container-high px-4 py-2 flex items-center gap-2 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-error"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-surface-tint"></div>
              <span className="ml-2 font-code-display text-[10px] text-on-surface-variant uppercase tracking-widest">Filter.exe</span>
            </div>
            <div className="p-6 space-y-3">
              {['All_Events', 'Hackathons', 'Workshops', 'Contests'].map((filter, i) => (
                <button key={filter} className={`w-full text-left px-4 py-2 rounded font-code-display text-sm transition-all flex items-center justify-between group ${i===0 ? 'bg-primary-container/10 border border-primary text-primary' : 'bg-surface-variant text-on-surface hover:bg-surface-bright'}`}>
                  <span>&gt; {filter}</span>
                  <span className={`material-symbols-outlined text-sm transition-transform ${i===0 ? 'opacity-100 group-hover:translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-primary'}`}>chevron_right</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-[2px] h-full bg-primary"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
              <h3 className="font-label-caps text-xs text-on-surface uppercase font-bold">Live Feed Status</h3>
            </div>
            <div className="space-y-4 font-code-display text-xs text-on-surface-variant">
              <div className="flex gap-2">
                <span className="text-tertiary">[10:42:01]</span>
                <span>Syncing new hackathon data...</span>
              </div>
              <div className="flex gap-2 text-primary">
                <span>[10:42:05]</span>
                <span>&gt; 3 new events loaded.</span>
              </div>
            </div>
          </motion.div>
        </aside>

        <div className="lg:col-span-9 space-y-8">
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel border border-white/10 rounded-xl overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              <div className="p-8 flex flex-col justify-between z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/10 border border-primary/30 rounded-full font-code-display text-[11px] text-primary mb-6">
                    <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                    UPCOMING HACKATHON
                  </div>
                  <h3 className="font-headline-md text-3xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                    DCODE SynthWave Hack 2024
                  </h3>
                  <p className="font-body-sm text-sm text-on-surface-variant mb-6">
                    A 48-hour intensive building phase. Focus on retro-futuristic UI/UX, Web3 integrations, and creative coding. High-caffeine environment guaranteed.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-tertiary">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                      <span>Oct 24 - 26</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      <span>Main Campus Hub</span>
                    </div>
                  </div>
                  <button className="bg-primary text-on-primary font-code-display text-sm font-bold px-6 py-3 rounded hover:bg-primary-container transition-colors w-full sm:w-auto inline-flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(254,149,32,0.3)]">
                    <span>Execute_Registration</span>
                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                  </button>
                </div>
              </div>
              <div className="relative min-h-[300px] md:min-h-full bg-surface-container-high overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&amp;w=2070&amp;auto=format&amp;fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container/90 via-surface-container/20 to-transparent"></div>
              </div>
            </div>
          </motion.article>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { type: 'WORKSHOP', date: 'Nov 05', title: 'Mastering Vim & Tmux', desc: 'Stop using the mouse. Learn the essential keyboard workflows to navigate codebases at terminal velocity.' },
              { type: 'CONTEST', date: 'Nov 12', title: 'Algo-Rhythm Weekly', desc: 'Our weekly competitive programming meetup. 3 problems, 2 hours. Top the leaderboard for exclusive DCODE swag.' }
            ].map((ev, idx) => (
              <motion.article 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel border border-outline-variant/50 rounded-lg p-6 relative group hover:border-primary/50 transition-colors"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-code-display text-[12px] text-tertiary bg-surface-container-high px-2 py-1 rounded">{ev.type}</span>
                  <span className="font-code-display text-[12px] text-primary">{ev.date}</span>
                </div>
                <h4 className="font-body-lg text-xl font-semibold text-on-surface mb-2">{ev.title}</h4>
                <p className="font-body-sm text-sm text-on-surface-variant mb-6 line-clamp-2">{ev.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <a href="#" className="text-primary hover:text-primary-container font-code-display text-[12px] flex items-center gap-1 transition-colors ml-auto">
                    Details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
