// server/src/routes/authRoutes.js
// Express routes for authentication

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Register endpoint: POST /api/auth/register
router.post('/register', registerUser);

// Login endpoint: POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;
