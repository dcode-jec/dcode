import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TeamCard = ({ member }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-panel rounded-xl p-6 group hover:-translate-y-1 transition-transform duration-300 border border-outline-variant hover:border-primary/50 flex flex-col items-center text-center"
  >
    <div className="relative w-40 h-40 rounded-[2rem] overflow-hidden mb-6 border-2 border-primary/30 group-hover:border-primary transition-colors">
      <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
    <h4 className="font-headline-md text-xl font-bold text-on-surface group-hover:text-primary transition-colors">{member.name}</h4>
    <p className="font-code-display text-sm text-primary mt-1 mb-4">{member.role}</p>

    <div className="flex gap-4 mt-auto pt-4 border-t border-outline-variant w-full justify-center">
      <a href={member.socials?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-pink-500 transition-colors" title="Instagram">
        <i className="fa-brands fa-instagram text-xl"></i>
      </a>
      <a href={member.socials?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-blue-500 transition-colors" title="LinkedIn">
        <i className="fa-brands fa-linkedin text-xl"></i>
      </a>
      <a href={member.socials?.email ? `mailto:${member.socials.email}` : '#'} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors" title="Email">
        <span className="material-symbols-outlined text-xl">mail</span>
      </a>
    </div>
  </motion.div>
);

const Section = ({ title, members }) => {
  if (!members || members.length === 0) return null;
  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-on-surface">{title.split(' ').slice(0, -1).join(' ')} <span className="text-primary">{title.split(' ').slice(-1)}</span></h3>
        <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member, idx) => (
          <TeamCard key={member._id || idx} member={member} />
        ))}
      </div>
    </div>
  );
};

const SESSIONS = [
  { id: '26-27', label: "Session '26-'27" },
  { id: '25-26', label: "Session '25-'26" },
  { id: '24-25', label: "Session '24-'25" }
];

