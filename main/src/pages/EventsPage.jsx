import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mindmazeImg from '../assets/events/MindMaze3.png';

const allEvents = [
  { type: 'FLAGSHIP', category: 'Contests', date: 'Oct 2024', title: 'Mind Maze 3.0', desc: 'Our premier annual flagship contest where logic meets creativity. Challenge your problem-solving skills in our most awaited technical showdown.', main: true, img: mindmazeImg },
  { type: 'COMPETITION', category: 'Contests', date: 'Nov 2024', title: 'Code Clash 3.0', desc: 'A high-intensity competitive programming battle. Prove your algorithm mastery and climb the leaderboard.', main: false },
  { type: 'HACKATHON', category: 'Contests', date: 'Feb 2025', title: 'Hackvita 4.0', desc: 'The ultimate 48-hour build-a-thon. Transform your wildest ideas into functional prototypes and compete for the top spot.', main: false },
  { type: 'WORKSHOP', category: 'Workshops', date: 'Dec 2024', title: 'DSA Workshop', desc: 'Master the fundamentals of Data Structures and Algorithms. Essential preparation for technical interviews and competitive coding.', main: false },
  { type: 'ORIENTATION', category: 'Workshops', date: 'Mar 2025', title: 'Language Orientation', desc: 'Introduction to modern programming paradigms and languages. Level up your syntax and explore new development horizons.', main: false },
  { type: 'SOCIAL', category: 'Culture', date: 'May 2025', title: 'CLUB Afterparty', desc: 'Relax, network, and celebrate our technical achievements. The perfect way to bond with the DCODE community.', main: false }
];

const filters = ['All_Events', 'Contests', 'Workshops', 'Culture'];

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All_Events');

  const filteredEvents = allEvents.filter(ev =>
    activeFilter === 'All_Events' || ev.category === activeFilter
  );

  const mainEvent = filteredEvents.find(ev => ev.main) || filteredEvents[0];
  const regularEvents = filteredEvents.filter(ev => ev !== mainEvent);

  return (
    <main className="pt-24 min-h-screen pb-20">
      <section className="py-24 px-8 max-w-[1280px] mx-auto w-full relative z-10">
        <header className="mb-16">
          <div className="font-code-display text-sm text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">folder_open</span>
            <span>~/dcode/events</span>
            <span className="cursor-blink">_</span>
          </div>
          <h1 className="font-headline-xl text-4xl md:text-5xl font-bold text-on-background mb-6">
            Previous <span className="text-primary-container">Events</span>
          </h1>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl">
            A visual repository of our most impactful hackathons, technical workshops, and community interactions.
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
                {filters.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`w-full text-left px-4 py-2 rounded font-code-display text-sm transition-all flex items-center justify-between group ${isActive ? 'bg-primary-container/10 border border-primary text-primary shadow-[0_0_10px_rgba(254,149,32,0.2)]' : 'bg-surface-variant text-on-surface hover:bg-surface-bright border border-transparent'}`}
                    >
                      <span>--filter={filter.toLowerCase()}</span>
                      <span className={`material-symbols-outlined text-sm transition-transform ${isActive ? 'opacity-100 translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-primary'}`}>chevron_right</span>
                    </button>
                  );
                })}
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
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-code-display text-[10px] uppercase tracking-widest text-on-surface-variant">Archive Status</span>
              </div>
              <div className="space-y-3 font-code-display text-[10px] text-primary/70">
                <p>[16:44:01] Indexing past event logs...</p>
                <p>[16:44:05] History archive loaded...</p>
              </div>
            </motion.div>
          </aside>

          <div className="lg:col-span-9 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {mainEvent && (
                  <article className="glass-panel border border-white/10 rounded-xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                      <div className="p-8 flex flex-col justify-between z-10">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/10 border border-primary/30 rounded-full font-code-display text-[11px] text-primary mb-6">
                            <span className="material-symbols-outlined text-[14px]">
                              {mainEvent.type === 'FLAGSHIP' ? 'stars' : 'event'}
                            </span>
                            {mainEvent.type === 'FLAGSHIP' ? 'FLAGSHIP CONTEST' : mainEvent.type}
                          </div>
                          <h3 className="font-headline-md text-3xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                            {mainEvent.title}
                          </h3>
                          <p className="font-body-sm text-sm text-on-surface-variant mb-6">
                            {mainEvent.desc}
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-sm text-tertiary">
                            <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                              <span>{mainEvent.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">location_on</span>
                              <span>Main Campus Hub</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative min-h-[300px] md:min-h-full bg-surface-container-high overflow-hidden">
                        {mainEvent.img ? (
                          <img src={mainEvent.img} alt={mainEvent.title} className="absolute inset-0 w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&amp;w=2070&amp;auto=format&amp;fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container/90 via-surface-container/20 to-transparent"></div>
                      </div>
                    </div>
                  </article>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {regularEvents.map((ev, idx) => (
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
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventsPage;
