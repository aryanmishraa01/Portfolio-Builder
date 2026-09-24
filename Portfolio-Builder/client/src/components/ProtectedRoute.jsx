// client/src/components/ProtectedRoute.jsx
// Wraps protected routes and redirects to /login if user is not authenticated

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
