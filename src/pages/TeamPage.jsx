import React, { useState } from 'react';
import { motion } from 'framer-motion';
import biswajitsirImg from '../assets/team/biswajitsir.png';
import forheenImg from '../assets/team/forheen.jpeg';
import sameerImg from '../assets/team/sameer.jpeg';
import nitulImg from '../assets/team/nitul.jpeg';
import sampritiImg from '../assets/team/sampriti.jpeg';
import tasdeequeImg from '../assets/team/tasdeeque.jpg';
import anuvabImg from '../assets/team/anuvab.jpg';
import riturajImg from '../assets/team/rituraj.jpeg';
import abhimanyuImg from '../assets/team/abhimanyu.jpg';
import abhinavImg from '../assets/team/abhinav.jpg';
import antareepImg from '../assets/team/antareep.jpg';
import anuragImg from '../assets/team/anurag.jpg';
import ayushmanImg from '../assets/team/ayushman.jpg';
import bhikrantImg from '../assets/team/bhikrant.jpg';
import doyanImg from '../assets/team/doyan.jpg';
import dreamseaImg from '../assets/team/dreamsea.jpg';
import dwebangaImg from '../assets/team/dwebanga.jpg';
import jagreetiImg from '../assets/team/jagreeti.jpg';
import kalyanImg from '../assets/team/kalyan.jpeg';
import moitrayanImg from '../assets/team/moitrayan.jpg';
import mrigankaImg from '../assets/team/mriganka.jpg';
import nabadeepImg from '../assets/team/nabadeep.jpeg';
import nahidurImg from '../assets/team/nahidur.jpg';
import nibirImg from '../assets/team/nibir.jpg';
import preetisImg from '../assets/team/preetis.jpg';
import priyamImg from '../assets/team/priyam.webp';
import ripanshiImg from '../assets/team/ripanshi.jpg';
import saheemImg from '../assets/team/saheem.jpeg';
import shaswataImg from '../assets/team/shaswata.jpg';
import shreyaImg from '../assets/team/shreya.jpg';
import suhaniImg from '../assets/team/suhani.jpg';
import violeenaImg from '../assets/team/violeena.jpg';
import nayanaImg from '../assets/team/nayana.png';

// 2026-27 members
import brishavImg from '../assets/team/brishav.jpg';
import bibekImg from '../assets/team/bibek.jpg';
import kundalkalyanImg from '../assets/team/kundalkalyan.jpg';
import shakhyarImg from '../assets/team/shakhyar.jpg';
import souradeepImg from '../assets/team/souradeep.jpg';
import bornaliImg from '../assets/team/bornali.jpg';
import priyaImg from '../assets/team/priya.jpg';
import rittamImg from '../assets/team/rittam.jpg';
import gyanamImg from '../assets/team/gyanam.jpg';
import priyangshuImg from '../assets/team/priyangshu.jpg';
import anweshaImg from '../assets/team/anwesha.jpg';
import dibyaniImg from '../assets/team/dibyani.jpg';
import nidarshanaImg from '../assets/team/nidarshana.jpg';

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
      <p className="font-code-display text-sm text-primary mt-1 mb-3">{member.role}</p>
      {member.bio && (
        <p className="font-body-sm text-on-surface-variant/80 text-xs mb-4 line-clamp-3 leading-relaxed">
          {member.bio}
        </p>
      )}

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
          <TeamCard key={idx} member={member} />
        ))}
      </div>
    </div>
  );
};

