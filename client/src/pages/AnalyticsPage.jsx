import React from 'react';
import { PieChart, BarChart, TrendingUp, TrendingDown } from 'lucide-react';
import ChartContainer from '../components/ChartContainer';
import Card from '../components/Card';
import { MOCK_PORTFOLIO_PERFORMANCE, MOCK_ALLOCATION, MOCK_PORTFOLIO } from '../data/mockStocks';

/**
 * AnalyticsPage component - Portfolio analytics and statistics
 */
const AnalyticsPage = () => {
  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercent = (value) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Portfolio analytics and performance statistics</p>
      </div>

      {/* Performance Chart */}
      <ChartContainer 
        title="Portfolio Performance"
        subtitle="Monthly performance over time"
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
                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-t-md hover:from-blue-700 hover:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-600 transition-all duration-300"
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

      {/* Allocation Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio Allocation</h3>
          <div className="flex space-x-2 text-sm">
            <button className="text-blue-600 font-medium">By Sector</button>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400">By Asset</button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {MOCK_ALLOCATION.reduce((acc, segment, index, arr) => {
                const cumulativeValue = arr.slice(0, index + 1).reduce((sum, s) => sum + s.value, 0);
                const startAngle = index === 0 ? 0 : acc[index - 1].endAngle;
                const endAngle = (cumulativeValue / 100) * 360;
                
                const x1 = 50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = 50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = 50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180);
                const y2 = 50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180);
                
                const largeArcFlag = segment.value > 50 ? 1 : 0;
                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                
                acc.push({ pathData, color: segment.color, value: segment.value });
                return acc;
              }, [])}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${MOCK_PORTFOLIO.portfolioValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 w-full md:w-auto">
            {MOCK_ALLOCATION.map((segment, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3" 
                  style={{ backgroundColor: segment.color }}
                />
                <div className="flex-1 flex justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{segment.name}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{segment.value}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Performance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg mr-4">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Annual Return</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">40.13%</p>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="text-green-600 dark:text-green-400">+12.5%</span> vs benchmark
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4">
              <PieChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sharpe Ratio</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1.85</p>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Risk-adjusted return metric
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg mr-4">
              <BarChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Volatility</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">18.2%</p>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Standard deviation of returns
          </div>
        </Card>
      </div>

      {/* Recent Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/30">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Period</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Return</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Benchmark</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">1 Month</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">+2.34%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">+1.89%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Low</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">3 Months</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">+5.67%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">+4.23%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Medium</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">YTD</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">+12.34%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">+8.45%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Medium</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">1 Year</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">+40.13%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">+25.67%</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Medium</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
