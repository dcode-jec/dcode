import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 } // Accept up to 20MB from camera/phone
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Optimize image to web-friendly resolution (max 800px) and quality for MongoDB storage
    const optimizedBuffer = await sharp(req.file.buffer)
      .resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    const dataUri = `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`;
    res.json({ url: dataUri });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Image processing failed' });
  }
});

export default router;
