"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User_1.User.find().select('-password');
        res.json({ message: 'Get all users', users });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findById(id).select('-password');
        res.json({ message: `Get user ${id}`, user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// POST create user
router.post('/', async (req, res) => {
    try {
        const user = await User_1.User.create(req.body);
        res.status(201).json({ message: 'User created', user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});
// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
        res.json({ message: `User ${id} updated`, user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});
// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User_1.User.findByIdAndDelete(id);
        res.json({ message: `User ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map