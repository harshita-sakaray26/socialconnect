const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../db');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  try {
    const { fullName, username, email, password, city, interests } = req.body;
    let user = users.find(u => u.email === email);
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = {
      _id: Date.now().toString(),
      fullName,
      username,
      email,
      password: hashedPassword,
      city,
      interests: interests || [],
      profilePicture: 'https://via.placeholder.com/150'
    };
    users.push(user);

    const payload = { user: { id: user._id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user._id, username: user.username, fullName: user.fullName, email: user.email } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user._id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user._id, username: user.username, fullName: user.fullName, email: user.email } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get auth user
router.get('/me', auth, (req, res) => {
  try {
    const user = users.find(u => u._id === req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
