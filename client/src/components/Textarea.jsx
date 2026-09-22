import React from 'react';

/**
 * Textarea component - Form textarea with optional label, error, and helper text
 */
const Textarea = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  rows = 4,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`block w-full rounded-lg border ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
        } px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 transition-colors resize-none`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default Textarea;
