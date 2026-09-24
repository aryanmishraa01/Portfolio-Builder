// client/src/pages/AddEditProjectPage.jsx
// Page to Add a new project or Edit an existing project

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../services/api';
import ProjectForm from '../components/ProjectForm';
import Loading from '../components/Loading';

const AddEditProjectPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: ''
  });

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      // If passed state from navigation, use it; otherwise fetch from API
      if (location.state?.project) {
        const p = location.state.project;
        setFormData({
          title: p.title || '',
          description: p.description || '',
          technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technologies || '',
          githubUrl: p.githubUrl || '',
          liveUrl: p.liveUrl || '',
          imageUrl: p.imageUrl || ''
        });
        setLoading(false);
      } else {
        fetchProject();
      }
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects');
      const found = res.data.find((p) => p._id === id);
      if (found) {
        setFormData({
          title: found.title || '',
          description: found.description || '',
          technologies: Array.isArray(found.technologies) ? found.technologies.join(', ') : found.technologies || '',
          githubUrl: found.githubUrl || '',
          liveUrl: found.liveUrl || '',
          imageUrl: found.imageUrl || ''
        });
      } else {
        setError('Project not found');
      }
    } catch (err) {
      setError('Failed to fetch project details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description) {
      setError('Project title and description are required');
      return;
    }

    try {
      setSaving(true);
      if (isEdit) {
        await api.put(`/projects/${id}`, formData);
      } else {
        await api.post('/projects', formData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading message="Loading project data..." />;

  return (
    <div className="project-page-container">
      <div className="project-page-card">
        <button onClick={() => navigate('/dashboard')} className="btn btn-outline btn-sm back-btn">
          ⬅ Back to Dashboard
        </button>

        <ProjectForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          saving={saving}
          error={error}
          isEdit={isEdit}
        />
      </div>
    </div>
  );
};

export default AddEditProjectPage;
