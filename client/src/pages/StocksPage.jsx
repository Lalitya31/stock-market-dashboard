import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../components/Table';
import { MOCK_STOCKS } from '../data/mockStocks';
import Card from '../components/Card';

/**
 * StocksPage component - Browse all stocks
 */
const StocksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('symbol');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredStocks = MOCK_STOCKS.filter((stock) => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return b[sortField] > a[sortField] ? 1 : -1;
  });

  const columns = [
    { key: 'symbol', label: 'Symbol', sortable: true },
    { key: 'name', label: 'Company', sortable: true },
    { key: 'price', label: 'Price', sortable: true },
    { key: 'change', label: 'Change', sortable: true },
    { key: 'volume', label: 'Volume', sortable: true },
    { key: 'marketCap', label: 'Market Cap', sortable: true },
  ];

  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatNumber = (value) => {
    return value.toLocaleString();
  };

  const tableData = filteredStocks.map((stock) => ({
    ...stock,
    price: formatCurrency(stock.price),
    change: (
      <span className={`font-medium ${stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
      </span>
    ),
    volume: formatNumber(stock.volume),
  }));

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stocks</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Browse and search available stocks</p>
        </div>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search stocks..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Stocks</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{MOCK_STOCKS.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Market High</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">$998.67</p>
          <p className="text-xs text-green-500 dark:text-green-400 mt-1">NVDA</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Market Low</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">$102.15</p>
          <p className="text-xs text-red-500 dark:text-red-400 mt-1">TSLA</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Average Volume</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">47.1M</p>
        </Card>
      </div>

      {/* Stocks Table */}
      <Table 
        columns={columns}
        data={tableData}
        onRowClick={(row) => console.log('Clicked:', row)}
      />
    </div>
  );
};

export default StocksPage;