const TeamPage = () => {
  const [activeSession, setActiveSession] = useState('26-27');

  const faculty = {
    name: "Mr. Biswajit Sarmah", role: "Faculty in Charge",
    img: biswajitsirImg,
    desc: "Guiding the vision and providing invaluable mentorship to the DCODE community. Instrumental in fostering a culture of innovation, continuous learning, and technical excellence among the students of Jorhat Engineering College.",
    socials: { insta: '#', linkedin: 'https://www.linkedin.com/in/biswajit-sarma-3a42b425/', email: 'eduneristbiswa@gmail.com' }
  };

  const sessions = {
    '26-27': {
      leads: [
        {
          name: "Abhimanyu Saikia",
          role: "Head",
          img: abhimanyuImg,
          bio: "Beep boop!",
          socials: { insta: 'https://www.instagram.com/escursio675/', linkedin: 'https://www.linkedin.com/in/saikia-abhimanyu/', email: 'abhisaikia675@gmail.com' }
        },
        {
          name: "Nayana Hazarika",
          role: "Co-Head",
          img: nayanaImg,
          bio: "Dk",
          socials: { insta: 'https://www.instagram.com/trauma_pie/', linkedin: '#', email: 'hazarikanayana2@gmail.com' }
        },
        {
          name: "Mriganka Mahanta",
          role: "Co-Head",
          img: mrigankaImg,
          bio: "",
          socials: { insta: 'https://www.instagram.com/mahanta._.mrigaa/', linkedin: 'https://www.linkedin.com/in/mriganka-mahanta-661981397/', email: 'mrigank195@gmail.com' }
        },
        {
          name: "Anuvab Biswas",
          role: "Lead Mentor",
          img: anuvabImg,
          bio: "Powered by butter chicken, and late-night debugging sessions. From orchestrating campus hack events to tackling tricky logic puzzles, I’m here to turn \"it worked on my machine\" into reality.",
          socials: { insta: '#', linkedin: 'https://www.linkedin.com/in/anuvab-biswas/', email: 'anuvab190@gmail.com' }
        }
      ],
      management: [
        {
          name: "Suhani Chutia",
          role: "Management Head",
          img: suhaniImg,
          bio: "A Computer Science student who enjoys exploring technology, learning new things, and turning ideas into meaningful projects. Outside academics, I love reading novels, travelling, and exploring new places. I’m always excited to take on new challenges and make the most of every experience.",
          socials: { insta: 'https://www.instagram.com/chocooky_08/', linkedin: 'https://www.linkedin.com/in/suhani-chutia-767b2a341/', email: 'suhanichutia00@gmail.com' }
        },
        {
          name: "Brishav Bordoloi",
          role: "Management Associate",
          img: brishavImg,
          bio: "I balance the fast pace of life with quiet moments on cycling trails and deep focus in my projects. A natural peace-lover, I bring a steady, low-stress energy to every team. Ultimately, the best things thrive in calm minds.",
          socials: { insta: '#', linkedin: '#', email: '#' }
        },
        {
          name: "Kundalkalyan Boruah",
          role: "Event Management",
          img: kundalkalyanImg,
          bio: "Building cool stuff, breaking things,",
          socials: { insta: '#', linkedin: '#', email: '#' }
        },
        {
          name: "Souradeep Deb",
          role: "Management Associate",
          img: souradeepImg,
          bio: "A 2nd-year CSE sophomore exploring every tech domain before picking a favourite. I code, experiment, break things, fix them, and repeat—still figuring out where I fit best.",
          socials: { insta: '#', linkedin: '#', email: '#' }
        },
        {
          name: "Priya Swargiary",
          role: "Management Associate",
          img: priyaImg,
          bio: "Mechanical Engineering student and Management Associate at Dcode Club. Curious by nature, driven to learn, collaborate, and turn ideas into action. Always open to new experiences and challenges.",
          socials: { insta: '#', linkedin: '#', email: '#' }
        },
        {
          name: "Anwesha Dey",
          role: "Management Associate",
          img: anweshaImg,
          bio: "A CSE student who enjoys exploring technology, meeting new people, and taking on new challenges. Curious, creative, and always eager to learn, I love working with people and turning ideas into meaningful experiences. Excited to contribute, collaborate, and grow as a part of the DCode community.",
          socials: { insta: '#', linkedin: '#', email: '#' }
        }
      ],
      pr: [
        {
          name: "Doyan Biswas",
          role: "Public Relations Head",
          img: doyanImg,
          bio: "Backend brain, PR duties, and a questionable sleep schedule. Building things, promoting things, meeting deadlines, and occasionally breaking things. Somewhere between debugging code and debugging event chaos, I survive",
          socials: { insta: 'https://www.instagram.com/_doyan__7/', linkedin: 'https://www.linkedin.com/in/doyan-biswas-b29b15313/', email: 'biswasdoyan@gmail.com' }
        }
      ],
      design: [
        {
          name: "Nibir Kalita",
          role: "Design Co-Lead",
          img: nibirImg,
          bio: "A storyteller who loves blending creativity with tech . I do designs , arts , music , dramas and many more . Love exploring new ideas , new concepts and I try to keep pushing myself to higher limits ! ",
          socials: { insta: 'https://www.instagram.com/nibirkalita_7/', linkedin: 'https://www.linkedin.com/in/nibirkalita07/', email: 'raag2263@gmail.com' }
        },
        {
          name: "Shreya Bhuyan",
          role: "Design Co-Lead",
          img: shreyaImg,
          bio: "Shreya Bhuyan is a creator bridging code and canvas. As a member of the design team, she combines sharp programming expertise with a strong eye for aesthetics to craft engaging digital experiences.",
          socials: { insta: 'https://www.instagram.com/shreya.bhuyan/', linkedin: 'https://www.linkedin.com/in/shreya-bhuyan-756522330/', email: 'shreyabhuyan1@gmail.com' }
        },
        {
          name: "Bornali Tasha",
          role: "Design Associate",
          img: bornaliImg,
          bio: "I keep signing up for things and figuring out how to do them later 😭 Currently surviving civil engineering, collecting random experiences, and somehow ending up in the middle of everything.",
          socials: { insta: '#', linkedin: '#', email: '#' }
        },
        {
          name: "Gyanam Duwara",
          role: "Design Associate",
          img: gyanamImg,
          bio: "Hi , myself Gyanam.",
          socials: { insta: '#', linkedin: '#', email: '#' }
        }
      ],
      technical: [
        {
          name: "Priyam Nath",
          role: "Tech Lead",
          img: priyamImg,
          bio: "",
          socials: { insta: 'https://www.instagram.com/priyam_nath5/', linkedin: 'https://www.linkedin.com/in/priyam-nath-4a8487329/', email: 'priyamnath5@gmail.com' }
        },
        {
          name: "Priyangshu Das",
          role: "Technical Coordinator",
          img: priyangshuImg,
          bio: "A CSE student who likes coding, building things, and occasionally overcomplicating simple problems. Usually found somewhere between DSA, web development, and random tech experiments. As Technical Coordinator of DCODE, currently trying to make things happen without breaking the code—or the team.",
          socials: { insta: '#', linkedin: '#', email: '#' }
        },
        {
          name: "Bibek Sarma",
          role: "Technical Associate",
          img: bibekImg,
          bio: "Code> Create> Break> Debug> Repeat. Building things, learning things, and occasionally wondering why the code worked yesterday. Code, coffee, and a never-ending list of things that I wanna build. Just here to learn, experiment, and obviously to make cool stuff.",
          socials: { insta: '#', linkedin: '#', email: '#' }
        },
        {
          name: "Shakhyar Gogoi",
          role: "Technical Associate",
          img: shakhyarImg,
          bio: "Self-taught programmer since 2016, AI researcher, and creator of the novel AI architectures, the COMET-SG series. I focus on building efficient machine learning systems and lightweight backend pipelines for tiny hardwares. When I’m away from the keyboard, you’ll usually find me getting completely immersed in story-driven video games.",
          socials: { insta: '#', linkedin: '#', email: '#' }
        },
        {
          name: "Rittam",
          role: "Technical Associate",
          img: rittamImg,
          bio: "I build websites that become obscure. Entropy OP",
          socials: { insta: '#', linkedin: '#', email: '#' }
        },
        {
          name: "Dibyani Paul",
          role: "Technical Associate",
          img: dibyaniImg,
          bio: "Fueled by good music, hands-on projects, and a brand new curiosity for tech.",
          socials: { insta: '#', linkedin: '#', email: '#' }
        },
        {
          name: "Nidarshana Kafley",
          role: "Technical Associate",
          img: nidarshanaImg,
          bio: "can't wait for retirement ",
          socials: { insta: '#', linkedin: '#', email: '#' }
        }
      ]
    },
    '25-26': {
      leads: [
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
      ],
      management: [
        { name: "Anuvab Biswas", role: "Management Lead", img: anuvabImg, socials: { insta: '#', linkedin: 'https://www.linkedin.com/in/anuvab-biswas/', email: 'anuvab190@gmail.com' } },
        { name: "Moitrayan Chakravarty", role: "Management Associate", img: moitrayanImg, socials: { insta: '#', linkedin: 'https://www.linkedin.com/in/moitrayan/', email: 'chakravartymoitrayan@gmail.com' } },
        { name: "Dwebanga Patowary", role: "Management Associate", img: dwebangaImg, socials: { insta: '#', linkedin: 'https://www.linkedin.com/in/dwebanga-patowary-909209374/', email: 'dwebanga@gmail.com' } },
        { name: "Antareep Borah", role: "Management Associate", img: antareepImg, socials: { insta: '#', linkedin: '#', email: 'antareepborah9@gmail.com' } },
        { name: "Ripanshi Kumari", role: "Management Associate", img: ripanshiImg, socials: { insta: 'https://www.instagram.com/ripan.shi/', linkedin: 'https://www.linkedin.com/in/ripanshi-kumari-474360326/', email: 'ripanshikumari44@gmail.com' } },
        { name: "Saheem Ahmed Laskar", role: "Management Associate", img: saheemImg, socials: { insta: '#', linkedin: 'https://www.linkedin.com/in/saheem-ahmed-laskar-ab3889301/', email: 'saheem.a.laskar@gmail.com' } }
      ],
      pr: [
        { name: "Ritu Raj Bora", role: "Public Relations Lead", img: riturajImg, socials: { insta: 'https://www.instagram.com/riiiituraaj/', linkedin: 'https://www.linkedin.com/in/ritu-raj-bora-6341023b3/', email: 'riturajbora94@gmail.com' } },
        { name: "Violeena Deka", role: "Public Relations Associate", img: violeenaImg, socials: { insta: '#', linkedin: '#', email: 'violeenadeka121@gmail.com' } },
        { name: "Doyan Biswas", role: "Public Relations Associate", img: doyanImg, socials: { insta: 'https://www.instagram.com/_doyan__7/', linkedin: 'https://www.linkedin.com/in/doyan-biswas-b29b15313/', email: 'biswasdoyan@gmail.com' } },
        { name: "Dreamsea Dutta", role: "Public Relations Associate", img: dreamseaImg, socials: { insta: 'https://www.instagram.com/dreamsea_dutta/', linkedin: 'https://www.linkedin.com/in/dreamsea-dutta-130996320/', email: 'duttadreamsea@gmail.com' } }
      ],
      technical: [
        { name: "Ayushman Bordoloi", role: "Technical Director", img: ayushmanImg, socials: { insta: 'https://www.instagram.com/ayushman_b16/', linkedin: 'https://www.linkedin.com/in/ayushman-bordoloi-33924b290/', email: 'ayushmanbordoloi02@gmail.com' } },
        { name: "Bhikrant Borah", role: "Technical Director", img: bhikrantImg, socials: { insta: 'https://www.instagram.com/bhikrant_borah/', linkedin: 'https://www.linkedin.com/in/bhikrant-borah-a8656825a/', email: 'bhikrant59@gmail.com' } },
        { name: "Shaswata Gogoi", role: "Technical Director", img: shaswataImg, socials: { insta: 'https://www.instagram.com/ishaswatg/', linkedin: 'https://www.linkedin.com/in/shaswata-gogoi/', email: 'gshaswata1@gmail.com' } },
        { name: "Anurag Rajbonshi", role: "Technical Director", img: anuragImg, socials: { insta: 'https://www.instagram.com/annuuuuurag/', linkedin: 'https://www.linkedin.com/in/anurag-rajbonshi-b11544230/', email: 'anuragrajbonshi84@gmail.com' } },
        { name: "Abhimanyu Saikia", role: "Technical Associate", img: abhimanyuImg, socials: { insta: 'https://www.instagram.com/escursio675/', linkedin: 'https://www.linkedin.com/in/saikia-abhimanyu/', email: 'abhisaikia675@gmail.com' } },
        { name: "Priyam Nath", role: "Technical Associate", img: priyamImg, socials: { insta: 'https://www.instagram.com/priyam_nath5/', linkedin: 'https://www.linkedin.com/in/priyam-nath-4a8487329/', email: 'priyamnath5@gmail.com' } },
        { name: "Kalyan Dutta", role: "Technical Associate", img: kalyanImg, socials: { insta: '#', linkedin: 'https://www.linkedin.com/in/kalyan-dutta-bb7926308/', email: 'kalyandutta5002@gmail.com' } },
        { name: "Suhani Chutia", role: "Technical Associate", img: suhaniImg, socials: { insta: 'https://www.instagram.com/chocooky_08/', linkedin: 'https://www.linkedin.com/in/suhani-chutia-767b2a341/', email: 'suhanichutia00@gmail.com' } },
        { name: "Preetis Debnath", role: "Technical Associate", img: preetisImg, socials: { insta: '#', linkedin: 'https://www.linkedin.com/in/preetis-debnath-775a36321/', email: 'preetisdebnath.gdgcjec@gmail.com' } },
        { name: "Jagreeti Dihingia", role: "Technical Associate", img: jagreetiImg, socials: { insta: '#', linkedin: 'https://www.linkedin.com/in/jagreeti-dihingia-2a0803328/', email: 'djagreeti@gmail.com' } },
        { name: "Nahidur Rahman", role: "Technical Associate", img: nahidurImg, socials: { insta: '#', linkedin: 'https://www.linkedin.com/in/nahidur-rahman-596a651b9/', email: 'nahid.jec@gmail.com' } },
        { name: "Mriganka Mahanta", role: "Technical Associate", img: mrigankaImg, socials: { insta: 'https://www.instagram.com/mahanta._.mrigaa/', linkedin: 'https://www.linkedin.com/in/mriganka-mahanta-661981397/', email: 'mrigank195@gmail.com' } }
      ],
      design: [
        { name: "Nabadeep Dutta", role: "Design Lead", img: nabadeepImg, socials: { insta: 'https://www.instagram.com/nabadeep78/', linkedin: 'https://www.linkedin.com/in/nabadeep-dutta-96a257251/', email: 'nabadeepdutta8@gmail.com' } },
        { name: "Shreya Bhuyan", role: "Design Associate", img: shreyaImg, socials: { insta: 'https://www.instagram.com/shreya.bhuyan/', linkedin: 'https://www.linkedin.com/in/shreya-bhuyan-756522330/', email: 'shreyabhuyan1@gmail.com' } },
        { name: "Nibir Kalita", role: "Design Associate", img: nibirImg, socials: { insta: 'https://www.instagram.com/nibirkalita_7/', linkedin: 'https://www.linkedin.com/in/nibirkalita07/', email: 'raag2263@gmail.com' } },
        { name: "Abhinav Neog", role: "Design Associate", img: abhinavImg, socials: { insta: 'https://www.instagram.com/abhinav_neog__/', linkedin: 'https://www.linkedin.com/in/abhinav-neog-abh1/', email: 'abhinavneog12@gmail.com' } },
        { name: "Nayana Hazarika", role: "Design Associate", img: nayanaImg, socials: { insta: 'https://www.instagram.com/trauma_pie/', linkedin: '#', email: 'hazarikanayana2@gmail.com' } }
      ]
    },
    '24-25': {
      leads: [
        { name: "Alex Mercer", role: "Former Head", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop", socials: { insta: '#', linkedin: '#', email: '#' } },
        { name: "Jordan Lee", role: "Former Co-Head", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", socials: { insta: '#', linkedin: '#', email: '#' } }
      ],
      technical: [
        { name: "Chris Evans", role: "Lead Developer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop", socials: { insta: '#', linkedin: '#', email: '#' } }
      ]
    }
  };

  const currentData = sessions[activeSession];

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
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-on-surface">Guiding <span className="text-primary">Forces</span></h3>
            <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Faculty Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-xl p-8 border border-outline-variant hover:border-primary/50 transition-colors flex flex-col items-center text-center w-full"
            >
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border-2 border-primary/30 shrink-0 bg-surface-container-high mb-6">
                <img src={faculty.img} alt={faculty.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-center h-full">
                <h4 className="font-headline-md text-2xl font-bold text-on-surface mb-2">{faculty.name}</h4>
                <p className="font-code-display text-md text-primary mb-4">{faculty.role}</p>
                <p className="font-body-sm text-on-surface-variant mb-6 text-sm">
                  {faculty.desc}
                </p>
                <div className="flex gap-4 justify-center mt-auto">
                  <a href={faculty.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-blue-500 transition-colors" title="LinkedIn">
                    <i className="fa-brands fa-linkedin text-xl"></i>
                  </a>
                  <a href={`mailto:${faculty.socials.email}`} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors" title="Email">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Founder Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel rounded-xl p-8 border border-outline-variant hover:border-primary/50 transition-colors flex flex-col items-center text-center w-full"
            >
              <div className="w-40 h-40 rounded-[2rem] overflow-hidden border-2 border-primary/30 shrink-0 bg-surface-container-high mb-6 flex items-center justify-center">
                <img src={forheenImg} alt={forheenImg} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-center h-full">
                <h4 className="font-headline-md text-2xl font-bold text-on-surface mb-2">Ms. Forheen Ahmed</h4>
                <p className="font-code-display text-md text-primary mb-4">Founder</p>
                <p className="font-body-sm text-on-surface-variant mb-6 text-sm">
                  The visionary behind DCODE. Founded the club with a mission to empower students, bridge the gap between academia and industry, and foster a culture of technological innovation and excellence.
                </p>
                <div className="flex gap-4 justify-center mt-auto">
                  <a href="https://www.linkedin.com/in/forheen-ahmed/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-blue-500 transition-colors" title="LinkedIn">
                    <i className="fa-brands fa-linkedin text-xl"></i>
                  </a>
                  <a href="mailto:forheen2017@gmail.com" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors" title="Email">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Session Filter */}
        <div className="mb-12 glass-panel rounded-lg p-2 inline-flex flex-wrap gap-2 items-center border border-outline-variant bg-surface-container/80 backdrop-blur-xl">
          <div className="flex gap-2 px-3">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <div className="w-3 h-3 rounded-full bg-primary-container"></div>
            <div className="w-3 h-3 rounded-full bg-surface-tint"></div>
          </div>
          <div className="h-6 w-px bg-outline-variant mx-2"></div>
          <button
            onClick={() => setActiveSession('26-27')}
            className={`font-code-display text-sm px-4 py-2 rounded-md transition-all ${activeSession === '26-27' ? 'bg-primary text-on-primary font-bold shadow-[0_0_15px_rgba(254,149,32,0.3)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'}`}
          >
            Session '26-'27
          </button>
          <button
            onClick={() => setActiveSession('25-26')}
            className={`font-code-display text-sm px-4 py-2 rounded-md transition-all ${activeSession === '25-26' ? 'bg-primary text-on-primary font-bold shadow-[0_0_15px_rgba(254,149,32,0.3)]' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'}`}
          >
            Session '25-'26
          </button>
        </div>

        <motion.div
          key={activeSession}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentData ? (
            <>
              <Section title="Our Leads" members={currentData.leads} />
              <Section title="Public Relations Team" members={currentData.pr} />
              <Section title="Design Team" members={currentData.design} />
              <Section title="Management Team" members={currentData.management} />
              <Section title="Technical Team" members={currentData.technical} />
            </>
          ) : (
            <div className="py-24 text-center">
              <span className="material-symbols-outlined text-6xl text-primary-container/50 mb-4">hourglass_empty</span>
              <h3 className="font-headline-md text-3xl font-bold text-on-surface mb-2">To Be Released Soon</h3>
              <p className="font-code-display text-on-surface-variant">We are currently forming the next generation of architects.</p>
            </div>
          )}
        </motion.div>

      </section>
    </main>
  );
};

export default TeamPage;
