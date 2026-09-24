// client/src/pages/RegisterPage.jsx
// User Registration Page

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import InputField from '../components/InputField';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Register to build and manage your developer portfolio</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />

          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="•••••••• (Min 6 characters)"
            required
          />

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
