import React from 'react';

/**
 * CardHeader component - Standard header for cards
 */
const CardHeader = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
      {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
};

export default CardHeader;
