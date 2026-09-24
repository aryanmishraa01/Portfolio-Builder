// server/src/routes/portfolioRoutes.js
// Express routes for portfolio operations

const express = require('express');
const router = express.Router();
const {
  getMyPortfolio,
  createPortfolio,
  updatePortfolio,
  getPublicPortfolio
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/auth');

// Public route to fetch any user's portfolio by userId
router.get('/public/:userId', getPublicPortfolio);

// Protected routes for current logged-in user
router.get('/', protect, getMyPortfolio);
router.post('/', protect, createPortfolio);
router.put('/', protect, updatePortfolio);

module.exports = router;
