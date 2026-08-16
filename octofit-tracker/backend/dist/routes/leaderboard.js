"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = require("../models/Leaderboard");
const router = (0, express_1.Router)();
// GET leaderboard
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find().sort({ totalPoints: -1 });
        res.json({ message: 'Get leaderboard', leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// GET leaderboard by team
router.get('/team/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const leaderboard = await Leaderboard_1.Leaderboard.find({ teamId }).sort({ totalPoints: -1 });
        res.json({ message: `Get leaderboard for team ${teamId}`, leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
// GET user rank
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const rank = await Leaderboard_1.Leaderboard.findOne({ userId });
        res.json({ message: `Get rank for user ${userId}`, rank });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user rank' });
    }
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map