// client/src/services/api.js
// Axios configuration for backend API requests

import axios from 'axios';

// Create an Axios instance with base backend API URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// Request interceptor: automatically add Bearer token to Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
