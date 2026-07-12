const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const Admin = require('../models/Admin');

// Rate Limiter: Maximum 5 login attempts per 5 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: { message: 'Too many login attempts from this IP, please try again after 5 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Admin Login Route
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide both username and password' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const payload = {
      adminId: admin._id,
      role: 'superadmin'
    };

    if (!process.env.JWT_SECRET) {
      console.error('FATAL ERROR: JWT_SECRET is not defined.');
      return res.status(500).json({ message: 'Internal server error' });
    }

    const token = jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      username: admin.username
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error during login' });
  }
});

module.exports = router;
