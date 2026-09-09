import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  footerAttribution: { type: String, default: 'Built with love by Tasdeeque Ruhani' },
  socialLinks: {
    instagram: { type: String, default: 'https://www.instagram.com/dcode_jec/' },
    linkedin: { type: String, default: 'https://www.linkedin.com/in/dcode-jec/' },
    github: { type: String, default: 'https://github.com/dcode-jec' }
  },
  contactEmail: { type: String, default: 'dcode.jec@gmail.com' },
  heroTagline: { type: String, default: 'Where ideas compile into impact.' },
  heroDescription: { type: String, default: 'Welcome to DCODE, the premier coding community of Jorhat Engineering College. We build, break, and innovate together.' }
});

export default mongoose.model('SiteSettings', siteSettingsSchema);
