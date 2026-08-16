import { Router } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

// GET all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json({ message: 'Get all activities', activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET activity by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    res.json({ message: `Get activity ${id}`, activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST create activity
router.post('/', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ message: 'Activity created', activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// PUT update activity
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: `Activity ${id} updated`, activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// DELETE activity
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    res.json({ message: `Activity ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
