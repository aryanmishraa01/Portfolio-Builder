// client/src/components/Loading.jsx
// Simple loading spinner component

import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loading;
