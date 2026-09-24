// client/src/components/PortfolioPreview.jsx
// Live preview component for instant rendering of portfolio data

import React from 'react';

const PortfolioPreview = ({ portfolio }) => {
  const {
    fullName = 'Your Name',
    title = 'Software Engineer / Fresher',
    bio = 'This is a short bio about yourself. Update the form on the left to see your live changes here!',
    skills = [],
    github = '',
    linkedin = '',
    profileImage = ''
  } = portfolio || {};

  // Process skills whether provided as string or array
  const skillList = Array.isArray(skills)
    ? skills
    : typeof skills === 'string'
    ? skills.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  // Default avatar SVG placeholder if no URL provided or image breaks
  const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (fullName || 'fresher');

  // Helper to ensure URLs start with https://
  const formatUrl = (url) => {
    if (!url) return '';
    if (/^https?:\/\//i.test(url) || url.startsWith('/')) return url;
    return `https://${url}`;
  };

  return (
    <div className="preview-card">
      <div className="preview-badge">Live Preview</div>

      <div className="preview-header">
        <img
          src={profileImage ? formatUrl(profileImage) : defaultAvatar}
          alt={fullName || 'Profile Avatar'}
          className="preview-avatar"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultAvatar;
          }}
        />

        <h3 className="preview-name">{fullName || 'Your Name'}</h3>
        <p className="preview-title">{title || 'Professional Title'}</p>
      </div>

      <div className="preview-section">
        <h4>About Me</h4>
        <p className="preview-bio">{bio || 'No bio added yet.'}</p>
      </div>

      <div className="preview-section">
        <h4>Skills</h4>
        {skillList.length > 0 ? (
          <div className="preview-skills">
            {skillList.map((skill, index) => (
              <span key={index} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="empty-text">No skills added yet (e.g. React, Node.js)</p>
        )}
      </div>

      <div className="preview-section">
        <h4>Connect</h4>
        <div className="preview-socials">
          {github ? (
            <a href={formatUrl(github)} target="_blank" rel="noopener noreferrer" className="social-btn github-btn">
              📁 GitHub
            </a>
          ) : (
            <span className="social-disabled">📁 GitHub Link</span>
          )}

          {linkedin ? (
            <a href={formatUrl(linkedin)} target="_blank" rel="noopener noreferrer" className="social-btn linkedin-btn">
              💼 LinkedIn
            </a>
          ) : (
            <span className="social-disabled">💼 LinkedIn Link</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;
