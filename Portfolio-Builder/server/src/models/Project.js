// server/src/models/Project.js
// MongoDB schema for individual user Projects

const mongoose = require('mongoose');

// Project schema storing title, description, technologies used, links, and optional image
const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true
    },
    technologies: {
      type: [String], // Array of technologies used, e.g. ["React", "Express", "CSS"]
      default: []
    },
    githubUrl: {
      type: String,
      default: '',
      trim: true
    },
    liveUrl: {
      type: String,
      default: '',
      trim: true
    },
    imageUrl: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', projectSchema);
