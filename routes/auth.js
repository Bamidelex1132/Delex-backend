const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
const { name, email, password, confirmPassword } = req.body;

if (password !== confirmPassword)
return res.send('Error: Passwords do not match');

const userExists = await User.findOne({ email });
if (userExists)
return res.send('Error: Email already registered');

const hashedPassword = await bcrypt.hash(password, 10);
const user = new User({ name, email, password: hashedPassword });

await user.save();
res.redirect('/login.html');
});

// Login route
router.post('/login', async (req, res) => {
const { email, password } = req.body;

const user = await User.findOne({ email });
if (!user) return res.send('Error: User not found');

const match = await bcrypt.compare(password, user.password);
if (!match) return res.send('Error: Invalid password');

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

res.cookie('token', token, { httpOnly: true });
res.redirect('/dashboard.html');
});

module.exports = router;