const TeamPage = () => {
  const [activeSession, setActiveSession] = useState('26-27');
  const [faculty, setFaculty] = useState(null);
  const [founder, setFounder] = useState(null);
  const [sessionData, setSessionData] = useState({ leads: [], management: [], pr: [], technical: [], design: [] });
  const [loadingSession, setLoadingSession] = useState(false);

  // Fetch faculty and founder (permanent members)
  useEffect(() => {
    fetch('/api/team?session=permanent&category=faculty')
      .then(res => res.json())
      .then(data => { if (data.length > 0) setFaculty(data[0]); })
      .catch(() => {});

    fetch('/api/team?session=permanent&category=founder')
      .then(res => res.json())
      .then(data => { if (data.length > 0) setFounder(data[0]); })
      .catch(() => {});
  }, []);

  // Fetch session members when active session changes
  useEffect(() => {
    setLoadingSession(true);
    const categories = ['leads', 'management', 'pr', 'technical', 'design'];
    const promises = categories.map(cat =>
      fetch(`/api/team?session=${activeSession}&category=${cat}`)
        .then(res => res.json())
        .catch(() => [])
    );

    Promise.all(promises).then(results => {
      const data = {};
      categories.forEach((cat, idx) => { data[cat] = results[idx] || []; });
      setSessionData(data);
      setLoadingSession(false);
    });
  }, [activeSession]);

  const hasMembers = Object.values(sessionData).some(list => list && list.length > 0);

  return (
    <main className="pt-24 min-h-screen pb-20">
      <section className="max-w-[1280px] mx-auto px-8 relative z-10">
        <div className="mb-16 text-center relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="font-code-display text-sm text-primary mb-4 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">folder_open</span>
            <span>~/dcode/team</span>
            <span className="cursor-blink">_</span>
          </div>
          <h1 className="font-headline-xl text-4xl md:text-5xl text-on-surface mb-4">Meet the <span className="text-primary text-glow-primary">Architects</span></h1>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto">The minds behind DCODE. A collective of developers, designers, and visionaries building the future of our tech community.</p>
        </div>

        {/* Guiding Forces Section */}
        {(faculty || founder) && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-on-surface">Guiding <span className="text-primary">Forces</span></h3>
              <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Faculty Card */}
              {faculty && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-panel rounded-xl p-8 border border-outline-variant hover:border-primary/50 transition-colors flex flex-col items-center text-center w-full"
                >
                  <div className="w-40 h-40 rounded-[2rem] overflow-hidden border-2 border-primary/30 shrink-0 bg-surface-container-high mb-6">
                    <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center h-full">
                    <h4 className="font-headline-md text-2xl font-bold text-on-surface mb-2">{faculty.name}</h4>
                    <p className="font-code-display text-md text-primary mb-4">{faculty.role}</p>
                    <p className="font-body-sm text-on-surface-variant mb-6 text-sm">
                      {faculty.description}
                    </p>
                    <div className="flex gap-4 justify-center mt-auto">
                      <a href={faculty.socials?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-blue-500 transition-colors" title="LinkedIn">
                        <i className="fa-brands fa-linkedin text-xl"></i>
                      </a>
                      <a href={faculty.socials?.email ? `mailto:${faculty.socials.email}` : '#'} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors" title="Email">
                        <span className="material-symbols-outlined text-xl">mail</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Founder Card */}
              {founder && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass-panel rounded-xl p-8 border border-outline-variant hover:border-primary/50 transition-colors flex flex-col items-center text-center w-full"
                >
                  <div className="w-40 h-40 rounded-[2rem] overflow-hidden border-2 border-primary/30 shrink-0 bg-surface-container-high mb-6 flex items-center justify-center">
                    <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center h-full">
                    <h4 className="font-headline-md text-2xl font-bold text-on-surface mb-2">{founder.name}</h4>
                    <p className="font-code-display text-md text-primary mb-4">{founder.role}</p>
                    <p className="font-body-sm text-on-surface-variant mb-6 text-sm">
                      {founder.description}
                    </p>
                    <div className="flex gap-4 justify-center mt-auto">
                      <a href={founder.socials?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-blue-500 transition-colors" title="LinkedIn">
                        <i className="fa-brands fa-linkedin text-xl"></i>
                      </a>
                      <a href={founder.socials?.email ? `mailto:${founder.socials.email}` : '#'} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors" title="Email">
                        <span className="material-symbols-outlined text-xl">mail</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Session Filter Tabs: 26-27 (first), then 25-26, then 24-25 */}
        <div className="mb-12 glass-panel rounded-lg p-2 inline-flex flex-wrap gap-2 items-center border border-outline-variant bg-surface-container/80 backdrop-blur-xl">
          <div className="flex gap-2 px-3">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <div className="w-3 h-3 rounded-full bg-primary-container"></div>
            <div className="w-3 h-3 rounded-full bg-surface-tint"></div>
          </div>
          <div className="h-6 w-px bg-outline-variant mx-2"></div>
          {SESSIONS.map(session => (
            <button
              key={session.id}
              onClick={() => setActiveSession(session.id)}
              className={`font-code-display text-sm px-4 py-2 rounded-md transition-all cursor-pointer ${
                activeSession === session.id
                  ? 'bg-primary text-on-primary font-bold shadow-[0_0_15px_rgba(254,149,32,0.3)]'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
              }`}
            >
              {session.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeSession}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loadingSession ? (
            <div className="py-24 text-center font-code-display text-on-surface-variant">Loading members...</div>
          ) : !hasMembers ? (
            <div className="py-24 text-center">
              <span className="material-symbols-outlined text-6xl text-primary-container/50 mb-4">hourglass_empty</span>
              <h3 className="font-headline-md text-3xl font-bold text-on-surface mb-2">To Be Released Soon</h3>
              <p className="font-code-display text-on-surface-variant">We are currently forming the next generation of architects.</p>
            </div>
          ) : (
            <>
              <Section title="Our Leads" members={sessionData.leads} />
              <Section title="Public Relations Team" members={sessionData.pr} />
              <Section title="Design Team" members={sessionData.design} />
              <Section title="Management Team" members={sessionData.management} />
              <Section title="Technical Team" members={sessionData.technical} />
            </>
          )}
        </motion.div>

      </section>
    </main>
  );
};

export default TeamPage;
