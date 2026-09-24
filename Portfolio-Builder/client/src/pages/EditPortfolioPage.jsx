// client/src/pages/EditPortfolioPage.jsx
// Portfolio Editor Page featuring side-by-side Form and Live Preview

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import PortfolioForm from '../components/PortfolioForm';
import PortfolioPreview from '../components/PortfolioPreview';
import Loading from '../components/Loading';

const EditPortfolioPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Local state for portfolio form fields
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    title: '',
    bio: '',
    skills: '',
    github: '',
    linkedin: '',
    profileImage: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch current user portfolio details on mount
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await api.get('/portfolio');
      if (res.data) {
        setFormData({
          fullName: res.data.fullName || user?.name || '',
          title: res.data.title || '',
          bio: res.data.bio || '',
          skills: Array.isArray(res.data.skills) ? res.data.skills.join(', ') : res.data.skills || '',
          github: res.data.github || '',
          linkedin: res.data.linkedin || '',
          profileImage: res.data.profileImage || ''
        });
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  // Instant state handler: Updates live preview immediately as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Save portfolio handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      setSaving(true);
      await api.put('/portfolio', formData);
      setSuccessMsg('🎉 Portfolio saved successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } catch (err) {
      console.error('Save portfolio error:', err);
      setError(
        err.response?.data?.message ||
          'Failed to save portfolio. Make sure the backend server is running on http://localhost:5000'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading message="Loading portfolio editor..." />;

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h1>Portfolio Live Editor</h1>
        <button onClick={() => navigate('/dashboard')} className="btn btn-outline btn-sm">
          ⬅ Back to Dashboard
        </button>
      </div>

      {/* Side-by-side (or stacked on mobile) grid layout */}
      <div className="editor-grid">
        <div className="editor-form-col">
          <PortfolioForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            saving={saving}
            error={error}
            successMsg={successMsg}
          />
        </div>

        <div className="editor-preview-col">
          <PortfolioPreview portfolio={formData} />
        </div>
      </div>
    </div>
  );
};

export default EditPortfolioPage;
