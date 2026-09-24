// client/src/components/ErrorMessage.jsx
// Reusable error message banner component

import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-banner">
      <span>⚠️ {message}</span>
    </div>
  );
};

export default ErrorMessage;
