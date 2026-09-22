import React from 'react';
import Table from '../components/Table';
import { MOCK_TRANSACTIONS } from '../data/mockStocks';

/**
 * TransactionsPage component - Transaction history
 */
const TransactionsPage = () => {
  const columns = [
    { key: 'type', label: 'Type' },
    { key: 'symbol', label: 'Symbol' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'price', label: 'Price' },
    { key: 'total', label: 'Total' },
    { key: 'date', label: 'Date/Time' },
  ];

  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatType = (value) => {
    const isBuy = value === 'BUY';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isBuy 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      }`}>
        {value}
      </span>
    );
  };

  const tableData = MOCK_TRANSACTIONS.map((txn) => ({
    ...txn,
    type: formatType(txn.type),
    price: formatCurrency(txn.price),
    total: formatCurrency(txn.total),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Your trading history and execution details</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {MOCK_TRANSACTIONS.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Volume</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {MOCK_TRANSACTIONS.reduce((sum, t) => sum + t.quantity, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            ${MOCK_TRANSACTIONS.reduce((sum, t) => sum + t.total, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <Table 
        columns={columns}
        data={tableData}
      />

      {/* Transaction Types Legend */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transaction Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Buy Order</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Sell Order</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
