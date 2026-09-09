import express from 'express';
import Stat from '../models/Stat.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const stats = await Stat.find({}).sort({ order: 1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const stat = new Stat(req.body);
    const createdStat = await stat.save();
    res.status(201).json(createdStat);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const stat = await Stat.findById(req.params.id);
    if (stat) {
      Object.assign(stat, req.body);
      const updatedStat = await stat.save();
      res.json(updatedStat);
    } else {
      res.status(404).json({ message: 'Stat not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const stat = await Stat.findByIdAndDelete(req.params.id);
    if (stat) {
      res.json({ message: 'Stat removed' });
    } else {
      res.status(404).json({ message: 'Stat not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
