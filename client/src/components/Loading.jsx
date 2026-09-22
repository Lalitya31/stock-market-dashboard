import React from 'react';

/**
 * Loading component - Displays loading state with spinner
 */
const Loading = ({ 
  size = 'md', 
  message = 'Loading...',
  className = '',
  overlay = false 
}) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-5',
  };

  const spinnerClasses = `${sizes[size]} border-blue-600 border-t-transparent rounded-full animate-spin`;

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className={spinnerClasses}></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={spinnerClasses}></div>
      <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">{message}</p>
    </div>
  );
};

export default Loading;
