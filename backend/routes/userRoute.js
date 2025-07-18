const express = require('express');
const router = express.Router();
const User = require('../models/users');
const History = require('../models/history');

// Create user
router.post('/users', async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
});

// Get all users
router.get('/users', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

// Claim random points
router.post('/claim/:userId', async (req, res) => {
  const { userId } = req.params;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.totalPoints += points;
  await user.save();

  const history = new History({ userId, points });
  await history.save();

  const updatedUsers = await User.find().sort({ totalPoints: -1 });
  res.json({ pointsAwarded: points, leaderboard: updatedUsers });
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

// Get claim history
router.get('/history', async (req, res) => {
  const history = await History.find().populate('userId', 'name').sort({ timestamp: -1 });
  res.json(history);
});

module.exports = router;
 