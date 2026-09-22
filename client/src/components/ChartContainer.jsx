import React from 'react';

/**
 * ChartContainer component - Container for charts with optional time range selector
 */
const ChartContainer = ({
  title,
  subtitle,
  children,
  timeRanges = [],
  currentTimeRange,
  onTimeRangeChange,
  className = '',
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
          </div>
          {timeRanges.length > 0 && (
            <div className="flex space-x-1 mt-3 sm:mt-0">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => onTimeRangeChange && onTimeRangeChange(range.value)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    currentTimeRange === range.value
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative min-h-[300px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;
