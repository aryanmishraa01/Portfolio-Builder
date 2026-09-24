// client/src/pages/NotFoundPage.jsx
// 404 Page Not Found component

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <h1>404</h1>
        <h2>Page Not Found 🔍</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">
          🏠 Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
