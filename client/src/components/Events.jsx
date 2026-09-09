import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Events = () => {
  const [homepageEvents, setHomepageEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events/homepage')
      .then(res => res.json())
      .then(data => setHomepageEvents(data))
      .catch(() => {});
  }, []);

  const mainEvent = homepageEvents.find(ev => ev.isMain) || homepageEvents[0];
  const subEvents = homepageEvents.filter(ev => ev !== mainEvent);

  return (
    <section id="events" className="py-24 px-8 max-w-[1280px] mx-auto w-full relative z-10">
      <header className="mb-16">
        <h2 className="font-headline-xl text-4xl md:text-5xl font-bold text-on-background mb-6">
          Previous <span className="text-primary-container">Events</span>
        </h2>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl">
          A visual repository of our most impactful hackathons, technical workshops, and community interactions.
        </p>
      </header>

      {homepageEvents.length > 0 && (
        <div className="space-y-8 mb-12">
          {mainEvent && (
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
                      <span className="material-symbols-outlined text-[14px]">stars</span>
                      {mainEvent.type === 'FLAGSHIP' ? 'FLAGSHIP CONTEST' : mainEvent.type}
                    </div>
                    <h3 className="font-headline-md text-3xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                      {mainEvent.title}
                    </h3>
                    <p className="font-body-sm text-sm text-on-surface-variant mb-6">
                      {mainEvent.description}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-tertiary">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                        <span>{mainEvent.date}</span>
                      </div>
                      {mainEvent.location && (
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">location_on</span>
                          <span>{mainEvent.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="relative min-h-[250px] md:min-h-full bg-surface-container-high overflow-hidden">
                  {mainEvent.image && (
                    <img src={mainEvent.image} alt={mainEvent.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container/90 via-surface-container/20 to-transparent"></div>
                </div>
              </div>
            </motion.article>
          )}

          {subEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subEvents.map((ev, idx) => (
                <motion.article
                  key={ev._id || idx}
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
                  <p className="font-body-sm text-sm text-on-surface-variant">{ev.description}</p>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="text-center">
        <Link to="/events" className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-on-primary transition-colors px-6 py-3 rounded-md font-code-display font-bold text-sm">
          View All Events <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
};

export default Events;
