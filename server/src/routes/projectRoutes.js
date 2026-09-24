// server/src/routes/projectRoutes.js
// Express routes for managing projects

const express = require('express');
const router = express.Router();
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

// All project management routes are protected with JWT auth middleware
router.get('/', protect, getProjects);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
