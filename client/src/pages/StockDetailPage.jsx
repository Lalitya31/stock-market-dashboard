import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Activity, Volume } from 'lucide-react';
import Card from '../components/Card';
import ChartContainer from '../components/ChartContainer';
import InputGroup from '../components/InputGroup';
import Button from '../components/Button';
import { MOCK_STOCKS, STOCK_PRICE_HISTORY } from '../data/mockStocks';

/**
 * StockDetailPage component - Stock details with chart and trading controls
 */
const StockDetailPage = () => {
  const { symbol } = useParams();
  const stock = MOCK_STOCKS.find((s) => s.symbol === symbol);
  const [timeRange, setTimeRange] = useState('1D');
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState('buy');

  if (!stock) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Stock not found</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">The stock you're looking for doesn't exist.</p>
        <Link to="/stocks" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Stocks
        </Link>
      </div>
    );
  }

  const priceHistory = STOCK_PRICE_HISTORY[symbol] || [];
  const isPositive = stock.change >= 0;
  const estimatedValue = (Number(quantity) || 0) * stock.price;

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center">
        <Link 
          to="/stocks"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{stock.name} ({stock.symbol})</h1>
          <p className="text-gray-500 dark:text-gray-400">Technology Sector • 1.5B Shares Outstanding</p>
        </div>
      </div>

      {/* Stock Summary */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Price</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${stock.price.toFixed(2)}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Change</p>
            <div className={`flex items-center space-x-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span className="text-xl font-semibold">
                {isPositive ? '+' : ''}{stock.change.toFixed(2)}
              </span>
              <span className="text-lg font-medium">
                ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Volume</p>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-gray-400" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                {stock.volume.toLocaleString()}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Market Cap</p>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              {stock.marketCap}
            </span>
          </div>
        </div>
      </Card>

      {/* Chart */}
      <ChartContainer 
        title="Price Chart"
        subtitle={`Last ${timeRange === '1D' ? 'day' : timeRange}`}
        timeRanges={[
          { label: '1D', value: '1D' },
          { label: '1W', value: '1W' },
          { label: '1M', value: '1M' },
          { label: '3M', value: '3M' },
          { label: 'YTD', value: 'YTD' },
          { label: '1Y', value: '1Y' },
        ]}
        currentTimeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        className="min-h-[400px]"
      >
        {priceHistory.length > 0 ? (
          <div className="h-[300px] relative">
            <div className="absolute inset-0 flex items-end space-x-1">
              {priceHistory.map((point, index) => (
                <div key={index} className="flex-1 relative group">
                  <div 
                    className="w-full bg-blue-500 dark:bg-blue-600 rounded-sm hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300"
                    style={{ height: `${(point.price / (stock.price * 1.05)) * 100}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity">
                      {point.time}: ${point.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
              <span>{priceHistory[0]?.time}</span>
              <span>{priceHistory[priceHistory.length - 1]?.time}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
            <p>No chart data available</p>
          </div>
        )}
      </ChartContainer>

      {/* Trading Controls */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Place Order</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => setOrderType('buy')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  orderType === 'buy'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setOrderType('sell')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  orderType === 'sell'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                }`}
              >
                Sell
              </button>
            </div>

            <InputGroup
              label="Quantity"
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Estimated Value</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${estimatedValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Available Cash</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">$35,935.71</span>
              </div>
              {orderType === 'sell' && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Owned</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">25 shares</span>
                </div>
              )}
            </div>

            <Button 
              className="mt-6 w-full" 
              size="lg"
              variant={orderType === 'buy' ? 'primary' : 'danger'}
              onClick={() => console.log('Order placed:', { type: orderType, symbol, quantity, price: stock.price })}
            >
              {orderType === 'buy' ? 'Buy Stock' : 'Sell Stock'}
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Stock Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">P/E Ratio</p>
                <p className="font-medium text-gray-900 dark:text-white">{stock.peRatio}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Div. Yield</p>
                <p className="font-medium text-gray-900 dark:text-white">{stock.dividendYield}%</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">52W High</p>
                <p className="font-medium text-gray-900 dark:text-white">${stock.high52Week}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">52W Low</p>
                <p className="font-medium text-gray-900 dark:text-white">${stock.low52Week}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StockDetailPage;
