import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({});
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({});
    if (!settings) {
      settings = new SiteSettings({});
    }

    if (req.body.footerAttribution !== undefined) settings.footerAttribution = req.body.footerAttribution;
    if (req.body.contactEmail !== undefined) settings.contactEmail = req.body.contactEmail;
    if (req.body.heroTagline !== undefined) settings.heroTagline = req.body.heroTagline;
    if (req.body.heroDescription !== undefined) settings.heroDescription = req.body.heroDescription;
    if (req.body.socialLinks) {
      settings.socialLinks = {
        instagram: req.body.socialLinks.instagram ?? settings.socialLinks?.instagram,
        linkedin: req.body.socialLinks.linkedin ?? settings.socialLinks?.linkedin,
        github: req.body.socialLinks.github ?? settings.socialLinks?.github
      };
    }

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    console.error('Settings update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
