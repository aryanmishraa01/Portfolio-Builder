// client/src/context/AuthContext.jsx
// Context provider for user authentication state (login, register, logout)

import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (e) {
        console.error('Failed to parse stored user data:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  // Register function
  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token: newToken, user: newUser } = res.data;

    // Save token and user in state and localStorage
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));

    return res.data;
  };

  // Login function
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: newToken, user: newUser } = res.data;

    // Save token and user in state and localStorage
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));

    return res.data;
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
