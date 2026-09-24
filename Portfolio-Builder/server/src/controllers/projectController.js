// server/src/controllers/projectController.js
// Controllers for Project CRUD operations

const Project = require('../models/Project');

/**
 * @route   GET /api/projects
 * @desc    Get all projects for logged-in user
 * @access  Private
 */
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private
 */
const createProject = async (req, res, next) => {
  try {
    const { title, description, technologies, githubUrl, liveUrl, imageUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    // Format technologies string into array
    const techArray = Array.isArray(technologies)
      ? technologies
      : typeof technologies === 'string'
      ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const project = await Project.create({
      userId: req.user.id,
      title,
      description,
      technologies: techArray,
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      imageUrl: imageUrl || ''
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project
 * @access  Private
 */
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, technologies, githubUrl, liveUrl, imageUrl } = req.body;

    // Find project by ID
    let project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Ownership check: Ensure project belongs to current logged-in user
    if (project.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this project' });
    }

    // Format technologies
    const techArray = Array.isArray(technologies)
      ? technologies
      : typeof technologies === 'string'
      ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
      : project.technologies;

    project.title = title !== undefined ? title : project.title;
    project.description = description !== undefined ? description : project.description;
    project.technologies = techArray;
    project.githubUrl = githubUrl !== undefined ? githubUrl : project.githubUrl;
    project.liveUrl = liveUrl !== undefined ? liveUrl : project.liveUrl;
    project.imageUrl = imageUrl !== undefined ? imageUrl : project.imageUrl;

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Private
 */
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Ownership check: Ensure project belongs to current logged-in user
    if (project.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};
