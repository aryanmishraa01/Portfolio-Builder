// server/src/controllers/portfolioController.js
// Controllers for managing User Portfolio details

const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
const Project = require('../models/Project');
const User = require('../models/User');

/**
 * @route   GET /api/portfolio
 * @desc    Get current user's portfolio
 * @access  Private
 */
const getMyPortfolio = async (req, res, next) => {
  try {
    let portfolio = await Portfolio.findOne({ userId: req.user.id });

    // If portfolio doesn't exist yet, return an empty portfolio structure or default info
    if (!portfolio) {
      return res.status(200).json({
        fullName: req.user.name || '',
        title: '',
        bio: '',
        skills: [],
        github: '',
        linkedin: '',
        profileImage: ''
      });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/portfolio
 * @desc    Create portfolio for logged in user
 * @access  Private
 */
const createPortfolio = async (req, res, next) => {
  try {
    const { fullName, title, bio, skills, github, linkedin, profileImage } = req.body;

    // Check if portfolio already exists for user
    let portfolio = await Portfolio.findOne({ userId: req.user.id });
    if (portfolio) {
      return res.status(400).json({ message: 'Portfolio already exists. Use PUT to update.' });
    }

    // Convert skills to array if passed as string (comma-separated)
    const skillsArray = Array.isArray(skills)
      ? skills
      : typeof skills === 'string'
      ? skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    portfolio = await Portfolio.create({
      userId: req.user.id,
      fullName: fullName || req.user.name,
      title: title || '',
      bio: bio || '',
      skills: skillsArray,
      github: github || '',
      linkedin: linkedin || '',
      profileImage: profileImage || ''
    });

    res.status(201).json(portfolio);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/portfolio
 * @desc    Update current user's portfolio (or create if not existing)
 * @access  Private
 */
const updatePortfolio = async (req, res, next) => {
  try {
    const { fullName, title, bio, skills, github, linkedin, profileImage } = req.body;

    // Process skills into array
    const skillsArray = Array.isArray(skills)
      ? skills
      : typeof skills === 'string'
      ? skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    let portfolio = await Portfolio.findOne({ userId: req.user.id });

    if (portfolio) {
      // Update existing portfolio
      portfolio.fullName = fullName !== undefined ? fullName : portfolio.fullName;
      portfolio.title = title !== undefined ? title : portfolio.title;
      portfolio.bio = bio !== undefined ? bio : portfolio.bio;
      portfolio.skills = skillsArray;
      portfolio.github = github !== undefined ? github : portfolio.github;
      portfolio.linkedin = linkedin !== undefined ? linkedin : portfolio.linkedin;
      portfolio.profileImage = profileImage !== undefined ? profileImage : portfolio.profileImage;

      await portfolio.save();
    } else {
      // Create portfolio if it doesn't exist yet
      portfolio = await Portfolio.create({
        userId: req.user.id,
        fullName: fullName || req.user.name,
        title: title || '',
        bio: bio || '',
        skills: skillsArray,
        github: github || '',
        linkedin: linkedin || '',
        profileImage: profileImage || ''
      });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/portfolio/public/:userId
 * @desc    Get public portfolio and projects by userId
 * @access  Public
 */
const getPublicPortfolio = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: 'Invalid portfolio link ID format.' });
    }

    // Fetch user details
    const user = await User.findById(userId).select('-password');
    let portfolio = await Portfolio.findOne({ userId });

    // If neither user nor portfolio is found in database
    if (!user && !portfolio) {
      return res.status(404).json({
        message: 'User session expired or database restarted. Please Logout and Login again to refresh your session.'
      });
    }

    if (!portfolio) {
      portfolio = {
        fullName: user?.name || 'Developer',
        title: 'Developer',
        bio: 'Welcome to my portfolio!',
        skills: [],
        github: '',
        linkedin: '',
        profileImage: ''
      };
    }

    const projects = await Project.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      user: {
        id: user?._id || userId,
        name: user?.name || portfolio.fullName || 'Developer',
        email: user?.email || ''
      },
      portfolio,
      projects
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyPortfolio,
  createPortfolio,
  updatePortfolio,
  getPublicPortfolio
};
