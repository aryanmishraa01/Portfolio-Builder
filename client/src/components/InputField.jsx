// client/src/components/InputField.jsx
// Reusable form field component supporting input text, email, password, and textarea

import React from 'react';

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  isTextArea = false,
  rows = 4,
  error = ''
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}

      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`form-input ${error ? 'input-error' : ''}`}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`form-input ${error ? 'input-error' : ''}`}
        />
      )}

      {error && <span className="field-error-msg">{error}</span>}
    </div>
  );
};

export default InputField;
