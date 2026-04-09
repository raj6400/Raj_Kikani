import express, { Request, Response } from 'express';
import Lab14 from '../models/Lab14';

const router = express.Router();

// @desc    Get all LB14 entries
// @route   GET /api/lb14
router.get('/', async (_req: Request, res: Response) => {
  try {
    const entries = await Lab14.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new LB14 entry (Save and Store)
// @route   POST /api/lb14
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;
    
    const newEntry = new Lab14({
      title,
      description,
      status
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
