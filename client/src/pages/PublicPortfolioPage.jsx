// client/src/pages/PublicPortfolioPage.jsx
// Public Portfolio Page view accessible via route /portfolio/:userId

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';
import Loading from '../components/Loading';

const PublicPortfolioPage = () => {
  const { userId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPublicPortfolio();
  }, [userId]);

  const fetchPublicPortfolio = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/portfolio/public/${userId}`);
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Portfolio not found or invalid URL');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Loading public portfolio..." />;

  if (error || !data) {
    return (
      <div className="not-found-container">
        <h2>Portfolio Not Found 😔</h2>
        <p>{error || 'The requested portfolio does not exist.'}</p>
      </div>
    );
  }

  const { user, portfolio, projects = [] } = data;
  const {
    fullName = user?.name || 'Developer',
    title = 'Software Developer',
    bio = '',
    skills = [],
    github = '',
    linkedin = '',
    profileImage = ''
  } = portfolio || {};

  const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (fullName || 'developer');

  return (
    <div className="public-portfolio-container">
      {/* Hero Header Banner */}
      <header className="public-hero">
        <img
          src={profileImage || defaultAvatar}
          alt={fullName}
          className="public-avatar"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultAvatar;
          }}
        />

        <h1 className="public-name">{fullName}</h1>
        <h2 className="public-title">{title}</h2>

        {bio && <p className="public-bio">{bio}</p>}

        <div className="public-socials">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              📁 GitHub Profile
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              💼 LinkedIn Profile
            </a>
          )}
        </div>
      </header>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="public-section">
          <h3 className="section-title">Skills & Technologies</h3>
          <div className="public-skills-grid">
            {skills.map((skill, idx) => (
              <span key={idx} className="public-skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects Showcase Section */}
      <section className="public-section">
        <h3 className="section-title">Featured Projects ({projects.length})</h3>

        {projects.length === 0 ? (
          <p className="no-projects-text">No projects showcase added yet.</p>
        ) : (
          <div className="public-projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} isDashboard={false} />
            ))}
          </div>
        )}
      </section>

      <footer className="public-footer">
        <p>Built with ⚡ <strong>Portfolio Builder</strong></p>
      </footer>
    </div>
  );
};

export default PublicPortfolioPage;
