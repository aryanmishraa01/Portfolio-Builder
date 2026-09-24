// client/src/pages/DashboardPage.jsx
// Protected Dashboard page showing portfolio status and project list

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch user portfolio and project list in parallel
      const [portfolioRes, projectsRes] = await Promise.all([
        api.get('/portfolio'),
        api.get('/projects')
      ]);

      setPortfolio(portfolioRes.data);
      setProjects(projectsRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await api.delete(`/projects/${projectId}`);
      // Remove deleted project from state
      setProjects(projects.filter((p) => p._id !== projectId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete project');
    }
  };

  const handleEditProject = (project) => {
    navigate(`/projects/edit/${project._id}`, { state: { project } });
  };

  const publicUrl = `${window.location.origin}/portfolio/${user?.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <Loading message="Loading dashboard..." />;

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.name}! 👋</h1>
          <p>Manage your developer profile and projects from your dashboard.</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/edit-portfolio" className="btn btn-primary">
            ✏️ Edit Portfolio
          </Link>
          <Link to="/projects/add" className="btn btn-secondary">
            ➕ Add Project
          </Link>
        </div>
      </div>

      <ErrorMessage message={error} />

      {/* Public Share URL Box */}
      <div className="public-link-card">
        <div className="link-info">
          <h3>🌐 Your Public Portfolio Link</h3>
          <p className="public-url-text">{publicUrl}</p>
        </div>
        <div className="link-btn-group">
          <button onClick={handleCopyLink} className="btn btn-outline btn-sm">
            {copied ? '✅ Copied!' : '📋 Copy Link'}
          </button>

          <Link to={`/portfolio/${user?.id}`} target="_blank" className="btn btn-primary btn-sm">
            ↗ Open Portfolio
          </Link>
        </div>
      </div>

      {/* Profile Overview Section */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Portfolio Details</h2>
          <Link to="/edit-portfolio" className="link-btn">
            Edit
          </Link>
        </div>

        <div className="info-card">
          <div className="info-grid">
            <div>
              <strong>Full Name:</strong> {portfolio?.fullName || user?.name || 'Not set'}
            </div>
            <div>
              <strong>Title:</strong> {portfolio?.title || 'Not set'}
            </div>
            <div>
              <strong>GitHub:</strong>{' '}
              {portfolio?.github ? (
                <a href={portfolio.github} target="_blank" rel="noreferrer">
                  {portfolio.github}
                </a>
              ) : (
                'Not set'
              )}
            </div>
            <div>
              <strong>LinkedIn:</strong>{' '}
              {portfolio?.linkedin ? (
                <a href={portfolio.linkedin} target="_blank" rel="noreferrer">
                  {portfolio.linkedin}
                </a>
              ) : (
                'Not set'
              )}
            </div>
          </div>

          <div className="bio-summary">
            <strong>Bio:</strong> {portfolio?.bio || 'No bio added yet.'}
          </div>

          {portfolio?.skills && portfolio.skills.length > 0 && (
            <div className="skills-summary">
              <strong>Skills:</strong>
              <div className="tag-container">
                {portfolio.skills.map((s, index) => (
                  <span key={index} className="skill-badge">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Projects List Section */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>My Projects ({projects.length})</h2>
          <Link to="/projects/add" className="btn btn-primary btn-sm">
            ➕ Add New Project
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <p>You haven't added any projects yet.</p>
            <Link to="/projects/add" className="btn btn-outline">
              Add Your First Project
            </Link>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                isDashboard={true}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
