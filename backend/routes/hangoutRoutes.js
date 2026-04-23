const express = require('express');
const router = express.Router();
const { hangouts, users } = require('../db');
const auth = require('../middleware/auth');

// Create a hangout
router.post('/', auth, (req, res) => {
  try {
    const newHangout = {
      ...req.body,
      _id: Date.now().toString(),
      creator: req.user.id,
      participants: [req.user.id],
      createdAt: new Date().toISOString()
    };
    hangouts.push(newHangout);
    res.json(newHangout);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all hangouts
router.get('/', auth, (req, res) => {
  try {
    const populatedHangouts = hangouts.map(h => {
      const creatorUser = users.find(u => u._id === h.creator) || {};
      return {
        ...h,
        creator: { fullName: creatorUser.fullName, username: creatorUser.username, profilePicture: creatorUser.profilePicture },
        participants: h.participants.map(pid => {
          const p = users.find(u => u._id === pid) || {};
          return { _id: p._id, fullName: p.fullName, username: p.username };
        })
      };
    });
    res.json(populatedHangouts);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Join a hangout
router.post('/:id/join', auth, (req, res) => {
  try {
    const hangout = hangouts.find(h => h._id === req.params.id);
    if (!hangout) return res.status(404).json({ msg: 'Hangout not found' });

    if (hangout.participants.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already joined this hangout' });
    }

    if (hangout.participants.length >= hangout.seatLimit) {
      return res.status(400).json({ msg: 'Hangout is full' });
    }

    hangout.participants.push(req.user.id);
    res.json(hangout);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
