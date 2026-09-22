import React from 'react';

/**
 * StockSummaryCard component - Displays stock summary information
 */
const StockSummaryCard = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  volume,
  marketCap,
  className = '',
}) => {
  const isPositive = change >= 0;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{symbol}</h3>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{name}</span>
            </div>
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
            isPositive 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            <span>{isPositive ? '+' : ''}{changePercent.toFixed(2)}%</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Current Price</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Change</span>
            <span className={`text-lg font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block">Volume</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {volume.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block">Market Cap</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {marketCap}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockSummaryCard;
