const express = require('express');
const router = express.Router();
const { users } = require('../db');
const auth = require('../middleware/auth');

// Get all users (Discovery)
router.get('/', auth, (req, res) => {
  try {
    // Exclude current user from recommendations
    const otherUsers = users
      .filter(u => u._id !== req.user.id)
      .map(u => {
        const { password, ...rest } = u;
        return rest;
      });
    res.json(otherUsers);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get user by ID
router.get('/:id', auth, (req, res) => {
  try {
    const user = users.find(u => u._id === req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    const { password, ...rest } = user;
    res.json(rest);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update Profile
router.put('/me', auth, (req, res) => {
  try {
    const idx = users.findIndex(u => u._id === req.user.id);
    if (idx === -1) return res.status(404).json({ msg: 'User not found' });
    
    users[idx] = { ...users[idx], ...req.body };
    const { password, ...rest } = users[idx];
    res.json(rest);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
