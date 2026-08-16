import { Router } from 'express';
import { Team } from '../models/Team';

const router = Router();

// GET all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json({ message: 'Get all teams', teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// GET team by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    res.json({ message: `Get team ${id}`, team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// POST create team
router.post('/', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ message: 'Team created', team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team' });
  }
});

// PUT update team
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: `Team ${id} updated`, team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team' });
  }
});

// DELETE team
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Team.findByIdAndDelete(id);
    res.json({ message: `Team ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
