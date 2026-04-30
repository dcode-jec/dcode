import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import tasdeequeImg from '../assets/team/tasdeeque.jpg';
import sampritiImg from '../assets/team/sampriti.jpeg';
import nitulImg from '../assets/team/nitul.jpeg';
import sameerImg from '../assets/team/sameer.jpeg';

const TeamCard = ({ member }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-panel rounded-xl p-6 group hover:-translate-y-1 transition-transform duration-300 border border-outline-variant hover:border-primary/50 flex flex-col items-center text-center"
  >
    <div className="relative w-40 h-40 rounded-[2rem] overflow-hidden mb-6 border-2 border-primary/30 group-hover:border-primary transition-colors">
      <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
    <h4 className="font-headline-md text-xl font-bold text-on-surface group-hover:text-primary transition-colors">{member.name}</h4>
    <p className="font-code-display text-sm text-primary mt-1 mb-4">{member.role}</p>

    <div className="flex gap-4 mt-auto pt-4 border-t border-outline-variant w-full justify-center">
      <a href={member.socials?.insta || '#'} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-pink-500 transition-colors" title="Instagram">
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

const Team = () => {
  const coreTeam = [
    {
      name: "Tasdeeque Ruhani", role: "Head",
      img: tasdeequeImg, socials: { insta: 'https://www.instagram.com/taz.r.exe/', linkedin: 'https://www.linkedin.com/in/tasdeeque-ruhani/', email: 'tasdeequeruhani2002@gmail.com' }
    },
    {
      name: "Sampriti Kalita", role: "Co-Head",
      img: sampritiImg, socials: { insta: 'https://www.instagram.com/sampriti_kalita/', linkedin: 'https://www.linkedin.com/in/sampriti-kalita-a49198250/', email: 'sampritik100@gmail.com' }
    },
    {
      name: "Nitul Das", role: "Co-Head",
      img: nitulImg, socials: { insta: 'https://www.instagram.com/ni_t_ul8/', linkedin: 'https://www.linkedin.com/in/nituldas/', email: 'ndas6732@gmail.com' }
    },
    {
      name: "Sameer Kashyap", role: "Lead-Mentor",
      img: sameerImg, socials: { insta: 'https://www.instagram.com/scaptera_/', linkedin: 'https://www.linkedin.com/in/sameer-kashyap/', email: 'mistakenpirate38@gmail.com' }
    }
  ];

  return (
    <section id="team" className="py-24 max-w-[1280px] mx-auto px-8 relative z-10">
      <div className="mb-16 text-center md:text-left relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <h2 className="font-headline-xl text-4xl md:text-5xl text-on-surface mb-4">Core <span className="text-primary text-glow-primary">Team</span></h2>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl">The leadership driving the vision and execution of DCODE.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {coreTeam.map((member, idx) => (
          <TeamCard key={idx} member={member} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/team" className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-on-primary transition-colors px-6 py-3 rounded-md font-code-display font-bold text-sm">
          Meet the Full Team <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
};

export default Team;
