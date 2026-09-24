// client/src/components/PortfolioForm.jsx
// Form component to edit portfolio details with real-time state updates

import React from 'react';
import InputField from './InputField';

const PortfolioForm = ({ formData, onChange, onSubmit, saving, error, successMsg }) => {
  return (
    <form onSubmit={onSubmit} className="portfolio-form">
      <h2>Edit Portfolio Information</h2>
      <p className="form-subtitle">Update your profile info. Changes reflect in live preview.</p>

      {error && <div className="error-banner">{error}</div>}
      {successMsg && <div className="success-banner">{successMsg}</div>}

      <InputField
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={onChange}
        placeholder="e.g. Alex Johnson"
        required
      />

      <InputField
        label="Professional Title"
        name="title"
        value={formData.title}
        onChange={onChange}
        placeholder="e.g. Full Stack Web Developer / Fresher"
        required
      />

      <InputField
        label="Short Bio"
        name="bio"
        value={formData.bio}
        onChange={onChange}
        placeholder="Write a brief overview about yourself, your passion, and goals..."
        isTextArea
        rows={4}
      />

      <InputField
        label="Skills (Comma separated)"
        name="skills"
        value={formData.skills}
        onChange={onChange}
        placeholder="e.g. React, Node.js, Express, MongoDB, JavaScript, HTML, CSS"
      />

      <InputField
        label="GitHub Profile URL"
        name="github"
        type="text"
        value={formData.github}
        onChange={onChange}
        placeholder="https://github.com/yourusername"
      />

      <InputField
        label="LinkedIn Profile URL"
        name="linkedin"
        type="text"
        value={formData.linkedin}
        onChange={onChange}
        placeholder="https://linkedin.com/in/yourusername"
      />

      <InputField
        label="Profile Image URL"
        name="profileImage"
        type="text"
        value={formData.profileImage}
        onChange={onChange}
        placeholder="https://example.com/photo.jpg"
      />

      <button type="submit" className="btn btn-primary btn-block" disabled={saving}>
        {saving ? 'Saving Changes...' : '💾 Save Portfolio'}
      </button>
    </form>
  );
};

export default PortfolioForm;
