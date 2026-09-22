import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import PortfolioSummaryCard from '../components/PortfolioSummaryCard';
import ChartContainer from '../components/ChartContainer';
import Table from '../components/Table';
import { MOCK_PORTFOLIO, MOCK_HOLDINGS, MOCK_PORTFOLIO_PERFORMANCE } from '../data/mockStocks';

/**
 * PortfolioPage component - Portfolio overview and holdings
 */
const PortfolioPage = () => {
  const holdingColumns = [
    { key: 'symbol', label: 'Symbol', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'quantity', label: 'Quantity', sortable: true },
    { key: 'currentPrice', label: 'Price', sortable: true },
    { key: 'value', label: 'Value', sortable: true },
    { key: 'pnl', label: 'P&L', sortable: true },
  ];

  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPnL = (value, row) => {
    const isPositive = row.pnl >= 0;
    return (
      <div className="flex flex-col">
        <span className={`${isPositive ? 'text-green-600' : 'text-red-600'} font-semibold`}>
          {isPositive ? '+' : ''}{formatCurrency(row.pnl)}
        </span>
        <span className={`${isPositive ? 'text-green-600' : 'text-red-600'} text-xs`}>
          {isPositive ? '+' : ''}{row.pnlPercent.toFixed(2)}%
        </span>
      </div>
    );
  };

  const tableData = MOCK_HOLDINGS.map((holding) => ({
    ...holding,
    currentPrice: formatCurrency(holding.currentPrice),
    value: formatCurrency(holding.value),
    pnl: formatPnL(holding.pnl, holding),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track your investments and performance</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Gain</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
                ${MOCK_PORTFOLIO.totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Invested</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                ${MOCK_PORTFOLIO.investedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <TrendingDown className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Return %</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                {MOCK_PORTFOLIO.totalPnLPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <ChartContainer 
        title="Portfolio Performance"
        subtitle="Performance over time"
        timeRanges={[
          { label: '1M', value: '1M' },
          { label: '3M', value: '3M' },
          { label: '6M', value: '6M' },
          { label: 'YTD', value: 'YTD' },
          { label: '1Y', value: '1Y' },
        ]}
        currentTimeRange="YTD"
      >
        <div className="h-[300px] flex items-end space-x-2">
          {MOCK_PORTFOLIO_PERFORMANCE.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div 
                className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300"
                style={{ height: `${(item.value / 126000) * 100}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity">
                  ${item.value.toLocaleString()}
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.date}</span>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* Holdings Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Holdings</h3>
        <Table 
          columns={holdingColumns}
          data={tableData}
        />
      </div>
    </div>
  );
};

export default PortfolioPage;
