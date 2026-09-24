// client/src/components/ProjectCard.jsx
// Displays a project card with title, description, tech stack, links, and optional edit/delete controls

import React from 'react';

const ProjectCard = ({ project, onEdit, onDelete, isDashboard = false }) => {
  const { title, description, technologies = [], githubUrl, liveUrl, imageUrl } = project;

  // Process technologies list whether array or comma string
  const techList = Array.isArray(technologies)
    ? technologies
    : typeof technologies === 'string'
    ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  // Helper to ensure URLs start with https://
  const formatUrl = (url) => {
    if (!url) return '';
    if (/^https?:\/\//i.test(url) || url.startsWith('/')) return url;
    return `https://${url}`;
  };

  return (
    <div className="project-card">
      {imageUrl && (
        <div className="project-img-wrapper">
          <img src={formatUrl(imageUrl)} alt={title} className="project-img" />
        </div>
      )}

      <div className="project-body">
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>

        {techList.length > 0 && (
          <div className="project-tech-list">
            {techList.map((tech, index) => (
              <span key={index} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="project-links">
          {githubUrl && (
            <a href={formatUrl(githubUrl)} target="_blank" rel="noopener noreferrer" className="link-btn">
              🔗 GitHub
            </a>
          )}
          {liveUrl && (
            <a href={formatUrl(liveUrl)} target="_blank" rel="noopener noreferrer" className="link-btn live-link">
              🚀 Live Demo
            </a>
          )}
        </div>

        {isDashboard && (
          <div className="project-actions">
            <button onClick={() => onEdit(project)} className="btn btn-secondary btn-sm">
              ✏️ Edit
            </button>
            <button onClick={() => onDelete(project._id)} className="btn btn-danger btn-sm">
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
