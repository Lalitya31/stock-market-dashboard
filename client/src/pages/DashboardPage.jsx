import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Users, Activity } from 'lucide-react';
import PortfolioSummaryCard from '../components/PortfolioSummaryCard';
import StockSummaryCard from '../components/StockSummaryCard';
import ChartContainer from '../components/ChartContainer';
import Table from '../components/Table';
import { MOCK_PORTFOLIO, MOCK_STOCKS, MOCK_TRANSACTIONS, MOCK_PORTFOLIO_PERFORMANCE } from '../data/mockStocks';

/**
 * DashboardPage component - Main dashboard overview
 */
const DashboardPage = () => {
  const transactionColumns = [
    { key: 'type', label: 'Type', align: 'center' },
    { key: 'symbol', label: 'Symbol', align: 'center' },
    { key: 'quantity', label: 'Quantity', align: 'center' },
    { key: 'price', label: 'Price', align: 'center' },
    { key: 'total', label: 'Total', align: 'center' },
    { key: 'date', label: 'Date', align: 'center' },
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
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, Demo User!</h1>
        <p className="text-blue-100 max-w-xl">
          Your portfolio is ready. Start trading, track your investments, and analyze your performance.
        </p>
      </div>

      {/* Portfolio Summary */}
      <PortfolioSummaryCard 
        portfolioValue={MOCK_PORTFOLIO.portfolioValue}
        investedAmount={MOCK_PORTFOLIO.investedAmount}
        availableCash={MOCK_PORTFOLIO.availableCash}
        totalPnL={MOCK_PORTFOLIO.totalPnL}
        totalPnLPercent={MOCK_PORTFOLIO.totalPnLPercent}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's P&L</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$1,245.50</p>
              <p className="text-sm text-green-600 dark:text-green-400">+0.99%</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Available Cash</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$35,935.71</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stocks Held</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Watchlist</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Overview */}
        <div className="lg:col-span-2 space-y-6">
          <ChartContainer 
            title="Portfolio Performance"
            subtitle="Last 9 months performance"
            timeRanges={[
              { label: '1M', value: '1M' },
              { label: '3M', value: '3M' },
              { label: 'YTD', value: 'YTD' },
              { label: '1Y', value: '1Y' },
              { label: 'All', value: 'all' },
            ]}
            currentTimeRange="YTD"
          >
            <div className="h-[300px] flex items-end space-x-2">
              {MOCK_PORTFOLIO_PERFORMANCE.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 relative"
                    style={{ height: `${(item.value / 126000) * 100}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity">
                      {formatCurrency(item.value)}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.date}</span>
                </div>
              ))}
            </div>
          </ChartContainer>

          {/* Recent Transactions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
            <Table 
              columns={transactionColumns}
              data={tableData.slice(0, 5)}
            />
          </div>
        </div>

        {/* Watchlist & Top Movers */}
        <div className="space-y-6">
          {/* Watchlist */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Watchlist</h3>
            <div className="space-y-3">
              {MOCK_STOCKS.slice(0, 4).map((stock) => (
                <div 
                  key={stock.symbol} 
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl"
                >
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{stock.symbol}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-white">
                      ${stock.price.toFixed(2)}
                    </div>
                    <div className={`text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Movers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Movers</h3>
            <div className="space-y-3">
              {MOCK_STOCKS.slice(4, 6).map((stock) => (
                <div 
                  key={stock.symbol} 
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{stock.symbol}</div>
                  <div className="text-right">
                    <div className="text-sm text-gray-900 dark:text-white">
                      ${stock.price.toFixed(2)}
                    </div>
                    <div className={`text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
