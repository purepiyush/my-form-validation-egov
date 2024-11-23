import React, { useState } from 'react';
import './Form.css';

const Form = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (field, value) => {
    const { validation } = field;
    let error = '';

    if (validation?.conditional) {
      const isConditionMet = validation.conditional(formData);
      if (isConditionMet && !value) {
        error = `${field.label} is required.`;
      } else if (!isConditionMet) {
        return ''; 
      }
    }

    const safeValue = value || '';
    if (validation?.required && !safeValue) {
      error = `${field.label} is required.`;
    } else if (validation?.minLength && safeValue.length < validation.minLength) {
      error = `${field.label} must be at least ${validation.minLength} characters.`;
    } else if (validation?.maxLength && safeValue.length > validation.maxLength) {
      error = `${field.label} must be less than ${validation.maxLength} characters.`;
    } else if (validation?.pattern && !validation.pattern.test(safeValue)) {
      error = `Invalid ${field.label}.`;
    } else if (validation?.min !== undefined && safeValue < validation.min) {
      error = `${field.label} must be at least ${validation.min}.`;
    } else if (validation?.max !== undefined && safeValue > validation.max) {
      error = `${field.label} must be less than ${validation.max}.`;
    }

    return error;
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field.name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field.name]: '',
    }));
  };

  const handleBlur = (field) => {
    const error = validateField(field, formData[field.name] || '');
    setTouched((prevTouched) => ({ ...prevTouched, [field.name]: true }));
    setErrors((prevErrors) => ({ ...prevErrors, [field.name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    config.forEach((field) => {
      const error = validateField(field, formData[field.name] || '');
      if (error) {
        newErrors[field.name] = error;
      }
    });

    const updatedTouched = {};
    config.forEach((field) => {
      updatedTouched[field.name] = true;
    });
    setTouched(updatedTouched);

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      setFormData({});
      setTouched({});
      setErrors({});
    }
  };

  const renderField = (field) => {
    if (field.validation?.conditional) {
      const shouldRender = field.validation.conditional(formData);
      if (!shouldRender) return null;
    }

    return (
      <div key={field.name} className="form-group">
        <label htmlFor={field.name} className="form-label">
          {field.label}
        </label>
        {['text', 'email', 'password', 'number', 'tel', 'date'].includes(field.type) && (
          <input
            id={field.name}
            className="form-input"
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
          />
        )}
        {field.type === 'select' && (
          <select
            id={field.name}
            className="form-select"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        {field.type === 'checkbox' && (
          <input
            id={field.name}
            className="form-checkbox"
            type="checkbox"
            name={field.name}
            checked={formData[field.name] || false}
            onChange={(e) => handleInputChange(field, e.target.checked)}
            onBlur={() => handleBlur(field)}
          />
        )}
        {field.type === 'radio' &&
          field.options.map((option) => (
            <label key={option.value} className="form-radio-label">
              <input
                className="form-radio"
                type="radio"
                name={field.name}
                value={option.value}
                checked={formData[field.name] === option.value}
                onChange={(e) => handleInputChange(field, e.target.value)}
                onBlur={() => handleBlur(field)}
              />
              {option.label}
            </label>
          ))}
        {field.type === 'textarea' && (
          <textarea
            id={field.name}
            className="form-textarea"
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
          ></textarea>
        )}
        {touched[field.name] && errors[field.name] && (
          <span className="form-error">{errors[field.name]}</span>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {config.map((field) => renderField(field))}
      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
};

export default Form;
