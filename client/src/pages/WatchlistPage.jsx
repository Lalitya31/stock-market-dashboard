import React from 'react';
import { Star, Trash2 } from 'lucide-react';
import Card from '../components/Card';
import Table from '../components/Table';
import { MOCK_STOCKS, MOCK_WATCHLIST } from '../data/mockStocks';

/**
 * WatchlistPage component - Watched stocks
 */
const WatchlistPage = () => {
  const columns = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'change', label: 'Change' },
    { key: 'actions', label: 'Actions' },
  ];

  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  const formatChange = (change, percent) => {
    const isPositive = change >= 0;
    return (
      <span className={`font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {isPositive ? '+' : ''}{percent.toFixed(2)}%
      </span>
    );
  };

  const tableData = MOCK_WATCHLIST.map((stock) => ({
    ...stock,
    price: formatCurrency(stock.price),
    change: formatChange(stock.change, stock.changePercent || (stock.change / (stock.price - stock.change)) * 100),
    actions: (
      <div className="flex space-x-2">
        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          Trade
        </button>
        <button className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <Star className="w-4 h-4" />
        </button>
        <button className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ),
  }));

  // Also show some additional stocks to add to watchlist
  const additionalStocks = MOCK_STOCKS.filter(
    (stock) => !MOCK_WATCHLIST.find((w) => w.symbol === stock.symbol)
  );

  const additionalColumns = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'change', label: 'Change' },
    { key: 'actions', label: 'Actions' },
  ];

  const additionalTableData = additionalStocks.map((stock) => ({
    ...stock,
    price: formatCurrency(stock.price),
    change: formatChange(stock.change, stock.changePercent),
    actions: (
      <div className="flex space-x-2">
        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          Trade
        </button>
        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          <Star className="w-4 h-4" />
        </button>
      </div>
    ),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Watchlist</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track your favorite stocks</p>
      </div>

      {/* Watchlist Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Stocks in Watchlist</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{MOCK_WATCHLIST.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Watchlist Value</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            ${MOCK_WATCHLIST.reduce((sum, s) => sum + s.price, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>
      </div>

      {/* Your Watchlist */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Watchlist</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {MOCK_WATCHLIST.length} stocks
          </span>
        </div>
        <Table 
          columns={columns}
          data={tableData}
        />
      </Card>

      {/* Market Watch */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Watch</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {additionalStocks.length} additional stocks
          </span>
        </div>
        <Table 
          columns={additionalColumns}
          data={additionalTableData}
        />
      </Card>
    </div>
  );
};

export default WatchlistPage;
