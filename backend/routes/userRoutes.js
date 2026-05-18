const express = require('express');
const router = express.Router();
const { users, friendRequests } = require('../db');
const auth = require('../middleware/auth');
const crypto = require('crypto');

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

// Get pending friend requests for current user
router.get('/pending', auth, (req, res) => {
  try {
    const pending = friendRequests.filter(reqObj => reqObj.to === req.user.id && reqObj.status === 'pending');
    
    // Populate sender info
    const populated = pending.map(reqObj => {
      const sender = users.find(u => u._id === reqObj.from);
      return { ...reqObj, sender: sender ? { _id: sender._id, fullName: sender.fullName, profilePicture: sender.profilePicture } : null };
    });
    
    res.json(populated);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get sent friend requests
router.get('/sent', auth, (req, res) => {
  try {
    const sent = friendRequests.filter(reqObj => reqObj.from === req.user.id && reqObj.status === 'pending');
    res.json(sent);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Send friend request
router.post('/request/:id', auth, (req, res) => {
  try {
    const targetId = req.params.id;
    if (targetId === req.user.id) return res.status(400).json({ msg: "Cannot add yourself" });
    
    // Check if already requested or friends
    const existing = friendRequests.find(r => 
      (r.from === req.user.id && r.to === targetId) || 
      (r.from === targetId && r.to === req.user.id)
    );
    
    if (existing) {
      if (existing.status === 'pending') {
        return res.status(400).json({ msg: "Request already exists" });
      } else {
        return res.status(400).json({ msg: "Already friends" });
      }
    }
    
    const newRequest = {
      _id: crypto.randomBytes(16).toString('hex'),
      from: req.user.id,
      to: targetId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    friendRequests.push(newRequest);
    res.json(newRequest);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Accept friend request
router.post('/accept/:id', auth, (req, res) => {
  try {
    const requestId = req.params.id;
    const reqObj = friendRequests.find(r => r._id === requestId);
    
    if (!reqObj) return res.status(404).json({ msg: "Request not found" });
    if (reqObj.to !== req.user.id) return res.status(401).json({ msg: "Not authorized" });
    
    reqObj.status = 'accepted';
    
    // Add to friends lists
    const user1 = users.find(u => u._id === reqObj.from);
    const user2 = users.find(u => u._id === reqObj.to);
    
    if (user1) {
      if (!user1.friends) user1.friends = [];
      if (!user1.friends.includes(user2._id)) user1.friends.push(user2._id);
    }
    
    if (user2) {
      if (!user2.friends) user2.friends = [];
      if (!user2.friends.includes(user1._id)) user2.friends.push(user1._id);
    }
    
    res.json({ msg: "Friend request accepted" });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get user by ID (Must be below /pending and /sent)
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
