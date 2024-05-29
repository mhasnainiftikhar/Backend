// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../model/user');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST a new user
router.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message }); 
        }
      
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// UPDATE a user
router.put('/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email, password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
