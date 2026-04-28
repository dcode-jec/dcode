import React from 'react';
import { motion } from 'framer-motion';
import biswajitsir from '../assets/team/biswajitsir.png';
import sameerImg from '../assets/team/sameer.jpeg';
import nitulImg from '../assets/team/nitul.jpeg';
import sampritiImg from '../assets/team/sampriti.jpeg';
import tasdeequeImg from '../assets/team/tasdeeque.jpg';
import anuvabImg from '../assets/team/anuvab.jpg';
import riturajImg from '../assets/team/rituraj.jpeg';

const Team = () => {
  const coreTeam = [
    {
      name: "Tasdeeque Ruhani", role: "Head",
      desc: "Leading the vision and execution of DCODE's initiatives. Passionate about AI and scalable systems.",
      tags: ["Leadership", "System Arch"],
      img: tasdeequeImg,
    },
    {
      name: "Sampriti Kalita", role: "Co-Head",
      desc: "Orchestrating club operations and external partnerships. Full-stack developer with a focus on UX.",
      tags: ["Operations", "Full-Stack"],
      img: sampritiImg,
    },
    {
      name: "Nitul Das", role: "Co-Head",
      desc: "Driving technical excellence and mentoring developers. Core contributor to open-source projects.",
      tags: ["Architecture", "DevOps"],
      img: nitulImg,
    },
    {
      name: "Sameer Kashyap", role: "Lead-Mentor",
      desc: "Driving technical excellence and mentoring developers. Core contributor to open-source projects.",
      tags: ["Architecture", "DevOps"],
      img: sameerImg
    },
    {
      name: "Anuvab Biswas", role: "Mangement Lead",
      desc: "Driving technical excellence and mentoring developers. Core contributor to open-source projects.",
      tags: ["Architecture", "DevOps"],
      img: anuvabImg
    },
    {
      name: "Ritu Raj Bora", role: "Public Relations Lead",
      desc: "Driving technical excellence and mentoring developers. Core contributor to open-source projects.",
      tags: ["Architecture", "DevOps"],
      img: riturajImg
    }
  ];

  const devs = [
    {
      name: "Elena Rodriguez", role: "Senior Backend Developer",
      desc: "Specializes in building robust APIs and microservices. Rust enthusiast and database optimization geek.",
      tags: ["Rust", "PostgreSQL"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP5RL7Ju0pcmVAM7xv5RJScfvmc5dmABGVsC3LIkKQy1Af74x8MW-qrJwFdWZOi9jUwRA2aEfo9Y6Z6R-OQ7AUw039PRnFlPpReDwkPzw8SmebJupQuRPZLRHMIRPrfQli4Ji6i9Sel2VFiID-TG5Jc_7q3DotYqXiEfaWvVEk97yXoAwKbwKZvAPCigdJydE1HDNGX5Xprg-ZSJtGh9aQaPnOTpXipjqT0L-sMSlLCLRrn_GnoUddwSWY_wzLFlNPkL0vK_dt1g",
      large: true
    },
    {
      name: "David Kim", role: "Frontend Dev",
      tags: ["React", "Vue"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAe_MJeEKluBmk1GI1UpwZkEG4tNjFZZtVYNfWeHvv6G49IzCrH5jl4cz-X5YVFvwJeuGNqTb_nWU095ca5NWVCUVcX-2ZLJ6zLkX4QWAeD9vH8LuEjN72yUeE9kU1L_X6WVXatnivpPU30kECikof5_wwG97tnV_KiEeVOQeOrJPWnLKNfJMk15_t_ocvDlxq2z6jp0dL-C-XXBiayRlFiMCikL6U8EZzf7ANSC--YGlv7INL-AI9-ZwtUXlUYIvoUCIMQUI4FQ",
      large: false
    },
    {
      name: "Maya Patel", role: "Mobile Dev",
      tags: ["Flutter", "Kotlin"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbNhiiJvvzqNtg4F1_P0v1yv8H8--qtnlQTCxJI1ftpbmxpjnndevJRP0nmw4NI-8WGb9DRZzJ_MDd4XyzDRZ68IMrJOdoiIP_58FiEj0vxujadR1DkFmtdg6S-KqXWmmrbsc2Fn9997YpuiEupDR4-8QowdlvsGYIbWse-fyhbdJEvPY1sjRXcIxRob4gdCRQQHgaNz0hYwfeQZs4M0Rwm0jcOcBpe_hqvYXsOk3A8966Ajz4cTy0VprIYC-pBG9XTXmrzABhrQ",
      large: false
    }
  ];

  return (
    <section id="team" className="py-24 max-w-[1280px] mx-auto px-8 relative z-10">
      <div className="mb-16 text-center md:text-left relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <h2 className="font-headline-xl text-4xl md:text-5xl text-on-surface mb-4">Meet the <span className="text-primary text-glow-primary">Architects</span></h2>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl">The minds behind DCODE. A collective of developers, designers, and visionaries building the future of our tech community.</p>
      </div>

      <div className="mb-12 glass-panel rounded-lg p-2 inline-flex flex-wrap gap-2 items-center border border-outline-variant bg-surface-container/80 backdrop-blur-xl">
        <div className="flex gap-2 px-3">
          <div className="w-3 h-3 rounded-full bg-error"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="h-6 w-px bg-outline-variant mx-2"></div>
        <button className="bg-primary text-on-primary font-bold font-code-display text-sm px-4 py-2 rounded-md shadow-[0_0_15px_rgba(254,149,32,0.3)] hover:bg-primary/90 transition-colors">Session '25-'26</button>
        <button className="text-on-surface-variant hover:text-on-surface hover:bg-white/5 font-code-display text-sm px-4 py-2 rounded-md transition-colors">Session '24-'25</button>
      </div>

      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-on-surface">Faculty In <span className="text-primary">Charge</span></h3>
          <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-xl p-8 group border border-outline-variant hover:border-primary/50 transition-colors flex flex-col md:flex-row gap-8 items-center md:items-start w-full"
        >
          <div className="w-58 h-64 rounded-lg overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors shrink-0 flex items-center justify-center bg-surface-container-high text-on-surface-variant">
            <img src={biswajitsir} />
          </div>
          <div className="flex-1 text-center md:text-left flex flex-col justify-center h-full">
            <h4 className="font-headline-md text-3xl font-bold text-on-surface group-hover:text-primary transition-colors mb-2">Mr. Biswajit Sarmah</h4>
            <p className="font-code-display text-lg text-primary mb-4">Faculty in Charge</p>
            <p className="font-body-lg text-on-surface-variant max-w-3xl">
              Guiding the vision and providing invaluable mentorship to the DCODE community. Instrumental in fostering a culture of innovation, continuous learning, and technical excellence among the students of Jorhat Engineering College.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-on-surface">Core <span className="text-primary">Runtime</span></h3>
          <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreTeam.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel rounded-xl p-6 group hover:-translate-y-1 transition-transform duration-300 border border-outline-variant hover:border-primary/50"
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6 border border-outline-variant">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-surface-container to-transparent"></div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-headline-md text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">{member.name}</h4>
                  <p className="font-code-display text-sm text-primary mt-1">{member.role}</p>
                </div>
              </div>
              <p className="font-body-sm text-sm text-on-surface-variant mb-4 line-clamp-2">{member.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {member.tags.map(tag => (
                  <span key={tag} className="font-code-display text-[10px] bg-primary/10 border border-primary/30 text-primary px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
              <div className="flex gap-3 pt-4 border-t border-outline-variant">
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">code</span></a>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">link</span></a>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">mail</span></a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-on-surface">Development <span className="text-primary">Engine</span></h3>
          <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {devs.map((dev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-panel rounded-xl p-6 group border border-outline-variant hover:border-primary/50 transition-colors ${dev.large ? 'md:col-span-2 flex flex-col md:flex-row gap-6' : 'md:col-span-1 flex flex-col items-center text-center'}`}
            >
              <img src={dev.img} alt={dev.name} className={`${dev.large ? 'w-full md:w-48 h-48 rounded-lg' : 'w-24 h-24 rounded-full border-2 border-primary/30 group-hover:border-primary'} object-cover transition-colors`} />
              <div className={dev.large ? "flex flex-col justify-between" : ""}>
                <div>
                  <h4 className={`font-headline-md font-bold text-on-surface group-hover:text-primary transition-colors ${dev.large ? 'text-xl' : 'text-lg'}`}>{dev.name}</h4>
                  <p className={`font-code-display text-primary mt-1 ${dev.large ? 'mb-3 text-sm' : 'mb-4 text-xs'}`}>{dev.role}</p>
                  {dev.large && <p className="font-body-sm text-sm text-on-surface-variant mb-4">{dev.desc}</p>}
                </div>
                <div className={`${dev.large ? 'flex items-center justify-between mt-auto' : 'flex gap-2 mt-auto'}`}>
                  <div className="flex flex-wrap gap-2">
                    {dev.tags.map(tag => (
                      <span key={tag} className="font-code-display text-[10px] bg-white/5 border border-outline-variant text-on-surface-variant px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                  {dev.large && (
                    <div className="flex gap-2">
                      <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">code</span></a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
