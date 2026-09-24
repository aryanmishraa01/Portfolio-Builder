// server/src/models/Portfolio.js
// MongoDB schema for user Portfolio details

const mongoose = require('mongoose');

// Portfolio schema storing personal details, bio, skills, and links
const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true // One portfolio per user
    },
    fullName: {
      type: String,
      default: '',
      trim: true
    },
    title: {
      type: String,
      default: '',
      trim: true
    },
    bio: {
      type: String,
      default: '',
      trim: true
    },
    skills: {
      type: [String], // Array of skill strings, e.g. ["React", "Node.js", "MongoDB"]
      default: []
    },
    github: {
      type: String,
      default: '',
      trim: true
    },
    linkedin: {
      type: String,
      default: '',
      trim: true
    },
    profileImage: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
