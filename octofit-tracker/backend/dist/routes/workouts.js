"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
// GET all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.Workout.find();
        res.json({ message: 'Get all workouts', workouts });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// GET workout by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.Workout.findById(id);
        res.json({ message: `Get workout ${id}`, workout });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
// POST create workout
router.post('/', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.create(req.body);
        res.status(201).json({ message: 'Workout created', workout });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create workout' });
    }
});
// PUT update workout
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.Workout.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: `Workout ${id} updated`, workout });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update workout' });
    }
});
// DELETE workout
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Workout_1.Workout.findByIdAndDelete(id);
        res.json({ message: `Workout ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});
exports.default = router;
//# sourceMappingURL=workouts.js.map