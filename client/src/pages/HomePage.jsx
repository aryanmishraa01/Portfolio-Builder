// client/src/pages/HomePage.jsx
// Landing home page introducing Portfolio Builder

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div className="home-container">
      <header className="hero-section">
        <span className="hero-tagline">🚀 Built for Freshers & Job Seekers</span>
        <h1 className="hero-title">
          Build Your Professional <span className="highlight-text">Developer Portfolio</span> in Minutes
        </h1>
        <p className="hero-subtitle">
          Portfolio Builder makes it fast and effortless to create, update, and showcase your projects,
          skills, and social links to potential employers.
        </p>

        <div className="hero-cta">
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Go to Dashboard ({user?.name})
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Login to Account
              </Link>
            </>
          )}
        </div>
      </header>

      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">✨</div>
          <h3>Live Preview Editor</h3>
          <p>See instant live updates of your portfolio details as you type into the form.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💻</div>
          <h3>Project Showcase</h3>
          <p>Highlight your projects with tech stack tags, GitHub links, and live demo URLs.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🌐</div>
          <h3>Shareable Public Link</h3>
          <p>Get a unique public portfolio link to paste on your resume and LinkedIn profile.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
