import React from 'react';

/**
 * InputGroup component - Form input with optional label, error, and description
 */
const InputGroup = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon: Icon,
  rightElement,
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
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          id={id}
          type={type}
          className={`block w-full rounded-lg border ${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
          } ${
            Icon ? 'pl-10' : 'pl-3'
          } ${
            rightElement ? 'pr-10' : 'pr-3'
          } py-2 text-sm shadow-sm focus:outline-none focus:ring-1 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 transition-colors`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default InputGroup;
