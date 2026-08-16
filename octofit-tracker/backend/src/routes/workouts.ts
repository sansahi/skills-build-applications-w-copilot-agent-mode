import { Router } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

// GET all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json({ message: 'Get all workouts', workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET workout by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    res.json({ message: `Get workout ${id}`, workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST create workout
router.post('/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ message: 'Workout created', workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

// PUT update workout
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: `Workout ${id} updated`, workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// DELETE workout
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Workout.findByIdAndDelete(id);
    res.json({ message: `Workout ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
