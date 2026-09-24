// server/src/controllers/authController.js
// Controllers for User registration and login

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT Token
const generateToken = (userId, name, email) => {
  const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_portfolio_builder';
  return jwt.sign(
    { id: userId, name, email },
    secret,
    { expiresIn: '30d' } // Token valid for 30 days
  );
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation: check if required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    // Check if user already exists with provided email
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user (password is automatically hashed in User schema pre-save hook)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password
    });

    // Generate JWT token
    const token = generateToken(user._id, user.name, user.email);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation: check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with stored hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.name, user.email);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser
};
