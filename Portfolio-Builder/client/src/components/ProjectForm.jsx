// client/src/components/ProjectForm.jsx
// Form component for adding or editing project details

import React from 'react';
import InputField from './InputField';

const ProjectForm = ({ formData, onChange, onSubmit, saving, error, isEdit = false }) => {
  return (
    <form onSubmit={onSubmit} className="project-form">
      <h2>{isEdit ? 'Edit Project' : 'Add New Project'}</h2>
      <p className="form-subtitle">Fill in your project details to display on your portfolio.</p>

      {error && <div className="error-banner">{error}</div>}

      <InputField
        label="Project Title"
        name="title"
        value={formData.title}
        onChange={onChange}
        placeholder="e.g. E-Commerce Web App"
        required
      />

      <InputField
        label="Description"
        name="description"
        value={formData.description}
        onChange={onChange}
        placeholder="Describe what the project does, problems solved, and features..."
        isTextArea
        rows={4}
        required
      />

      <InputField
        label="Technologies Used (Comma separated)"
        name="technologies"
        value={formData.technologies}
        onChange={onChange}
        placeholder="e.g. React, Node.js, Express, MongoDB"
      />

      <InputField
        label="GitHub Repository URL"
        name="githubUrl"
        type="text"
        value={formData.githubUrl}
        onChange={onChange}
        placeholder="https://github.com/username/project-repo"
      />

      <InputField
        label="Live Demo URL"
        name="liveUrl"
        type="text"
        value={formData.liveUrl}
        onChange={onChange}
        placeholder="https://my-cool-project.vercel.app"
      />

      <InputField
        label="Project Image URL (Optional)"
        name="imageUrl"
        type="text"
        value={formData.imageUrl}
        onChange={onChange}
        placeholder="https://example.com/project-screenshot.jpg"
      />

      <button type="submit" className="btn btn-primary btn-block" disabled={saving}>
        {saving ? 'Saving Project...' : isEdit ? '💾 Update Project' : '➕ Add Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
