// client/src/App.jsx
// Main Application Component with Router configuration

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Page Imports
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EditPortfolioPage from './pages/EditPortfolioPage';
import AddEditProjectPage from './pages/AddEditProjectPage';
import PublicPortfolioPage from './pages/PublicPortfolioPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Public Portfolio Route */}
            <Route path="/portfolio/:userId" element={<PublicPortfolioPage />} />

            {/* Protected Routes (Requires JWT Authentication) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-portfolio"
              element={
                <ProtectedRoute>
                  <EditPortfolioPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/add"
              element={
                <ProtectedRoute>
                  <AddEditProjectPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/edit/:id"
              element={
                <ProtectedRoute>
                  <AddEditProjectPage />
                </ProtectedRoute>
              }
            />

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
