import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import abhimanyuImg from '../assets/team/abhimanyu.jpg';
import nayanaImg from '../assets/team/nayana.png';
import anuvabImg from '../assets/team/anuvab.jpg';
import mrigankaImg from '../assets/team/mriganka.jpg';
import doyanImg from '../assets/team/doyan.jpg';
import nibirImg from '../assets/team/nibir.jpg';
import shreyaImg from '../assets/team/shreya.jpg';
import suhaniImg from '../assets/team/suhani.jpg';
import priyamImg from '../assets/team/priyam.webp';

const TeamCard = ({ member }) => {
  const hasInsta = member.socials?.insta && member.socials.insta !== '#';
  const hasLinkedin = member.socials?.linkedin && member.socials.linkedin !== '#';
  const hasEmail = member.socials?.email && member.socials.email !== '#';

  return (
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
        {hasInsta ? (
          <a href={member.socials.insta} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-pink-500 transition-colors" title="Instagram">
            <i className="fa-brands fa-instagram text-xl"></i>
          </a>
        ) : (
          <span className="text-on-surface-variant/30 cursor-default" title="Instagram not available">
            <i className="fa-brands fa-instagram text-xl"></i>
          </span>
        )}

        {hasLinkedin ? (
          <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-blue-500 transition-colors" title="LinkedIn">
            <i className="fa-brands fa-linkedin text-xl"></i>
          </a>
        ) : (
          <span className="text-on-surface-variant/30 cursor-default" title="LinkedIn not available">
            <i className="fa-brands fa-linkedin text-xl"></i>
          </span>
        )}

        {hasEmail ? (
          <a href={`mailto:${member.socials.email}`} className="text-on-surface-variant hover:text-primary transition-colors" title="Email">
            <span className="material-symbols-outlined text-xl">mail</span>
          </a>
        ) : (
          <span className="text-on-surface-variant/30 cursor-default" title="Email not available">
            <span className="material-symbols-outlined text-xl">mail</span>
          </span>
        )}
      </div>
    </motion.div>
  );
};

const Team = () => {
  const coreTeam = [
    {
      name: "Abhimanyu Saikia", role: "Head",
      img: abhimanyuImg, socials: { insta: 'https://www.instagram.com/escursio675/', linkedin: 'https://www.linkedin.com/in/saikia-abhimanyu/', email: 'abhisaikia675@gmail.com' }
    },
    {
      name: "Nayana Hazarika", role: "Co-Head",
      img: nayanaImg, socials: { insta: 'https://www.instagram.com/trauma_pie/', linkedin: '#', email: 'hazarikanayana2@gmail.com' }
    },
    {
      name: "Anuvab Biswas", role: "Lead Mentor",
      img: anuvabImg, socials: { insta: '#', linkedin: 'https://www.linkedin.com/in/anuvab-biswas/', email: 'anuvab190@gmail.com' }
    },
    {
      name: "Mriganka Mahanta", role: "Co-Head",
      img: mrigankaImg, socials: { insta: 'https://www.instagram.com/mahanta._.mrigaa/', linkedin: 'https://www.linkedin.com/in/mriganka-mahanta-661981397/', email: 'mrigank195@gmail.com' }
    },
    {
      name: "Doyan Biswas", role: "Public Relations Lead",
      img: doyanImg, socials: { insta: 'https://www.instagram.com/_doyan__7/', linkedin: 'https://www.linkedin.com/in/doyan-biswas-b29b15313/', email: 'biswasdoyan@gmail.com' }
    },
    {
      name: "Nibir Kalita", role: "Design Co-Lead",
      img: nibirImg, socials: { insta: 'https://www.instagram.com/nibirkalita_7/', linkedin: 'https://www.linkedin.com/in/nibirkalita07/', email: 'raag2263@gmail.com' }
    },
    {
      name: "Shreya Bhuyan", role: "Design Co-Lead",
      img: shreyaImg, socials: { insta: 'https://www.instagram.com/shreya.bhuyan/', linkedin: 'https://www.linkedin.com/in/shreya-bhuyan-756522330/', email: 'shreyabhuyan1@gmail.com' }
    },
    {
      name: "Suhani Chutia", role: "Management Lead",
      img: suhaniImg, socials: { insta: 'https://www.instagram.com/chocooky_08/', linkedin: 'https://www.linkedin.com/in/suhani-chutia-767b2a341/', email: 'suhanichutia00@gmail.com' }
    },
    {
      name: "Priyam Nath", role: "Tech Lead",
      img: priyamImg, socials: { insta: 'https://www.instagram.com/priyam_nath5/', linkedin: 'https://www.linkedin.com/in/priyam-nath-4a8487329/', email: 'priyamnath5@gmail.com' }
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

