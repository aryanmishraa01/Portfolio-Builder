// client/src/components/Navbar.jsx
// Main application header and navigation bar

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ⚡ Portfolio Builder
        </Link>

        <ul className="nav-links">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/edit-portfolio" className="nav-link">
                  Edit Portfolio
                </Link>
              </li>
              <li>
                <Link to="/projects/add" className="nav-link">
                  Add Project
                </Link>
              </li>
              <li>
                <Link to={`/portfolio/${user?.id}`} className="nav-link nav-public-btn" target="_blank" rel="noopener noreferrer">
                  Public Link ↗
                </Link>
              </li>
              <li className="user-welcome">
                Hi, <span>{user?.name}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
