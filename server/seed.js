import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import Admin from './models/Admin.js';
import TeamMember from './models/TeamMember.js';
import Event from './models/Event.js';
import GalleryItem from './models/GalleryItem.js';
import Stat from './models/Stat.js';
import SiteSettings from './models/SiteSettings.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to optimize and convert an image file to Base64 data URI for MongoDB storage
const fileToBase64 = async (folder, filename, maxDim = 600) => {
  if (!filename) return '';
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename; // External URL
  }
  const filePath = path.join(__dirname, '..', 'client', 'src', 'assets', folder, filename);
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    try {
      const optimized = await sharp(fileBuffer)
        .resize({ width: maxDim, height: maxDim, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();
      return `data:image/jpeg;base64,${optimized.toString('base64')}`;
    } catch (err) {
      console.warn(`Sharp optimize error for ${filename}, falling back:`, err.message);
      const ext = path.extname(filename).toLowerCase().replace('.', '');
      const mimeType = ext === 'jpg' ? 'jpeg' : ext;
      return `data:image/${mimeType};base64,${fileBuffer.toString('base64')}`;
    }
  }
  console.warn(`File not found: ${filePath}`);
  return '';
};

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Admin.deleteMany();
    await TeamMember.deleteMany();
    await Event.deleteMany();
    await GalleryItem.deleteMany();
    await Stat.deleteMany();
    await SiteSettings.deleteMany();

    console.log('Creating Admin...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({ email: 'admin@dcode.com', password: hashedPassword });

    console.log('Optimizing and Seeding Team Members into MongoDB...');
    const teamMembersRaw = [
      { name: 'Mr. Biswajit Sarmah', role: 'Faculty in Charge', session: 'permanent', category: 'faculty', file: 'biswajitsir.png', description: 'Guiding the vision and providing invaluable mentorship to the DCODE community. Instrumental in fostering a culture of innovation, continuous learning, and technical excellence among the students of Jorhat Engineering College.', socials: { linkedin: 'https://www.linkedin.com/in/biswajit-sarma-3a42b425/', email: 'eduneristbiswa@gmail.com' } },
      { name: 'Ms. Forheen Ahmed', role: 'Founder', session: 'permanent', category: 'founder', file: 'forheen.jpeg', description: 'The visionary behind DCODE. Founded the club with a mission to empower students, bridge the gap between academia and industry, and foster a culture of technological innovation and excellence.', socials: { linkedin: 'https://www.linkedin.com/in/forheen-ahmed/', email: 'forheen2017@gmail.com' } },
      
      { name: 'Tasdeeque Ruhani', role: 'Head', session: '25-26', category: 'leads', isCoreTeam: true, file: 'tasdeeque.jpg', socials: { instagram: 'https://www.instagram.com/taz.r.exe/', linkedin: 'https://www.linkedin.com/in/tasdeeque-ruhani/', email: 'tasdeequeruhani2002@gmail.com' }, order: 1 },
      { name: 'Sampriti Kalita', role: 'Co-Head', session: '25-26', category: 'leads', isCoreTeam: true, file: 'sampriti.jpeg', socials: { instagram: 'https://www.instagram.com/sampriti_kalita/', linkedin: 'https://www.linkedin.com/in/sampriti-kalita-a49198250/', email: 'sampritik100@gmail.com' }, order: 2 },
      { name: 'Nitul Das', role: 'Co-Head', session: '25-26', category: 'leads', isCoreTeam: true, file: 'nitul.jpeg', socials: { instagram: 'https://www.instagram.com/ni_t_ul8/', linkedin: 'https://www.linkedin.com/in/nituldas/', email: 'ndas6732@gmail.com' }, order: 3 },
      { name: 'Sameer Kashyap', role: 'Lead-Mentor', session: '25-26', category: 'leads', isCoreTeam: true, file: 'sameer.jpeg', socials: { instagram: 'https://www.instagram.com/scaptera_/', linkedin: 'https://www.linkedin.com/in/sameer-kashyap/', email: 'mistakenpirate38@gmail.com' }, order: 4 },

      { name: 'Anuvab Biswas', role: 'Management Lead', session: '25-26', category: 'management', file: 'anuvab.jpg', socials: { linkedin: 'https://www.linkedin.com/in/anuvab-biswas/', email: 'anuvab190@gmail.com' } },
      { name: 'Moitrayan Chakravarty', role: 'Management Associate', session: '25-26', category: 'management', file: 'moitrayan.jpg', socials: { linkedin: 'https://www.linkedin.com/in/moitrayan/', email: 'chakravartymoitrayan@gmail.com' } },
      { name: 'Dwebanga Patowary', role: 'Management Associate', session: '25-26', category: 'management', file: 'dwebanga.jpg', socials: { linkedin: 'https://www.linkedin.com/in/dwebanga-patowary-909209374/', email: 'dwebanga@gmail.com' } },
      { name: 'Antareep Borah', role: 'Management Associate', session: '25-26', category: 'management', file: 'antareep.jpg', socials: { email: 'antareepborah9@gmail.com' } },
      { name: 'Ripanshi Kumari', role: 'Management Associate', session: '25-26', category: 'management', file: 'ripanshi.jpg', socials: { instagram: 'https://www.instagram.com/ripan.shi/', linkedin: 'https://www.linkedin.com/in/ripanshi-kumari-474360326/', email: 'ripanshikumari44@gmail.com' } },
      { name: 'Saheem Ahmed Laskar', role: 'Management Associate', session: '25-26', category: 'management', file: 'saheem.jpeg', socials: { linkedin: 'https://www.linkedin.com/in/saheem-ahmed-laskar-ab3889301/', email: 'saheem.a.laskar@gmail.com' } },

      { name: 'Ritu Raj Bora', role: 'Public Relations Lead', session: '25-26', category: 'pr', file: 'rituraj.jpeg', socials: { instagram: 'https://www.instagram.com/riiiituraaj/', linkedin: 'https://www.linkedin.com/in/ritu-raj-bora-6341023b3/', email: 'riturajbora94@gmail.com' } },
      { name: 'Violeena Deka', role: 'Public Relations Associate', session: '25-26', category: 'pr', file: 'violeena.jpg', socials: { email: 'violeenadeka121@gmail.com' } },
      { name: 'Doyan Biswas', role: 'Public Relations Associate', session: '25-26', category: 'pr', file: 'doyan.jpg', socials: { instagram: 'https://www.instagram.com/_doyan__7/', linkedin: 'https://www.linkedin.com/in/doyan-biswas-b29b15313/', email: 'biswasdoyan@gmail.com' } },
      { name: 'Dreamsea Dutta', role: 'Public Relations Associate', session: '25-26', category: 'pr', file: 'dreamsea.jpg', socials: { instagram: 'https://www.instagram.com/dreamsea_dutta/', linkedin: 'https://www.linkedin.com/in/dreamsea-dutta-130996320/', email: 'duttadreamsea@gmail.com' } },

      { name: 'Ayushman Bordoloi', role: 'Technical Director', session: '25-26', category: 'technical', file: 'ayushman.jpg', socials: { instagram: 'https://www.instagram.com/ayushman_b16/', linkedin: 'https://www.linkedin.com/in/ayushman-bordoloi-33924b290/', email: 'ayushmanbordoloi02@gmail.com' } },
      { name: 'Bhikrant Borah', role: 'Technical Director', session: '25-26', category: 'technical', file: 'bhikrant.jpg', socials: { instagram: 'https://www.instagram.com/bhikrant_borah/', linkedin: 'https://www.linkedin.com/in/bhikrant-borah-a8656825a/', email: 'bhikrant59@gmail.com' } },
      { name: 'Shaswata Gogoi', role: 'Technical Director', session: '25-26', category: 'technical', file: 'shaswata.jpg', socials: { instagram: 'https://www.instagram.com/ishaswatg/', linkedin: 'https://www.linkedin.com/in/shaswata-gogoi/', email: 'gshaswata1@gmail.com' } },
      { name: 'Anurag Rajbonshi', role: 'Technical Director', session: '25-26', category: 'technical', file: 'anurag.jpg', socials: { instagram: 'https://www.instagram.com/annuuuuurag/', linkedin: 'https://www.linkedin.com/in/anurag-rajbonshi-b11544230/', email: 'anuragrajbonshi84@gmail.com' } },
      { name: 'Abhimanyu Saikia', role: 'Technical Associate', session: '25-26', category: 'technical', file: 'abhimanyu.jpg', socials: { instagram: 'https://www.instagram.com/escursio675/', linkedin: 'https://www.linkedin.com/in/saikia-abhimanyu/', email: 'abhisaikia675@gmail.com' } },
      { name: 'Priyam Nath', role: 'Technical Associate', session: '25-26', category: 'technical', file: 'priyam.webp', socials: { instagram: 'https://www.instagram.com/priyam_nath5/', linkedin: 'https://www.linkedin.com/in/priyam-nath-4a8487329/', email: 'priyamnath5@gmail.com' } },
      { name: 'Kalyan Dutta', role: 'Technical Associate', session: '25-26', category: 'technical', file: 'kalyan.jpeg', socials: { linkedin: 'https://www.linkedin.com/in/kalyan-dutta-bb7926308/', email: 'kalyandutta5002@gmail.com' } },
      { name: 'Suhani Chutia', role: 'Technical Associate', session: '25-26', category: 'technical', file: 'suhani.jpg', socials: { instagram: 'https://www.instagram.com/chocooky_08/', linkedin: 'https://www.linkedin.com/in/suhani-chutia-767b2a341/', email: 'suhanichutia00@gmail.com' } },
      { name: 'Preetis Debnath', role: 'Technical Associate', session: '25-26', category: 'technical', file: 'preetis.jpg', socials: { linkedin: 'https://www.linkedin.com/in/preetis-debnath-775a36321/', email: 'preetisdebnath.gdgcjec@gmail.com' } },
      { name: 'Jagreeti Dihingia', role: 'Technical Associate', session: '25-26', category: 'technical', file: 'jagreeti.jpg', socials: { linkedin: 'https://www.linkedin.com/in/jagreeti-dihingia-2a0803328/', email: 'djagreeti@gmail.com' } },
      { name: 'Nahidur Rahman', role: 'Technical Associate', session: '25-26', category: 'technical', file: 'nahidur.jpg', socials: { linkedin: 'https://www.linkedin.com/in/nahidur-rahman-596a651b9/', email: 'nahid.jec@gmail.com' } },
      { name: 'Mriganka Mahanta', role: 'Technical Associate', session: '25-26', category: 'technical', file: 'mriganka.jpg', socials: { instagram: 'https://www.instagram.com/mahanta._.mrigaa/', linkedin: 'https://www.linkedin.com/in/mriganka-mahanta-661981397/', email: 'mrigank195@gmail.com' } },

      { name: 'Nabadeep Dutta', role: 'Design Lead', session: '25-26', category: 'design', file: 'nabadeep.jpeg', socials: { instagram: 'https://www.instagram.com/nabadeep78/', linkedin: 'https://www.linkedin.com/in/nabadeep-dutta-96a257251/', email: 'nabadeepdutta8@gmail.com' } },
      { name: 'Shreya Bhuyan', role: 'Design Associate', session: '25-26', category: 'design', file: 'shreya.jpg', socials: { instagram: 'https://www.instagram.com/shreya.bhuyan/', linkedin: 'https://www.linkedin.com/in/shreya-bhuyan-756522330/', email: 'shreyabhuyan1@gmail.com' } },
      { name: 'Nibir Kalita', role: 'Design Associate', session: '25-26', category: 'design', file: 'nibir.jpg', socials: { instagram: 'https://www.instagram.com/nibirkalita_7/', linkedin: 'https://www.linkedin.com/in/nibirkalita07/', email: 'raag2263@gmail.com' } },
      { name: 'Abhinav Neog', role: 'Design Associate', session: '25-26', category: 'design', file: 'abhinav.jpg', socials: { instagram: 'https://www.instagram.com/abhinav_neog__/', linkedin: 'https://www.linkedin.com/in/abhinav-neog-abh1/', email: 'abhinavneog12@gmail.com' } },
      { name: 'Nayana Hazarika', role: 'Design Associate', session: '25-26', category: 'design', file: 'nayana.png', socials: { instagram: 'https://www.instagram.com/trauma_pie/', email: 'hazarikanayana2@gmail.com' } },

      { name: 'Alex Mercer', role: 'Former Head', session: '24-25', category: 'leads', file: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop' },
      { name: 'Jordan Lee', role: 'Former Co-Head', session: '24-25', category: 'leads', file: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop' },
      { name: 'Chris Evans', role: 'Lead Developer', session: '24-25', category: 'technical', file: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop' }
    ];

    const team = [];
    for (const m of teamMembersRaw) {
      const image = await fileToBase64('team', m.file, 500);
      team.push({
        name: m.name,
        role: m.role,
        category: m.category,
        session: m.session,
        isCoreTeam: !!m.isCoreTeam,
        image,
        description: m.description,
        socials: m.socials,
        order: m.order || 0
      });
    }
    await TeamMember.insertMany(team);

    console.log('Optimizing and Seeding Events into MongoDB...');
    const eventsRaw = [
      { title: 'Mind Maze 3.0', type: 'FLAGSHIP', category: 'Contests', date: 'Oct 2024', isMain: true, isHomepage: true, file: 'MindMaze3.png', description: 'Our premier annual flagship contest where logic meets creativity. Challenge your problem-solving skills in our most awaited technical showdown.' },
      { title: 'Code Clash 3.0', type: 'COMPETITION', category: 'Contests', date: 'Nov 2024', isHomepage: true, description: 'A high-intensity competitive programming battle. Prove your algorithm mastery and climb the leaderboard.' },
      { title: 'Hackvita 4.0', type: 'HACKATHON', category: 'Contests', date: 'Feb 2025', isHomepage: true, description: 'The ultimate 48-hour build-a-thon. Transform your wildest ideas into functional prototypes and compete for the top spot.' },
      { title: 'DSA Workshop', type: 'WORKSHOP', category: 'Workshops', date: 'Dec 2024', description: 'Master the fundamentals of Data Structures and Algorithms. Essential preparation for technical interviews and competitive coding.' },
      { title: 'Language Orientation', type: 'ORIENTATION', category: 'Workshops', date: 'Mar 2025', description: 'Introduction to modern programming paradigms and languages. Level up your syntax and explore new development horizons.' },
      { title: 'CLUB Afterparty', type: 'SOCIAL', category: 'Culture', date: 'May 2025', description: 'Relax, network, and celebrate our technical achievements. The perfect way to bond with the DCODE community.' }
    ];

    const events = [];
    for (const ev of eventsRaw) {
      const image = ev.file ? await fileToBase64('events', ev.file, 1000) : '';
      events.push({
        title: ev.title,
        type: ev.type,
        category: ev.category,
        date: ev.date,
        isMain: !!ev.isMain,
        isHomepage: !!ev.isHomepage,
        image,
        description: ev.description,
        order: ev.order || 0
      });
    }
    await Event.insertMany(events);

    console.log('Optimizing and Seeding Gallery into MongoDB...');
    const galleryRaw = [
      { title: 'Mind Maze 3.0', type: 'Flagship Contest', category: 'contest', span: 'row-span-2', isHomepage: true, file: 'mindmaze3.0.JPG' },
      { title: 'Code Clash 3.0', type: 'Coding Competition', category: 'contest', span: '', isHomepage: true, file: 'codeclas3.0.jpeg' },
      { title: 'Hackvita 4.0', type: 'Hackathon', category: 'contest', span: 'row-span-2', isHomepage: true, file: 'hackvita4.0.jpeg' },
      { title: 'DSA Worksop', type: 'DSA PREPARATION', category: 'workshop', span: 'row-span-2', file: 'dsa.jpeg' },
      { title: 'Language Orientation', type: 'Language', category: 'workshop', span: '', file: 'language.jpg' },
      { title: 'CLUB Afterparty', type: 'CULTURE', category: 'culture', span: '', file: 'afterparty.jpeg' }
    ];

    const gallery = [];
    for (const g of galleryRaw) {
      const image = await fileToBase64('gallery', g.file, 800);
      gallery.push({
        title: g.title,
        type: g.type,
        category: g.category,
        span: g.span || '',
        isHomepage: !!g.isHomepage,
        image,
        order: g.order || 0
      });
    }
    await GalleryItem.insertMany(gallery);

    console.log('Seeding Stats...');
    const stats = [
      { value: '50+', label: 'Current and Past Members', order: 0 },
      { value: '20+', label: 'Events', order: 1 },
      { value: '50+', label: 'Workshops', order: 2 },
      { value: '100+', label: 'Projects', order: 3 }
    ];
    await Stat.insertMany(stats);

    console.log('Seeding Settings...');
    await SiteSettings.create({});

    // Ensure index on order
    await TeamMember.collection.createIndex({ order: 1 });
    await Event.collection.createIndex({ order: 1 });
    await GalleryItem.collection.createIndex({ order: 1 });

    console.log('✅ Data Imported with optimized Base64 images directly into MongoDB!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
